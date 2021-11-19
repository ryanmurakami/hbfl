// Imports
const {
  CreateListenerCommand,
  CreateTargetGroupCommand
} = require('@aws-sdk/client-elastic-load-balancing-v2')

const helpers = require('./helpers')

// Declare local variables
const sgName = 'hamsterLBSG'
const tgName = 'hamsterTG'
const lbName = 'hamsterLB'
const vpcId = '/* TODO: Add your VPC Id */'
const subnets = [
  /* TODO: Add two subnets */
]

async function execute () {
  try {
    const sgId = await helpers.createSecurityGroup(sgName, 80)
    const tgResult = await createTargetGroup(tgName)
    const lbResult = await createLoadBalancer(lbName, sgId)

    const tgArn = tgResult.TargetGroups[0].TargetGroupArn
    const lbArn = lbResult.LoadBalancers[0].LoadBalancerArn
    console.log('Target Group Name ARN:', tgArn)

    const response = await createListener(tgArn, lbArn)
    console.log('Created load balancer with:', response)
  } catch (err) {
    console.error('Failed to create load balancer with:', err)
  }
}

function createLoadBalancer (lbName, sgId) {
  // TODO: Create a load balancer
}

function createTargetGroup (tgName) {
  const params = {
    Name: tgName,
    Port: 3000,
    Protocol: 'HTTP',
    VpcId: vpcId
  }

  const command = new CreateTargetGroupCommand(params)
  return helpers.sendELBCommand(command)
}

function createListener (tgArn, lbArn) {
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

  const command = new CreateListenerCommand(params)
  return helpers.sendELBCommand(command)
}

execute()