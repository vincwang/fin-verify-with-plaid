const plaid = require('plaid');
// Update this to your credentials
const plaidClient = new plaid.Client({
    clientID: process.env.plaidClientID,
    secret: process.env.plaidSecret,
    env: plaid.environments.sandbox,
});
module.exports.plaidClient = plaidClient;