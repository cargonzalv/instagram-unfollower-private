## Instagram Unfollower

This repository contains a script that helps you unfollow Instagram users who don't follow you back.

### Prerequisites
- Node.js
- Yarn (or npm)

### Setup & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cargonzalv/instagram-unfollower-private.git
   cd instagram-unfollower-private
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

   ⚠️ **Important**: Never commit your `.env` file. This file contains sensitive information.

4. **Run the script**:
   ```bash
   yarn start
   ```

---

### .gitignore
To ensure your node modules and `.env` file (which contains sensitive information) are not committed to the repository, you should have a `.gitignore` file. Here's what it might look like:

```
# Node.js related
node_modules/
npm-debug.log
yarn-error.log

# dotenv environment variables file
.env
```

Save the above content in a file named `.gitignore` in the root directory of your project.

---

When you push to your repository, the `.gitignore` will ensure your `node_modules` and `.env` are not uploaded, and the `README.md` will guide users on how to use your code.