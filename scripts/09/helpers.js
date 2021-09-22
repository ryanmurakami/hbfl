const AWS = require('aws-sdk')
const archiver = require('archiver')
const path = require('path')
const streamBuffers = require('stream-buffers')
const fs = require('fs')

function createLambdaKinesisRole () {
  const roleName = 'lambda-kinesis-consumer-role'
  const iam = new AWS.IAM()
  const params = {
    RoleName: roleName,
    Path: '/service-role/',
    AssumeRolePolicyDocument: '{ "Version": "2012-10-17", "Statement": [ { "Effect": "Allow", "Principal": { "Service": "lambda.amazonaws.com" }, "Action": "sts:AssumeRole" } ] }'
  }

  return new Promise((resolve, reject) => {
    iam.createRole(params, (err, data) => {
      if (err) reject(err)
      else {
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

        iam.attachRolePolicy(kinesisParams, (err) => {
          if (err) reject(err)
          else {
            iam.attachRolePolicy(lambdaParams, (err) => {
              if (err) reject(err)
              else {
                iam.attachRolePolicy(dynamoParams, (err) => {
                  if (err) reject(err)
                  else setTimeout(() => resolve(data.Role.Arn), 10000)
                })
              }
            })
          }
        })
      }
    })
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
