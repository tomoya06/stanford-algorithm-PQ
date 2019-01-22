const readfile = require('./readfile')

let { graph, graphRev, finishingTimes, leaders } = readfile()

console.count()

let defaultOrder = finishingTimes.slice(0)
dfsLoop(graphRev, defaultOrder, finishingTimes, leaders)
console.count()

defaultOrder = finishingTimes.slice(0)
dfsLoop(graph, defaultOrder, finishingTimes, leaders)
console.count()

let res = countLeaders(leaders)
console.count()

return 0


function dfsLoop(graph, order, finishingTimes, leaders) {
    let t = 0
    let s = null
    let states = []

    for (let i = order.length-1; i >= 1; i--) {
        let curNode = order.indexOf(i)
        if (!states[curNode]) {
            s = curNode
            dfs(curNode)
        }
    }

    // function dfs(node) {
    //     states[node] = true
    //     leaders[node] = s
    //     graph[node].forEach(endNode => {
    //         if (!states[endNode]) { dfs(endNode) }
    //     })
    //     t++
    //     finishingTimes[node] = t
    // }

    /**
     * dfs from a node
     * @param {Number} node 
     */
    function dfs(node) {
        let curRoute = []
        pushNodeToRoute(node, curRoute)
        while (curRoute.length > 0) {
            let flag = false
            let lastNode = curRoute[curRoute.length-1]
            for (let i=0; i<graph[lastNode].length; i++) {
                if (!states[graph[lastNode][i]]) {
                    // An unvisited child node is found
                    pushNodeToRoute(graph[lastNode][i], curRoute)
                    flag = true
                    break
                }
            }
            // flag stays false means no unvisited child node, current node is done.
            if (!flag) { 
                t++
                finishingTimes[curRoute.pop()] = t
            }
        }
    }

    /**
     * mark a new node
     * @param {Number} node 
     * @param {Number[]} route 
     */
    function pushNodeToRoute(node, route) {
        route.push(node)
        states[node] = true
        leaders[node] = s
    }
}

function countLeaders(leaders) {
    let leaderNodes = [], cnts = []
    leaders.forEach(leader => {
        let idx = leaderNodes.indexOf(leader)
        if (idx < 0) {
            leaderNodes.push(leader)
            cnts.push(1)
        } else {
            cnts[idx]++
        }
    })

    return findTops(cnts, leaderNodes, 5)
}

/**
 * find top [total] items
 * @param {Number[]} list 
 * @param {Array} siList 
 * @param {Number} total 
 */
function findTops(list, siList, total) {
    let results = [], siResults = []
    for (let i=0; i<total; i++) { 
        results.push(0)
        results.push(0)
    }
    for (let i=1; i < list.length; i++) {
        let flag = false
        for (let n = 0; n < total; n++) {
            if (list[i] > results[n]) {
                results.splice(n, 0, list[i])
                siResults.splice(n, 0, siList[i])
                flag = true
                break
            }
        }
        if (flag) {
            if (results.length > total) {
                results.pop()
                siResults.pop()
            }
        }
    }
    return [results, siResults]
}