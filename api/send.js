// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
var twilio = require('twilio');
const accountSid = 'AC0cd2516dd886fb7b41af62153787bab8';
const authToken = '05072c7d7f9de9383bd9d8e17090937f';
const client = new twilio(accountSid, authToken);

client.messages
  .create({
     body: 'Test test sah sah aywah',
     from: '+12073674446',
     to: '+21629317129'
   })
  .then(message => console.log(message.sid));
