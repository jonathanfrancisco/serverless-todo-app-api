// import { v4 as uuid } from 'uuid';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import DynamoDBClient from '../common/DynamoDBClient';

const tableName: string = process.env.TODOS_TABLE_NAME!;

const addTodo: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const requestBody: any = JSON.parse(event.body!);
  const todo = {
    id: 'id_' + Math.random(),
    isDone: 'false',
    body: requestBody.body,
  };

  const putParams = {
    TableName: tableName,
    Item: todo,
  };

  await DynamoDBClient.put(putParams).promise();

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    statusCode: 200,
    body: JSON.stringify({
      newTodo: todo,
    }),
  };
};

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        body: {
          type: 'string',
        },
        isDone: {
          type: 'boolean',
        },
      },
      required: ['body', 'isDone'],
    },
  },
};

export const handler = middy(addTodo)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
