# RapidCodeIDE

Welcome to **RapidCodeIDE**, the online code editor that brings efficiency and simplicity to your coding experience.

## Features

### Free to Use

RapidCodeIDE is completely free to use. No hidden charges or subscription plans—just open your browser and start coding.

### No Account Required

You can use RapidCodeIDE without creating an account. Just visit the editor, and you’re ready to go.

### Optional Cloud Storage

For those who prefer an extra layer of convenience, RapidCodeIDE offers optional cloud storage. If you have an account, you can save your code directly to the cloud with up to 25MB of storage space. This feature allows you to access your projects from any device, anywhere.

## Run Locally

### Step 1: Download and install required tools

- **Node.js**: Ensure you have Node.js v20.16.0 installed. You can download it from [nodejs.org](https://nodejs.org).
- **NPM**: NPM usually comes with Node.js. However, if you don't have it installed, you may need to install it separately.
- **MongoDB**: Download and install MongoDB from the [https://www.mongodb.com/](https://www.mongodb.com/). Follow the installation instructions specific to your operating system.

### Step 2: Clone the repository

```bash
  git clone https://github.com/your-username/rapidcodeide.git
```

or download source code from **Releases** on our GitHub page.

### Step 3: Navigate to the project directory

```bash
  cd RapidCodeIDE
```

### Step 4: Install the necessary dependencies using NPM

```bash
  npm install
```

### Step 5: Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the required environment variables.

```.env
  MONGODB_URL=mongodb://localhost:27017/				# Or your custom MongoDB url
  MONGODB_NAME=RapidCodeIDE
  SESSION_SECRET=						# Create your own secret session key
  SERVER_PORT=3030 					# Change your port if you want
  MAX_ALLOWED_SPACE_FOR_USER=25000000					# 25MB in bytes
```

### Step 6: Create database

- To create a database using the MongoDB shell, open a new terminal window and run:

```bash
  mongo
```

- Then, switch to your database (this will create it if it doesn’t exist):

```bash
  use RapidCodeIDE
```

Or use GUI tool like MongoDB compass to create database more easily.

### Step 7: Run the Application

- Start the server normally:

```bash
  npm run start
```

- Or run it with dev start for automatic server refresh:

```bash
  npm run devStart
```

## Contributing

We welcome contributions from the community! If you have a feature request, bug report, or would like to contribute code, please open an issue or submit a pull request.

## License

This project is licensed under the [GNU GENERAL PUBLIC LICENSE](https://www.gnu.org/licenses/gpl-3.0.html#license-text)
