'use strict';
const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  id: String,
  name: String,
});

const personModel = dynamoose.model('People', personSchema);

exports.handler = async (event) => {
  console.log('EVENT: ', event);
  try {
    if(event.pathParameters && event.pathParameters.id) {
      const result = await personModel.get(event.pathParameters.id);
      return { statusCode: 200, body: JSON.stringify(result) };
    } else {
      const result = await personModel.scan().exec();
      return { statusCode: 200, body: JSON.stringify(result) };
    }
  } catch (error) {
    console.error('ERROR: ', error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};