const { MaxHeap, MinHeap } = require('./heap')

const minh = new MinHeap()
const maxh = new MaxHeap()

for (let i=0; i< 10; i++) {
    let newNum = Math.floor(Math.random() * 20)
    minh.push(newNum)
    maxh.push(newNum)
}

minh.print()
maxh.print() 

return 0