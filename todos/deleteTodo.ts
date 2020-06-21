import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';

const DynamoDBClient = require('../common/DynamoDBClient');
const tableName = process.env.TODOS_TABLE_NAME;

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  const id: string | undefined = event.pathParameters?.id;

  const getParams = {
    TableName: tableName,
    Key: {
      id,
    },
  };

  const todoToDelete = (await DynamoDBClient.get(getParams).promise()).Item;
  if (!todoToDelete) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      statusCode: 404,
      body: JSON.stringify({
        message: 'Not found',
      }),
    };
  }

  const deleteParams = {
    TableName: tableName,
    Key: {
      id,
    },
  };

  await DynamoDBClient.delete(deleteParams).promise();
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    statusCode: 200,
    body: JSON.stringify({
      result: todoToDelete,
    }),
  };
};
