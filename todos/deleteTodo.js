const DynamoDB = require('../common/DynamoDB');
const tableName = process.env.TODOS_TABLE_NAME;

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const getParams = {
    TableName: tableName,
    Key: {
      id,
    },
  };

  const todoToDelete = (await DynamoDB.get(getParams).promise()).Item;
  if (!todoToDelete) {
    return {
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

  await DynamoDB.delete(deleteParams).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: todoToDelete,
    }),
  };
};
