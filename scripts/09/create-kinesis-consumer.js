// Imports
const {
  CreateEventSourceMappingCommand,
  CreateFunctionCommand
} = require('@aws-sdk/client-lambda')
const helpers = require('./helpers')

// Declare local variables
const functionName = 'hamster-kinesis-stream-consumer'
const kinesisArn = '/* TODO: Add your kinesis ARN */'

async function execute () {
  try {
    const roleArn = await helpers.createLambdaKinesisRole()
    const codeBuffer = await helpers.zipLambdaFile()
    await createLambdaFunction(roleArn, functionName, codeBuffer)
    const response = await createTrigger(kinesisArn, functionName)
    console.log(response)
  } catch (err) {
    console.error('Error creating lambda function:', err)
  }
}

async function createLambdaFunction (roleArn, lambdaName, zippedCode) {
  const params = {
    Code: {
      ZipFile: zippedCode
    },
    FunctionName: lambdaName,
    Handler: 'index.handler',
    Role: roleArn,
    Runtime: 'nodejs14.x',
    Description: 'A kinesis consumer for the hbfl demo project',
    MemorySize: 128,
    Publish: true,
    Timeout: 15
  }

  const command = new CreateFunctionCommand(params)
  return helpers.sendLambdaCommand(command)
}

function createTrigger (kinesisArn, lambdaName) {
  const params = {
    // TODO: Add properties for trigger
  }

  const command = new CreateEventSourceMappingCommand(params)
  return helpers.sendLambdaCommand(command)
}

execute()
