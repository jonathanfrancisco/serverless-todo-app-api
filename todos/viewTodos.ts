import DynamoDBClient from '../common/DynamoDBClient';
import { ScanInput } from 'aws-sdk/clients/dynamodb';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';

const tableName: string = process.env.TODOS_TABLE_NAME!;

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  const scanParams: ScanInput = {
    TableName: tableName,
  };

  const todos = (await DynamoDBClient.scan(scanParams).promise()).Items;

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    statusCode: 200,
    body: JSON.stringify({
      todos,
    }),
  };
};
