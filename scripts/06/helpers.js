const AWS = require('aws-sdk')
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

function createSecurityGroup (sgName, port) {
  return new Promise((resolve, reject) => {
    const ec2 = new AWS.EC2()
    const params = {
      Description: sgName,
      GroupName: sgName
    }

    ec2.createSecurityGroup(params, (err, data) => {
      if (err) reject(err)
      else {
        const params = {
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
        ec2.authorizeSecurityGroupIngress(params, (err) => {
          if (err) reject(err)
          else resolve(data.GroupId)
        })
      }
    })
  })
}

module.exports = {
  getHamsterData,
  getRaceData,
  createSecurityGroup
}
