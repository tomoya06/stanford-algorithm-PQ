const fs = require('fs')

module.exports = function() {
    let intArr = []
    
    try {
        let data = fs.readFileSync('./IntegerArray.txt')
        let strArr = data.toString().split('\n')
        strArr.pop()
        strArr.forEach(item => intArr.push(parseInt(item)))
    } catch (error) {
        
    }

    return intArr
}


