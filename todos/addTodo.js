const { v4: uuid } = require('uuid');
const DynamoDB = require('../common/DynamoDB');
const tableName = process.env.TODOS_TABLE_NAME;

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);

  const todo = {
    id: uuid(),
    isDone: false,
    ...requestBody,
  };

  const putParams = {
    TableName: tableName,
    Item: todo,
  };

  await DynamoDB.put(putParams).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      newTodo: todo,
    }),
  };
};
