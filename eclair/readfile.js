const fs = require('fs')
const path = require('path')

module.exports = function() {
    let graph = []
    graph.push([])
    
    try {
        let data = fs.readFileSync(path.resolve(__dirname, 'kargerMinCut.txt'))
        let strArr = data.toString().split('\n')
        strArr.pop()
        strArr.forEach(item => {
            let edgesArr = item.split('\t')
            edgesArr.pop()

            let edgesForCurNode = []
            edgesArr.forEach(edge => edgesForCurNode.push(parseInt(edge)))
            graph.push(edgesForCurNode)
        })
    } catch (error) {
        console.log(error)
    }

    return graph
}
