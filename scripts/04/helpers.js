const {
  EC2Client,
  AuthorizeSecurityGroupIngressCommand,
  CreateSecurityGroupCommand
} = require('@aws-sdk/client-ec2')
const {
  IAMClient,
  AddRoleToInstanceProfileCommand,
  AttachRolePolicyCommand,
  CreateInstanceProfileCommand,
  CreateRoleCommand
} = require('@aws-sdk/client-iam')
const {
  ElasticLoadBalancingV2Client
} = require('@aws-sdk/client-elastic-load-balancing-v2')
const {
  AutoScalingClient
} = require('@aws-sdk/client-auto-scaling')

async function sendCommand (command) {
  const client = new EC2Client({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendIAMCommand (command) {
  const client = new IAMClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendELBCommand (command) {
  const client = new ElasticLoadBalancingV2Client({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendAutoScalingCommand (command) {
  const client = new AutoScalingClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function createSecurityGroup (sgName, port) {
  const sgParams = {
    Description: sgName,
    GroupName: sgName
  }
  const sgCommand = new CreateSecurityGroupCommand(sgParams)
  const data = await sendCommand(sgCommand)

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
  await sendCommand(authCommand)
  return data.GroupId
}

async function createIamRole (roleName) {
  const profileName = `${roleName}_profile`
  const roleParams = {
    RoleName: roleName,
    AssumeRolePolicyDocument: '{ "Version": "2012-10-17", "Statement": [ { "Effect": "Allow", "Principal": { "Service": "ec2.amazonaws.com" }, "Action": "sts:AssumeRole" } ] }'
  }
  const policyParams = {
    PolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
    RoleName: roleName
  }
  const ipParams = {
    InstanceProfileName: profileName,
    RoleName: roleName
  }

  const createRoleCommand = new CreateRoleCommand(roleParams)
  await sendIAMCommand(createRoleCommand)

  const attachPolicyCommand = new AttachRolePolicyCommand(policyParams)
  await sendIAMCommand(attachPolicyCommand)

  const ipCommand = new CreateInstanceProfileCommand({ InstanceProfileName: profileName })
  const data = await sendIAMCommand(ipCommand)

  const addCommand = new AddRoleToInstanceProfileCommand(ipParams)
  await sendIAMCommand(addCommand)

  return data.InstanceProfile.Arn
}

module.exports = {
  createIamRole,
  createSecurityGroup,
  sendCommand,
  sendAutoScalingCommand,
  sendELBCommand
}
