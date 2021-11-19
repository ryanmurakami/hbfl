// Imports
const {
  CreateLaunchTemplateCommand
} = require('@aws-sdk/client-ec2')

const helpers = require('./helpers')

const ltName = 'hamsterLT'
const roleName = 'hamsterLTRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

async function execute () {
  try {
    const profileArn = await helpers.createIamRole(roleName)
    const response = await createLaunchTemplate(ltName, profileArn)
    console.log('Created launch template with:', response)
  } catch (err) {
    console.error('Failed to create launch template with:', err)
  }
}

async function createLaunchTemplate (ltName, profileArn) {
  // TODO: Create a launch template
}

execute()