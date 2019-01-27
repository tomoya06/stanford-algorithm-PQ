const fs = require('fs')
const path = require('path')

module.exports = function() {
    let dataStream = fs.readFileSync(path.resolve(__dirname, 'dijkstraData.txt')).toString()
    let dataRows = dataStream.split('\n').slice(0, -1)
    let resultRows = [null]
    dataRows.forEach(row => {
        let newRow = row.split(/[\s\t]+/).slice(1, -1)
        newRow = newRow.map(col => col.split(','))
        newRow = newRow.map(colPair => colPair.map(str => parseInt(str)))
        resultRows.push(newRow)
    })
    
    return resultRows
}
