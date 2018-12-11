export default {
  a: input => {
    const serial = parseInt(input[0])
    const grid = []
    for (let i = 0; i <= 300; i++) {
      grid[i] = []
    }

    for (let row = 1; row <= 300; row++) {
      for (let col = 1; col <= 300; col++) {
        const rackId = row + 10
        let powerLevel = rackId * col + serial
        powerLevel *= rackId

        const stringified = powerLevel.toString().split('')
        const hundreds = stringified[stringified.length - 3]
        let val = parseInt(hundreds) - 5
        grid[row - 1][col - 1] = val
      }
    }

    let highestIndex = []
    let highestIndexValue = 0

    for (let row = 0; row < 300; row += 2) {
      for (let col = 0; col < 300; ) {
        const startingPoint = [row + 1, col + 1]
        let sum = 0
        for (let i = row; i < row + 3; i++) {
          for (let j = col; j < col + 3; j++) {
            sum += grid[i][j]
          }
        }

        if (sum > highestIndexValue) {
          highestIndexValue = sum
          highestIndex = startingPoint
        }
        col += 2
      }
    }

    console.log(highestIndex, highestIndexValue)
    return input
  },
  b: input => {
    const serial = parseInt(input[0])
    const grid = []
    for (let i = 0; i <= 300; i++) {
      grid[i] = []
    }

    for (let row = 1; row <= 300; row++) {
      for (let col = 1; col <= 300; col++) {
        const rackId = row + 10
        let powerLevel = rackId * col + serial
        powerLevel *= rackId

        const stringified = powerLevel.toString().split('')
        const hundreds = stringified[stringified.length - 3]
        let val = parseInt(hundreds) - 5
        grid[row - 1][col - 1] = val
      }
    }

    let highestIndex = []
    let highestIndexValue = 0
    let highestGridSize = 0

    for (let gridSize = 1; gridSize <= 300; gridSize++) {
      console.log('checking grid', gridSize)
      for (let row = 0; row < 300 && row + gridSize < 300; row++) {
        for (let col = 0; col < 300 && col + gridSize < 300; col++) {
          const startingPoint = [row + 1, col + 1]

          let sum = 0
          for (let i = row; i < row + gridSize; i++) {
            for (let j = col; j < col + gridSize; j++) {
              sum += grid[i][j]
              TotalCounted++
            }
          }

          if (sum > highestIndexValue) {
            highestIndexValue = sum
            highestIndex = startingPoint
            highestGridSize = gridSize
          }
        }
      }
    }

    console.log(highestIndex, highestIndexValue, highestGridSize)
    return input
  }
}
