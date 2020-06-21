import { DynamoDB } from 'aws-sdk';

const DynamoDBClient = new DynamoDB.DocumentClient();

export default DynamoDBClient;
