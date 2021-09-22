// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
// TODO: Declare dynamoDB DocumentClient object

helpers.getHamsterData()
.then(data => populateTable('hamsters', data))
.then(() => helpers.getRaceData())
.then(data => populateTable('races', data))
.then(data => console.log(data))

function populateTable (tableName, data) {
  // TODO: Create params const object

  return new Promise((resolve, reject) => {
    // TODO: Call batch write function
  })
}
