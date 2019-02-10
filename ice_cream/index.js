const MinHeap = require('heap-min-max').MinHeap
const MaxHeap = require('heap-min-max').MaxHeap

const number_stream = require('./readfile')()

const lowHalf = new MaxHeap()
const hihHalf = new MinHeap()

let midcnt = 0

for (let i=0; i<number_stream.length; i++) {
    let curNum = number_stream[i]
    if (!lowHalf.topKey() || curNum <= lowHalf.topKey()) {
        lowHalf.push(curNum)
    } else {
        hihHalf.push(curNum)
    }
    if (i % 2 == 0) {
        while (lowHalf.items.length - hihHalf.items.length !== 1) {
            if (lowHalf.items.length - hihHalf.items.length > 1) {
                let tmp = lowHalf.popKey()
                hihHalf.push(tmp)
            } else {
                let tmp = hihHalf.popKey()
                lowHalf.push(tmp)
            }
        }
    } else {
        while (hihHalf.items.length !== lowHalf.items.length) {
            if (hihHalf.items.length > lowHalf.items.length) {
                let tmp = hihHalf.popKey()
                lowHalf.push(tmp)
            } else {
                let tmp = lowHalf.popKey()
                hihHalf.push(tmp)
            }
        }
    }
    let curmid = lowHalf.topKey()
    midcnt = (midcnt + curmid) % 10000
}

console.log(midcnt)
// console.log(lowHalf.topKey())
