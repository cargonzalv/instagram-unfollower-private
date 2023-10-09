## Instagram Unfollower

This repository contains a script that helps you unfollow Instagram users who don't follow you back.

### Prerequisites
- Node.js
- Yarn (or npm)

### Setup & Running

1. **Clone the repository**:
   ```bash
   git clone <Your Repository URL>
   cd <Your Repository Directory>
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root of your project. Add your Instagram username and password as follows:
   ```
   INSTAGRAM_USERNAME=your_username
   INSTAGRAM_PASSWORD=your_password
   ```

   Optionally, if you have certain people you don't want to unfollow, you can add them to a whitelist. Add the `WHITELIST` variable in the `.env` file and list the usernames separated by commas without spaces:

   ```
   WHITELIST=username1,username2,username3
   ```

   ⚠️ **Important**: Never commit your `.env` file. This file contains sensitive information.

4. **Run the script**:
   ```bash
   yarn start
   ```

---

Including this, users will know they can set up a whitelist of users they don't want to unfollow by specifying them in the `.env` file.