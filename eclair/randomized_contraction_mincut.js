// Index start from 1 but not 0.
// Graph format: [[], [1, 3, 4, ...], [1, 2, 4], ...] (array of edges. the 0th item of array is empty. start from 1)
// Only need to count the remain crossing edges. 

let testGraph = require('./readfile')()

let mincut = 0

// let loopTimes = 10000

for (;;) {

    let cutCnt = 0
    let leftNodes = []

    let curRate = Math.random()

    for (let node=1; node<testGraph.length; node++) {
        if (Math.random() < curRate) {
            leftNodes.push(node)
        }  
    }

    leftNodes.forEach((node) => {
        testGraph[node].forEach((edgeTo) => {
            if (leftNodes.indexOf(edgeTo) < 0) { // this edge goes to right. count it
                cutCnt++
            }
        })
    })

    if (cutCnt > 0 && (mincut == 0 || cutCnt<mincut)) { 
        mincut = cutCnt 
        console.clear()
        console.log(`New min cut: ${cutCnt}`)
    }
}

return 0
