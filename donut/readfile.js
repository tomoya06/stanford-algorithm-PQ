const fs = require('fs')
const path = require('path')

module.exports = function() {
    let intArr = []
    
    try {
        let data = fs.readFileSync(path.resolve(__dirname, 'QuickSort.txt'))
        let strArr = data.toString().split('\n')
        strArr.pop()
        strArr.forEach(item => intArr.push(parseInt(item)))
    } catch (error) {
        console.log(error)
    }

    return intArr
}
