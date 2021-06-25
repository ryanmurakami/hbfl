// Imports
const AWS = require('aws-sdk')
const config = require('config')

const helpers = require('./helpers')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// TODO: Create an elasticache object

helpers.createSecurityGroup('hamster_redis_sg', 6379)
  .then(sgId => createRedisCluster('hamster', sgId))
  .then(console.log)
  .catch(console.error)

async function createRedisCluster (clusterName, sgId) {
  // TODO: Create params object

  try {
    // TODO: Create cache cluster
  } catch (err) {
    throw new Error(`Error creating Redis Cache Cluster: ${err}`)
  }
}
