const test = require('./readfile')()
const targets = new Set()

function findLeft(sort, low, high, target) {
    if (low >= high) return low
    const mid = Math.floor((low + high) / 2)
    if (target <= sort[mid]) return findLeft(sort, low, mid - 1, target)
    return findLeft(sort, mid + 1, high, target)
}

function findRight(sort, low, high, target) {
    if (low >= high) return low
    const mid = Math.floor((low + high) / 2)
    if (target >= sort[mid]) return findRight(sort, mid + 1, high, target)
    return findRight(sort, low, mid - 1, target)
}

test.sort((a, b) => a - b)

for (let _idx = 0; _idx < test.length; _idx++) {
    let _num = test[_idx]
    let lowIdx = findLeft(test, 0, test.length-1, -10000-_num)
    let hihIdx = findRight(test, 0, test.length-1, 10000-_num)
    let curIdx = lowIdx
    while (curIdx < hihIdx) {
        if (curIdx !== _idx) {
            if (test[curIdx]+_num <= 10000 && test[curIdx]+_num >= -10000)
                targets.add(test[curIdx] + _num)
        }
        curIdx++
    }
}

console.log(targets.size)

return 0
