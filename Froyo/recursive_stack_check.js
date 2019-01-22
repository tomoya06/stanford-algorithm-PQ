function checkStackDepth() {
    try {
        return 1+checkStackDepth()
    } catch (error) {
        return 1
    }
}

console.log(checkStackDepth())