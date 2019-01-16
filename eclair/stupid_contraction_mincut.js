// Index start from 1 but not 0.
// Graph format: [[], [1, 3, 4, ...], [1, 2, 4], ...] (array of edges. the 0th item of array is empty. start from 1)
// Only need to count the remain crossing edges. 

let testGraph = require('./readfile')()

let mincut = 0

function binaryAdder(binArr) {
    let top = 0
    binArr[binArr.length-1]++
    for (let i=binArr.length-1; i>=0; i--) {
        if (binArr[i] >= 2) {
            if (i <= 1) { return null }
            binArr[i] = 0
            binArr[i-1]++
            top = i
        }
    }
    return top? top: 1
}

let counter = (new Array(testGraph.length)).fill(0)
let counterTop = 0

// let loopTimes = 10000

for (;;) {

    let cutCnt = 0
    let leftNodes = []

    let adderRes = binaryAdder(counter)
    if (!adderRes) { break }
    if (adderRes >= counterTop) { counterTop = adderRes }

    for (let node=1; node<testGraph.length; node++) {
        if (counter[node]) {
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
        console.log(`new min cut: ${mincut}`) 
        console.log(counter.join().toString())
    }
}

console.log('Finished')
return 0
