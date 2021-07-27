// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create api gateway object
const apiName = 'hamster-api'

let apiData

createRestApi(apiName)
  .then((data) => {
    apiData = data
    return getRootResource(apiData)
  })
  .then(rootResourceId => createResource(rootResourceId, 'hbfl', apiData))
  .then(hbflResourceId => createResourceMethod(hbflResourceId, 'GET', apiData))
  .then(hbflResourceId => createMethodIntegration(hbflResourceId, 'GET', apiData))
  .then(hbflResourceId => createResource(hbflResourceId, '{proxy+}', apiData))
  .then(proxyResourceId => createResourceMethod(proxyResourceId, 'ANY', apiData, 'proxy'))
  .then(proxyResourceId => createMethodIntegration(proxyResourceId, 'ANY', apiData, 'proxy'))
  .then(console.log)
  .catch(console.error)

async function createRestApi (apiName) {
  // TODO: Create params const

  try {
    // TODO: Create a new rest API
  } catch (err) {
    throw new Error(`Error creating new REST API: ${err}`)
  }
}

async function getRootResource (api) {
  // TODO: Create params const

  try {
    // TODO: Get the resources and find the resource with path '/'
  } catch (err) {
    throw new Error(`Error getting Root API Resource: ${err}`)
  }
}

async function createResource (parentResourceId, resourcePath, api) {
  // TODO: Create params const

  try {
    // TODO: Create the resource and return the resource id
  } catch (err) {
    throw new Error(`Error creating API Resource: ${err}`)
  }
}

async function createResourceMethod (resourceId, method, api, path) {
  // TODO: Create params const

  try {
    // TODO: Put the method and return the resourceId argument
  } catch (err) {
    throw new Error(`Error creating Resource Method: ${err}`)
  }
}

async function createMethodIntegration (resourceId, method, api, path) {
  // TODO: Create params const

  try {
    // TODO: Put the integration and return the resourceId argument
  } catch (err) {
    throw new Error(`Error creating Method Integration: ${err}`)
  }
}
