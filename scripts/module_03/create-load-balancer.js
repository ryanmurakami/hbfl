// Imports
const AWS = require('aws-sdk')
const config = require('config')

const helpers = require('./helpers')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create a new ELBv2 object
const sgName = 'hamsterELBSG'
const tgName = 'hamsterTG'
const elbName = 'hamsterELB'
const vpcId = '/* TODO: Add your VPC Id */'
const subnets = [
  /* TODO: Add two subnets */
]

helpers.createSecurityGroup(sgName, 80)
  .then((sgId) =>
    Promise.all([
      createTargetGroup(tgName),
      createLoadBalancer(elbName, sgId)
    ])
  )
  .then((results) => {
    const tgArn = results[0].TargetGroups[0].TargetGroupArn
    const lbArn = results[1].LoadBalancers[0].LoadBalancerArn
    console.log('Target Group Name ARN:', tgArn)
    return createListener(tgArn, lbArn)
  })
  .then(console.log)
  .catch(console.error)

async function createLoadBalancer (lbName, sgId) {
  // TODO: Create a load balancer
}

async function createTargetGroup (tgName) {
  const params = {
    Name: tgName,
    Port: 3000,
    Protocol: 'HTTP',
    VpcId: vpcId
  }

  try {
    const data = await elbv2.createTargetGroup(params).promise()
    return data
  } catch (err) {
    throw new Error(`Error creating Target Group: ${err}`)
  }
}

async function createListener (tgArn, lbArn) {
  const params = {
    DefaultActions: [
      {
        TargetGroupArn: tgArn,
        Type: 'forward'
      }
    ],
    LoadBalancerArn: lbArn,
    Port: 80,
    Protocol: 'HTTP'
  }

  try {
    const data = await elbv2.createListener(params).promise()
    return data
  } catch (err) {
    throw new Error(`Error creating ELB Listener: ${err}`)
  }
}
