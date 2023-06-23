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
