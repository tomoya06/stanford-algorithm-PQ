// let testArr = [1, 5, 3, 2, 4]
const readArr = require('./readfile')
let testArr = readArr()

function sortAndCount(arr, low, high) {
    if (high - low == 0) {
        return [[arr[high]], 0];
    }
    
    let mid = Math.floor((low + high) / 2)
    let [leftArr, leftCnt] = sortAndCount(arr, low, mid)
    let [rightArr, rightCnt] = sortAndCount(arr, mid+1, high)

    let mergedArr = []
    let curInversionCnt = 0
    while (leftArr.length || rightArr.length) {
        if (leftArr.length && rightArr.length) {
            if (leftArr[0] <= rightArr[0]) {
                mergedArr.push(leftArr[0])
                leftArr.shift()
            } else {
                mergedArr.push(rightArr[0])
                rightArr.shift()
                curInversionCnt += leftArr.length
            }
        } else {
            while (leftArr.length) {
                mergedArr.push(leftArr[0])
                leftArr.shift()
            }
            while (rightArr.length) {
                mergedArr.push(rightArr[0])
                rightArr.shift()
            }
        }
        
    }
    return [mergedArr, curInversionCnt+leftCnt+rightCnt]
}

let [sortedArr, inversionCnt] = sortAndCount(testArr, 0, testArr.length-1)

return 0