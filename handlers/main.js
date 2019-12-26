const initialState = require('../lib/data/initialState')
const fs = require('fs')
const path = require('path')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)

module.exports = async () => {
  const state = await initialState()
  const data = await readFileAsync(path.join(__dirname, 'template', 'index.html'))
  return data.toString().replace(/\$\$state/, JSON.stringify(state))
}
