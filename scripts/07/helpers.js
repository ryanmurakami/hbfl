const { Route53Client } = require('@aws-sdk/client-route-53')
const { APIGatewayClient } = require('@aws-sdk/client-api-gateway')

async function sendAPIGatewayCommand (command) {
  const client = new APIGatewayClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendRoute53Command (command) {
  const client = new Route53Client({ region: process.env.AWS_REGION })
  return client.send(command)
}

module.exports = {
  sendAPIGatewayCommand,
  sendRoute53Command
}
