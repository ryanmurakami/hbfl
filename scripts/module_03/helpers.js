const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

const ec2 = new AWS.EC2()
const iam = new AWS.IAM()

async function createSecurityGroup (sgName, port) {
  const params = {
    Description: sgName,
    GroupName: sgName
  }

  try {
    const data = await ec2.createSecurityGroup(params).promise()
    await authorizeSecurityGroupIngress(data.GroupId, port)
    return data.GroupId
  } catch (err) {
    throw new Error(`Error creating Security Group: ${err}`)
  }
}

async function authorizeSecurityGroupIngress (groupId, port) {
  const params = {
    GroupId: groupId,
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
  try {
    const data = await ec2.authorizeSecurityGroupIngress(params).promise()
    return data
  } catch (err) {
    throw new Error(`Error authorizing Security Group Ingress Rule: ${err}`)
  }
}

async function createIamRole (roleName) {
  const params = {
    RoleName: roleName,
    AssumeRolePolicyDocument: '{ "Version": "2012-10-17", "Statement": [ { "Effect": "Allow", "Principal": { "Service": "ec2.amazonaws.com" }, "Action": "sts:AssumeRole" } ] }'
  }

  try {
    await iam.createRole(params).promise()
    await attachRolePolicy(roleName)
    const profileData = await createInstanceProfile(roleName)
    await addRoleToInstanceProfile(roleName, profileData)
  } catch (err) {
    throw new Error(`Error creating IAM Role: ${err}`)
  }
}

async function attachRolePolicy (roleName) {
  const params = {
    PolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
    RoleName: roleName
  }

  try {
    await iam.attachRolePolicy(params).promise()
  } catch (err) {
    throw new Error(`Error attaching Policy to the IAM Role: ${err}`)
  }
}

async function createInstanceProfile (roleName) {
  const profileName = `${roleName}_profile`
  const params = {
    InstanceProfileName: profileName
  }
  try {
    const data = await iam.createInstanceProfile(params).promise()
    return {
      data,
      name: profileName
    }
  } catch (err) {
    throw new Error(`Error creating Instance Profile: ${err}`)
  }
}

async function addRoleToInstanceProfile (roleName, profileData) {
  const params = {
    InstanceProfileName: profileData.name,
    RoleName: roleName
  }
  try {
    await iam.addRoleToInstanceProfile(params).promise()

    // Profile creation is slow, need to wait
    return new Promise(resolve => {
      setTimeout(() => resolve(profileData.data.InstanceProfile.Arn), 10000)
    })
  } catch (err) {
    throw new Error(`Error adding the Role to the Instance Profile: ${err}`)
  }
}

module.exports = {
  createIamRole,
  createSecurityGroup
}
