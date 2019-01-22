const fs = require('fs')
const path = require('path')

module.exports = function() {
    let graph = [null]
    let graphRev = [null]
    let finishingTimes = [null]
    let leaders = [null]
    let maxNodeIdx = 0
    

    let data = fs.readFileSync(path.resolve(__dirname, 'SCC.txt'))
    let strArr = data.toString().split('\n')

    strArr.forEach(row => {
        let numsOfRow = row.split(' ').slice(0, 2).map(col => parseInt(col))

        maxNodeIdx = numsOfRow[0] > maxNodeIdx ? numsOfRow[0] : maxNodeIdx
        maxNodeIdx = numsOfRow[1] > maxNodeIdx ? numsOfRow[1] : maxNodeIdx

        if (!graph[numsOfRow[0]]) {
            graph[numsOfRow[0]] = [numsOfRow[1]]
        } else {
            graph[numsOfRow[0]].push(numsOfRow[1])
        }

        if (!graphRev[numsOfRow[1]]) {
            graphRev[numsOfRow[1]] = [numsOfRow[0]]
        } else {
            graphRev[numsOfRow[1]].push(numsOfRow[0])
        }
    })

    for (let i = 1; i <= maxNodeIdx; i++) {
        if (!graph[i]) { graph[i] = [] }
        if (!graphRev[i]) { graphRev[i] = [] }
        finishingTimes[i] = i
        leaders[i] = 0
    }

    return {
        graph,
        graphRev,
        finishingTimes,
        leaders
    }
}