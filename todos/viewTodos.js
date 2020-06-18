const DynamoDB = require('../common/DynamoDB');
const tableName = process.env.TODOS_TABLE_NAME;

module.exports.handler = async (event) => {
  const scanParams = {
    TableName: tableName,
  };

  const todos = (await DynamoDB.scan(scanParams).promise()).Items;

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos,
    }),
  };
};
