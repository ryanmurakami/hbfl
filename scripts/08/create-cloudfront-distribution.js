// Imports
const { CreateDistributionCommand } = require('@aws-sdk/client-cloudfront')
const {
  defaultCacheBehavior,
  origins
} = require('./cloudfront-parameters')
const { sendCloudFrontCommand: sendCommand } = require('./helpers')

const bucketName = '/* TODO: Add your bucket name */'

async function execute () {
  try {
    const response = await createDistribution(bucketName)
    console.log(response)
  } catch (err) {
    console.error('Error creating distribution:', err)
  }
}

async function createDistribution (bucketName) {
  // TODO: Create CloudFront Distribution
}

execute()
