const AWS = require('aws-sdk');

const DynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = DynamoDB;
