// leftchild = parent*2+1
// rightchild = parent*2+2

class Heap {
    /**
     * Initialization
     * @param {boolean} flag True for min-heap or false for max-heap
     */
    constructor(flag = true) {
        this.flag = flag
        this.array = []
    }

    _isProperPosition(idx) {
        if (idx == 0) return true
        const parentIdx = (idx % 2 == 0) ? parseInt(idx / 2) - 1 : parseInt(idx / 2)
        const lcidx = idx * 2 + 1
        const rcidx = idx * 2 + 2
        if (this.flag) {
            return this.array[idx] >= this.array[parentIdx] &&
                (!this.array[lcidx] || this.array[idx] <= this.array[lcidx]) &&
                (!this.array[rcidx] || this.array[idx] <= this.array[rcidx])
        } else {
            return this.array[idx] <= this.array[Math.floor(idx / 2)] &&
                (!this.array[lcidx] || this.array[idx] >= this.array[lcidx]) &&
                (!this.array[rcidx] || this.array[idx] >= this.array[rcidx])
        }
    }

    _bubbleUp(idx) {
        const pridx = Math.floor(idx / 2)
        [this.array[idx], this.array[pridx]] = [this.array[pridx], this.array[idx]]
        return pridx
    }
    
    _bubbleDown(idx) {
        const lfCdIdx = idx * 2 + 1, rgCdIdx = idx * 2 + 2
        const dCdIdx = (!this.array[rgCdIdx] || this.array[lfCdIdx] <= this.array[rgCdIdx]) ?
            lfCdIdx : rgCdIdx
            
        [this.array[idx], this.array[dCdIdx]] = [this.array[dCdIdx], this.array[idx]]
        // this._swap(this.array[idx], this.array[dCdIdx])
        return dCdIdx
    }

    push(key) {
        if (typeof key !== 'number') return
        this.array.push(key)
        let idx = this.array.length - 1
        while (!this._isProperPosition(idx)) {
            idx = this._bubbleUp(idx)
        }
    }

    pop() {
        this.array[0] = this.array[this.array.length - 1]
        this.array.pop()
        while (!this._isProperPosition(idx)) {
            idx = this._bubbleDown(idx)
        }
    }

    print() {
        // let rowCnt = 1
        // let ttcnt = 0
        // while (ttcnt < this.array.length) {
        //     console.log(this.array.slice(ttcnt, rowCnt).join(' '))
        //     ttcnt += rowCnt
        //     rowCnt *= 2
        // }
        console.log(this.array.join(' '))
    }
}

class MinHeap extends Heap {
    constructor() {
        super(true)
    }
}

class MaxHeap extends Heap {
    constructor() {
        super(false)
    }
}

module.exports = {
    MinHeap,
    MaxHeap
}