const fs = require('fs')
const path = require('path')

module.exports = function() {
    let graph = []
    
    try {
        let data = fs.readFileSync(path.resolve(__dirname, 'kargerMinCut.txt'))
        let strArr = data.toString().split('\n')
        strArr.pop()
        strArr.forEach(item => {
            let edgesArr = item.split('\t')
            edgesArr.pop()
            edgesArr = edgesArr.map(item => parseInt(item))
            graph.push([[edgesArr.shift()], edgesArr])
        })
    } catch (error) {
        console.log(error)
    }

    return graph
}
