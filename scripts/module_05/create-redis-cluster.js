// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: '/* TODO: Add your region */' })

// TODO: Create an elasticache object

helpers.createSecurityGroup('hamster_redis_sg', 6379)
.then(sgId => createRedisCluster('hamster', sgId))
.then(data => console.log(data))

function createRedisCluster (clusterName, sgId) {
  // TODO: Create params object

  return new Promise((resolve, reject) => {
    // TODO: Create cache cluster
  })
}
