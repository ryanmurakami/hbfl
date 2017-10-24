const initialState = require('../lib/data/initialState')
const fs = require('fs')
const path = require('path')

module.exports = (reqest, reply) => {
  initialState()
    .then((state) => {
      fs.readFile(path.join(__dirname, 'template', 'index.html'), (err, data) => {
        if (err) throw err
        reply(data.toString().replace(/\$\$state/, JSON.stringify(state)))
      })
    })
}
