"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const instagram_private_api_1 = require("instagram-private-api");
const ig = new instagram_private_api_1.IgApiClient();
const username = process.env.IG_USERNAME || '';
const password = process.env.IG_PASSWORD || '';
const whitelist = []; // People you don't want to unfollow even if they don't follow you back
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
        !whitelist.includes(username));
    // Looping through and unfollowing each user
    for (const user of notFollowingYou) {
        await ig.friendship.destroy(user.pk);
        console.log(`unfollowed ${user.username}`);
        /*
        Time, is the delay which is between 1 second and 7 seconds.
        Creating a promise to stop the loop to avoid api spam
        */
        const time = Math.round(Math.random() * 6000) + 1000;
        await new Promise(resolve => setTimeout(resolve, time));
    }
})();
/**
* Source: https://github.com/dilame/instagram-private-api/issues/969#issuecomment-551436680
* @param feed
* @returns All items from the feed
*/
async function getAllItemsFromFeed(feed) {
    let items = [];
    do {
        items = items.concat(await feed.items());
    } while (feed.isMoreAvailable());
    return items;
}
