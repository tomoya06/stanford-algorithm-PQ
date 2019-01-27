const testData = require('./readfile')()
const assert = require('assert')
const Heap = require('heap')

let [visited, dis] = dijk(testData)

let checkNodes = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197]

for (let i=0; i<checkNodes.length; i++) {
    console.log(`${checkNodes[i]} : ${getDisOfNode(visited, dis, checkNodes[i])}`)
}

return 0

// naive 
function dijk(graph) {

    function findMin(visited, graph, sDis) {
        // naive way to find min
        let minLeft=0, minRight=0, minDis=0
        for (let i=0; i<visited.length; i++) {
            let curLeft = visited[i]
            for (let j=0; j<graph[curLeft].length; j++) {
                let curRight = graph[curLeft][j][0]
                if (visited.indexOf(curRight) >= 0) { continue }
    
                let curPath = graph[curLeft][j][1]
                let curMin = sDis[i] + curPath
                if (minDis===0 || minDis > curMin) {
                    minDis = curMin
                    minLeft = curLeft
                    minRight = curRight
                }
            }
        }
        return [minLeft, minRight, minDis]
    }

    let visited = [1]
    let total = graph.length - 1
    let sDis = [0]

    while (visited.length < total) {
        let [newLeft, newRight, newDis] = findMin(visited, graph, sDis)
        assert.strictEqual(visited.indexOf(newRight) < 0, true)
        visited.push(newRight)
        sDis.push(newDis)
    }

    return [visited, sDis]
}

// with heap
function dijk(graph) {
    const disHeap = new Heap((a, b) => a[1] - b[1])
    disHeap.insert([1, 0])
    for (let i=2; i<graph.length; i++) {
        disHeap.insert([i, 1000000])
    }

    let visited = []
    let minDis = []

    while (disHeap.nodes.length > 0) {
        let [curLeft, curLeftDis] = disHeap.pop()
        visited.push(curLeft)
        minDis.push(curLeftDis)
        for (let i=0; i<graph[curLeft].length; i++) {
            let curRight = graph[curLeft][i][0]
            if (visited.indexOf(curRight) >= 0) { continue }
            let curPath = graph[curLeft][i][1]
            let nodeInHeap = disHeap.nodes.find(node => node[0]==curRight)
            if (nodeInHeap[1] > curLeftDis + curPath) {
                nodeInHeap[1] = curLeftDis + curPath
                disHeap.heapify()
            }
        }
    }

    return [visited, minDis]
}

function getDisOfNode(visited, dis, node) {
    let idx = visited.indexOf(node)
    return dis[idx]
}
