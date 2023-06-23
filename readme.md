# Google Keep to ChatGPT Learning

## Introduction
Authentication with Google Keep API is a bit tricky. This is a simple script to get the authentication token and use it to get the notes from Google Keep.

## Bootstrap

The GitHub CLI doesn't provide a direct command to open a repo in the browser; however, you can achieve this using your operating system's command for opening a URL.

For Windows, use the `start` command:

```sh
start https://github.com/andypotanin/ai-notes-sync
```

For macOS, use the `open` command:

```sh
open https://github.com/andypotanin/ai-notes-sync
```

For Linux, you can use `xdg-open`:

```sh
xdg-open https://github.com/andypotanin/ai-notes-sync
```

Please note that you need to replace "andypotanin/ai-notes-sync" with the relevant repository based on your username and your repo name.

---

To get a token for Google Keep's API, you can perform an OAuth2 flow with the proper scopes using the Google API Client Libraries in the programming language of your choice. Unfortunately, Google Keep's API is currently private, meaning that it's not officially documented or supported for public consumption.

As an alternative, you can use the following workaround to get an access token using the Node.js Google API Client Library to access Google Keep. However, keep in mind that it is unofficial, and it may break in the future without any notice.

1. Enable Google Keep API for your Google Project:

This step is not possible because Google Keep API is private, and it's not available for public use. We will skip this step.

2. Set up the Node.js Google API Client Library:

a. Install the Google APIs Client Library for Node.js:

```sh
npm install googleapis
```

b. Create a new file named `get-token.js` and copy-paste the following code:

```javascript
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const clientId = '{{YOUR CLIENT ID}}';
const clientSecret = '{{YOUR CLIENT SECRET}}';
const redirectUrl = '{{YOUR REDIRECT URL}}';

const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

// Generate the URL to get the access token.
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
});

console.log('Authorize this app by visiting this URL:', authUrl);
```

Make sure to replace `{{YOUR CLIENT ID}}`, `{{YOUR CLIENT SECRET}}`, and `{{YOUR REDIRECT URL}}` with your own Google OAuth2 credentials. If you haven't created OAuth2 credentials yet, follow [these instructions](https://developers.google.com/identity/protocols/oauth2).

3. Run the command:

```sh
node get-token.js
```

This will generate an authorization URL. Open this URL in your browser and log into your Google Account.

4. Authorize the application and copy the authorization code provided by Google. Then, update the `get-token.js` file with the following code.

```javascript
// ...
const code = '{{YOUR AUTHORIZATION CODE}}';

oauth2Client.getToken(code, (error, token) => {
  if (error) {
    console.error('Error getting OAuth2 access token:', error);
    return;
  }
  oauth2Client.setCredentials(token);
  console.log('Access token:', token.access_token);
  console.log('Full token object:', token);
});
```

Replace `{{YOUR AUTHORIZATION CODE}}` with the authorization code you received in the previous step.

5. Run the command again:

```sh
node get-token.js
```

This time, the script will output your access token and the full token object, including the refresh token.

Remember that this workaround is not officially supported by Google, which means that it might stop working at any time. Please use this at your own risk.

I hope that helps you get an access token for Keep's API. If you have any other questions, feel free to ask!