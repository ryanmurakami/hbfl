// Imports
const AWS = require('aws-sdk')
const config = require('config')

const helpers = require('./helpers')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const lambda = new AWS.Lambda()
const functionName = 'hamster-kinesis-stream-consumer'
const kinesisArn = '/* TODO: Add your kinesis ARN */'
let roleArn

helpers.createLambdaKinesisRole()
  .then(arn => {
    roleArn = arn
    return helpers.zipLambdaFile()
  })
  .then(codeBuffer => createLambda(roleArn, functionName, codeBuffer))
  .then(() => createTrigger(kinesisArn, functionName))
  .then(console.log)
  .catch(console.error)

async function createLambda (roleArn, lambdaName, zippedCode) {
  const params = {
    Code: {
      ZipFile: zippedCode
    },
    FunctionName: lambdaName,
    Handler: 'index.handler',
    Role: roleArn,
    Runtime: 'nodejs12.x',
    Description: 'A kinesis consumer for the hbfl demo project',
    MemorySize: 128,
    Publish: true,
    Timeout: 15
  }

  try {
    await lambda.createFunction(params).promise()
  } catch (err) {
    throw new Error(`Error creating Lambda Function: ${err}`)
  }
}

async function createTrigger (kinesisArn, lambdaName) {
  // TODO: Create params const for trigger

  try {
    const data = await lambda.createEventSourceMapping(params).promise()
    return data
  } catch (err) {
    throw new Error(`Error creating Lambda Trigger: ${err}`)
  }
}
