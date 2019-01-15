function quicksortAndCountComparisonsBeginPivotWrapper(arr, begin, end) {
    return quicksortAndCountComparisons(arr, begin, end, function(){})
}

function quicksortAndCountComparisonsEndPivotWrapper(arr, begin, end) {
    return quicksortAndCountComparisons(arr, begin, end, function(arr, begin, end) {
        [arr[begin], arr[end]] = [arr[end], arr[begin]]
    })
}

function quicksortAndCountComparisonsMidPivotWrapper(arr, begin, end) {
    return quicksortAndCountComparisons(arr, begin, end, function(arr, begin, end) {
        let mid = Math.floor((begin+end)/2)
        if (arr[begin] < arr[mid] && arr[mid] < arr[end] || arr[end] < arr[mid] && arr[mid] < arr[begin]) { 
            [arr[begin], arr[mid]] = [arr[mid], arr[begin]]; return 
        }
        if (arr[begin] < arr[end] && arr[end] < arr[mid] || arr[mid] < arr[end] && arr[end] < arr[begin]) {
            [arr[begin], arr[end]] = [arr[end], arr[begin]]; return 
        }
    })
}

function quicksortAndCountComparisons(arr, begin, end, init) {
    if (begin >= end) {
        return 0
    }

    init(arr, begin, end)

    let pivot = arr[begin]
    let i = begin+1

    for (let j = begin+1; j<=end; j++) {
        if (arr[j] < pivot) {
            [arr[j], arr[i]] = [arr[i], arr[j]]
            i++
        }
    }

    [arr[i-1], arr[begin]] = [arr[begin], arr[i-1]]

    let leftCnt = quicksortAndCountComparisons(arr, begin, i-2, init)
    let rightCnt = quicksortAndCountComparisons(arr, i, end, init)

    return (end - begin + leftCnt + rightCnt)
}

// let testArr = [1, 7, 4, 3, 5, 2, 6]
const readfile = require('./readfile')
let testArr = readfile()

let cnt = quicksortAndCountComparisonsMidPivotWrapper(testArr, 0, testArr.length-1)

return 0