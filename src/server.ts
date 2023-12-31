/* tslint:disable:no-console */

import 'dotenv/config';
import { IgApiClient, Feed, AccountFollowersFeedResponseUsersItem } from 'instagram-private-api';

const ig = new IgApiClient();
const username = process.env.IG_USERNAME || '';
const password = process.env.IG_PASSWORD || '';
const whitelist: string[] = process.env.WHITELIST?.split(',') || []; // People you don't want to unfollow even if they don't follow you back
ig.state.generateDevice(username);

(async () => {
  await ig.account.login(username, password);
  
  const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
  const followingFeed = ig.feed.accountFollowing(ig.state.cookieUserId);
  
  const followers = await getAllItemsFromFeed(followersFeed);
  const following = await getAllItemsFromFeed(followingFeed);
  // Making a new map of users username that follow you.
  const followersUsername = new Set(followers.map(({ username }) => username));
  // Filtering through the ones who aren't following you.
  const notFollowingYou = following.filter(({ username, is_verified }) => !followersUsername.has(username) && 
    !is_verified && 
    !whitelist.includes(username)
  );
  // Looping through and unfollowing each user
  for (const user of notFollowingYou) {
    await unfollow(user);
  }
})();

async function unfollow(user: AccountFollowersFeedResponseUsersItem) {
  try {
    await ig.friendship.destroy(user.pk);
    console.log(`unfollowed ${user.username}`);
  } catch(err: any) {
    if (err.toString().includes('login_required')) {
      console.log('Error, logging in again');
      await ig.account.login(username, password);
      await ig.friendship.destroy(user.pk);
    }
  }
  /*
  Time, is the delay which is between 1 second and 7 seconds.
  Creating a promise to stop the loop to avoid api spam
  */
  const time = Math.round(Math.random() * 6000) + 1000;
  await new Promise(resolve => setTimeout(resolve, time));
}

/**
* Source: https://github.com/dilame/instagram-private-api/issues/969#issuecomment-551436680
* @param feed
* @returns All items from the feed
*/

async function getAllItemsFromFeed<T>(feed: Feed<any, T>): Promise<T[]> {
  let items: any[] = [];
  do {
    items = items.concat(await feed.items());
  } while (feed.isMoreAvailable());
  return items;
}