const {
  EC2Client,
  AuthorizeSecurityGroupIngressCommand,
  CreateSecurityGroupCommand
} = require('@aws-sdk/client-ec2')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')
const { RDSClient } = require('@aws-sdk/client-rds')
const { ElastiCacheClient } = require('@aws-sdk/client-elasticache')
const assets = require('../../util/assets')

const hamsterData = [
  {
    id: 1,
    name: 'Zepto',
    type: 'Speedball',
    src: assets.hamster1,
    results: []
  }, {
    id: 2,
    name: 'Milkshake',
    type: 'Speedball',
    src: assets.hamster2,
    results: []
  }, {
    id: 3,
    name: 'Fievel',
    type: 'Tiny Terror',
    src: assets.hamster3,
    results: []
  }, {
    id: 4,
    name: 'Baby Ham',
    type: 'Roller',
    src: assets.hamster4,
    results: []
  }, {
    id: 5,
    name: 'Tater',
    type: 'Stealth',
    src: assets.hamster5,
    results: []
  }, {
    id: 6,
    name: 'Peter Pan',
    type: 'ZigZagger',
    src: assets.hamster6,
    results: []
  }
]
const raceData = [
  {
    id: 1,
    venue: 'Petco 2000',
    city: 'Seattle, WA',
    date: '04/29/17',
    results: []
  }, {
    id: 2,
    venue: 'Triscuit Circuit 4700',
    city: 'Daytona Beach, FL',
    date: '09/21/17',
    results: []
  }, {
    id: 3,
    venue: 'Kraft 35',
    city: 'Tokyo, Japan',
    date: '07/14/17',
    results: []
  }
]

function getHamsterData () {
  return Promise.resolve(hamsterData)
}

function getRaceData () {
  return Promise.resolve(raceData)
}

async function createSecurityGroup (sgName, port) {
  const sgParams = {
    Description: sgName,
    GroupName: sgName
  }
  const sgCommand = new CreateSecurityGroupCommand(sgParams)
  const client = new EC2Client({ region: process.env.AWS_REGION })
  const data = await client.send(sgCommand)

  const rulesParams = {
    GroupId: data.GroupId,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        FromPort: port,
        ToPort: port,
        IpRanges: [
          {
            CidrIp: '0.0.0.0/0'
          }
        ]
      }
    ]
  }

  const authCommand = new AuthorizeSecurityGroupIngressCommand(rulesParams)
  await client.send(authCommand)
  return data.GroupId
}

async function sendDynamoDBCommand (command) {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendDynamoItemCommand (command) {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION })
  const docClient = DynamoDBDocumentClient.from(client)
  return docClient.send(command)
}

async function sendRDSCommand (command) {
  const client = new RDSClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendElastiCacheCommand (command) {
  const client = new ElastiCacheClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

module.exports = {
  getHamsterData,
  getRaceData,
  createSecurityGroup,
  sendDynamoDBCommand,
  sendDynamoItemCommand,
  sendRDSCommand,
  sendElastiCacheCommand
}
