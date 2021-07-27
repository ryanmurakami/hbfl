const AWS = require('aws-sdk')
const archiver = require('archiver')
const path = require('path')
const streamBuffers = require('stream-buffers')
const fs = require('fs')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

async function createLambdaKinesisRole () {
  const roleName = 'lambda-kinesis-consumer-role'
  const iam = new AWS.IAM()
  const params = {
    RoleName: roleName,
    Path: '/service-role/',
    AssumeRolePolicyDocument: '{ "Version": "2012-10-17", "Statement": [ { "Effect": "Allow", "Principal": { "Service": "lambda.amazonaws.com" }, "Action": "sts:AssumeRole" } ] }'
  }

  let roleArn

  try {
    const data = await iam.createRole(params).promise()
    roleArn = data.Role.Arn
  } catch (err) {
    throw new Error(`Error creating IAM Role: ${err}`)
  }

  try {
    const kinesisParams = {
      PolicyArn: 'arn:aws:iam::aws:policy/AmazonKinesisReadOnlyAccess',
      RoleName: roleName
    }
    await iam.attachRolePolicy(kinesisParams).promise()
  } catch (err) {
    throw new Error(`Error attaching Kinesis Policy to IAM Role: ${err}`)
  }

  try {
    const lambdaParams = {
      PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      RoleName: roleName
    }
    await iam.attachRolePolicy(lambdaParams).promise()
  } catch (err) {
    throw new Error(`Error attaching Lambda Policy to IAM Role: ${err}`)
  }

  try {
    const dynamoParams = {
      PolicyArn: 'arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess',
      RoleName: roleName
    }
    await iam.attachRolePolicy(dynamoParams).promise()
  } catch (err) {
    throw new Error(`Error attaching DynamoDB Policy to IAM Role: ${err}`)
  }

  return new Promise(resolve => {
    setTimeout(() => resolve(roleArn), 10000)
  })
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

module.exports = {
  createLambdaKinesisRole,
  zipLambdaFile
}
