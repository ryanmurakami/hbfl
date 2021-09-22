// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
// TODO: Declare dynamoDB object

createTable('hamsters')
.then(() => createTable('races'))
.then(data => console.log(data))

function createTable (tableName) {
  // TODO: Declare params for createTable

  return new Promise((resolve, reject) => {
    // TODO: Call createTable function
  })
}
