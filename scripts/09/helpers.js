const {
  IAMClient,
  AttachRolePolicyCommand,
  CreateRoleCommand
} = require('@aws-sdk/client-iam')
const { SQSClient } = require('@aws-sdk/client-sqs')
const { KinesisClient } = require('@aws-sdk/client-kinesis')
const { LambdaClient } = require('@aws-sdk/client-lambda')
const archiver = require('archiver')
const path = require('path')
const streamBuffers = require('stream-buffers')
const fs = require('fs')

async function sendSQSCommand (command) {
  const client = new SQSClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendKinesisCommand (command) {
  const client = new KinesisClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendLambdaCommand (command) {
  const client = new LambdaClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function createLambdaKinesisRole () {
  const roleName = 'lambda-kinesis-consumer-role'
  const params = {
    RoleName: roleName,
    Path: '/service-role/',
    AssumeRolePolicyDocument: '{ "Version": "2012-10-17", "Statement": [ { "Effect": "Allow", "Principal": { "Service": "lambda.amazonaws.com" }, "Action": "sts:AssumeRole" } ] }'
  }

  const client = new IAMClient({ region: process.env.AWS_REGION })
  const roleCommand = new CreateRoleCommand(params)
  const roleResponse = await client.send(roleCommand)

  const kinesisParams = {
    PolicyArn: 'arn:aws:iam::aws:policy/AmazonKinesisReadOnlyAccess',
    RoleName: roleName
  }
  const lambdaParams = {
    PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    RoleName: roleName
  }
  const dynamoParams = {
    PolicyArn: 'arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess',
    RoleName: roleName
  }

  const kinesisPolicyCommand = new AttachRolePolicyCommand(kinesisParams)
  await client.send(kinesisPolicyCommand)

  const lambdaPolicyCommand = new AttachRolePolicyCommand(lambdaParams)
  await client.send(lambdaPolicyCommand)

  const dynamoPolicyCommand = new AttachRolePolicyCommand(dynamoParams)
  await client.send(dynamoPolicyCommand)

  await sleep(10)

  return roleResponse.Role.Arn
}

function zipLambdaFile () {
  const archive = archiver('zip', {
    zlib: { level: 9 }
  })
  const writableStreamBuffer = new streamBuffers.WritableStreamBuffer({
    initialSize: (100 * 1024),
    incrementAmount: (10 * 1024)
  })

  return new Promise((resolve, reject) => {
    writableStreamBuffer.on('finish', () => {
      resolve(writableStreamBuffer.getContents())
    })

    archive.on('warning', err => reject(err))
    archive.on('error', err => reject(err))

    archive.pipe(writableStreamBuffer)
    archive.append(fs.createReadStream(path.join(__dirname, 'lambda-kinesis-consumer', 'index.js')), { name: 'index.js' })
    archive.finalize()
  })
}

// Borrowed from https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep (s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}

module.exports = {
  createLambdaKinesisRole,
  sendKinesisCommand,
  sendLambdaCommand,
  sendSQSCommand,
  zipLambdaFile
}
