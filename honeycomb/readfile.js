const fs = require('fs')
const path = require('path')

module.exports = function() {
    let dataStream = fs.readFileSync(path.resolve(__dirname, 'algo1.txt')).toString()
    let dataRows = dataStream.split('\n').slice(0, -1)
    return dataRows.map(_row => parseInt(_row))
}
