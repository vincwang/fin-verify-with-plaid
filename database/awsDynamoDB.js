var AWS = require('aws-sdk');
// Update this to your credentials
const awsConfig = {
	"region": "us-east-1",
	"endpoint": "http://dynamodb.us-east-1.amazonaws.com",
	"accessKeyId": process.env.awsAccessKeyId,
	"secretAccessKey": process.env.awsSecretAccessKey,
}
AWS.config.update(awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.docClient = docClient;