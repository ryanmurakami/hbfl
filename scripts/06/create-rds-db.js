// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

const ec2 = new AWS.EC2()
// TODO: Create an rds object
const dbName = 'user'

createSecurityGroup(dbName)
.then(sgId => createDatabase(dbName, sgId))
.then(data => console.log(data))

function createDatabase (dbName, sgId) {
  // TODO: Create the params object

  return new Promise((resolve, reject) => {
    // TODO: Create the db instance
  })
}

function createSecurityGroup (dbName) {
  const params = {
    Description: `security group for ${dbName}`,
    GroupName: `${dbName}-db-sg`
  }

  return new Promise((resolve, reject) => {
    ec2.createSecurityGroup(params, (err, data) => {
      if (err) reject(err)
      else {
        const sgGroupId = data.GroupId
        const params = {
          GroupId: sgGroupId,
          IpPermissions: [
            {
              IpProtocol: 'tcp',
              FromPort: 3306,
              ToPort: 3306,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            }
          ]
        }
        ec2.authorizeSecurityGroupIngress(params, (err, data) => {
          if (err) reject(err)
          else resolve(sgGroupId)
        })
      }
    })
  })
}
