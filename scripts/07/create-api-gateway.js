// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

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
.then(data => console.log(data))

function createRestApi (apiName) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Create a new rest API
  })
}

function getRootResource (api) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Get the resources and find the resource with path '/'
  })
}

function createResource (parentResourceId, resourcePath, api) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Create the resource and return the resource id
  })
}

function createResourceMethod (resourceId, method, api, path) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Put the method and return the resourceId argument
  })
}

function createMethodIntegration (resourceId, method, api, path) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Put the integration and return the resourceId argument
  })
}
