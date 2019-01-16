// Index start from 1 but not 0.
// Graph format: [[], [1, 3, 4, ...], [1, 2, 4], ...] (array of edges. the 0th item of array is empty. start from 1)
// Only need to count the remain crossing edges. 


let mincut = 0

let loopTimes = 10000
// return 0

for (let t = 0; t < loopTimes; t++) {

    let testGraph = require('./readfile')()
    while (testGraph.length > 2) {
        // randomly choose an edge
        let pickedFrom = Math.floor(Math.random() * testGraph.length)
        let pickedTo = Math.floor(Math.random() * testGraph[pickedFrom][1].length)

        // index conversion
        pickedTo = testGraph[pickedFrom][1][pickedTo]
        pickedTo = testGraph.findIndex((item) => {
            return (item[0].indexOf(pickedTo) >= 0)
        })

        // let pickedFrom = 0
        // let pickedTo = 1

        // join two nodes
        testGraph[pickedFrom][0] = testGraph[pickedFrom][0].concat(testGraph[pickedTo][0])
        testGraph[pickedFrom][1] = testGraph[pickedFrom][1].concat(testGraph[pickedTo][1])

        testGraph[pickedFrom][1] = testGraph[pickedFrom][1].filter(item => testGraph[pickedFrom][0].indexOf(item) < 0)

        testGraph.splice(pickedTo, 1)
    }

    let curCut = testGraph[0][1].length
    if (mincut == 0 || curCut < mincut) {
        mincut = curCut
        console.log(`New MINIMUM CUTS: ${mincut}`)
    }
    
}

return 0
