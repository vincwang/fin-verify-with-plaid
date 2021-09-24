var express = require('express');
// var AWS = require('aws-sdk');
var router = express.Router();
const shortUuid = require('short-uuid');
const util = require('util');

var pliad = require('../plaid/plaid.js');
var plaidClient = pliad.plaidClient;

var awsDynamoDB = require('../database/awsDynamoDB.js');
var docClient = awsDynamoDB.docClient;


router.get('/', function(req, res) {
	if (req.query.id != undefined) {
		console.log("yes! id not undefined");
		console.log(req.query.id);
		var params = {
			TableName: "income_verification",
			Key: {
				"user_id": req.query.id
			}
		};
		docClient.get(params, function(err, data) {
			if (err) {
				console.log("error!!!");
			} else {
				console.log(JSON.stringify(data, null, 2));
				res.render('index', {verifyResult: data, verified: true});
			}
		});
	} else {
		res.render('index', {verified: false});
	}
});

router.post('/token-exchange', function(req, res) {
	const { publicToken } = req.body;
	// Step 1: Get access token
    plaidClient.exchangePublicToken(publicToken, function(err, tokenResponse) {
		// Step 2:  Get Identity Verification
		plaidClient.getIdentity(tokenResponse.access_token, function(err, identityResponse) {
			console.log('1 Identity Response');
			console.log(util.inspect(identityResponse, false, null, true));
			console.log('---------------');
			var uuid = shortUuid.generate();
			var input = {
				"user_id": uuid,
				"verfication": identityResponse,
				"timestamp": Date.now()
			};
			var writeParams = {
				TableName: "income_verification",
				Item: input
			};
			docClient.put(writeParams, function(err, data) {
				if (err) {
					console.log("error!!!");
				} else {
					console.log(JSON.stringify(data, null, 2));
				}
			});
			res.json({status: "success", verifyId: uuid})
		});
	});
});


router.get('/create-link-token', async (req, res) => {
    const { link_token: linkToken } = await plaidClient.createLinkToken({
        user: {
            client_user_id: 'some-unique-identifier',
        },
        client_name: 'Fin Verify',
        products: ['auth', 'identity'],
        country_codes: ['US'],
        language: 'en',
    });

    res.json({ linkToken });
});

module.exports = router;