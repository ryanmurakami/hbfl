// Imports
const {
  CreateResourceCommand,
  CreateRestApiCommand,
  GetResourcesCommand,
  PutIntegrationCommand,
  PutMethodCommand
} = require('@aws-sdk/client-api-gateway')
const { sendAPIGatewayCommand: sendCommand } = require('./helpers')

// Declare local variables
const apiName = 'hamster-api'

async function execute () {
  try {
    const response = await createRestApi(apiName)
    const apiData = response

    const rootResourceId = await getRootResource(apiData)

    const hbflResourceId = await createResource(rootResourceId, 'hbfl', apiData)
    await createResourceMethod(hbflResourceId, 'GET', apiData)
    await createMethodIntegration(hbflResourceId, 'GET', apiData)

    const proxyResourceId = await createResource(hbflResourceId, '{proxy+}', apiData)
    await createResourceMethod(proxyResourceId, 'ANY', apiData, 'proxy')
    await createMethodIntegration(proxyResourceId, 'ANY', apiData, 'proxy')

    console.log('API creation complete')
  } catch (err) {
    console.error('Error creating API Gateway API:', err)
  }
}

async function createRestApi (apiName) {
  // TODO: Create a new rest API
}

async function getRootResource (api) {
  // TODO: Get the resources and find the resource with path '/'
}

async function createResource (parentResourceId, resourcePath, api) {
  // TODO: Create the resource and return the resource id
}

async function createResourceMethod (resourceId, method, api, path) {
  // TODO: Put the method and return the resourceId argument
}

async function createMethodIntegration (resourceId, method, api, path) {
  // TODO: Put the integration and return the resourceId argument
}

execute()
