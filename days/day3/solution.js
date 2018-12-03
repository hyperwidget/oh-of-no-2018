export default {
  a: inputs => {
    const grid = Array(1000)
    for (let index = 0; index < grid.length; index++) {
      grid[index] = Array(1000).fill('.')
    }
    let count = 0
    grid[1][1] = 'x'

    inputs.forEach(input => {
      const instruction = input.split(' ')
      const coords = instruction[2].replace(':', '').split(',')
      const size = instruction[3].split('x')

      for (let row = 0; row < size[0]; row++) {
        for (let column = 0; column < size[1]; column++) {
          const rowVal = parseInt(coords[0]) + row
          const colVal = parseInt(coords[1]) + column
          const gridValue = grid[rowVal][colVal]

          if (gridValue === '.') {
            grid[rowVal][colVal] = 1
          } else if (gridValue === 1) {
            grid[rowVal][colVal] = 'x'
            count++
          }
        }
      }
    })

    return count
  },
  b: inputs => {
    const grid = Array(1000)
    for (let index = 0; index < grid.length; index++) {
      grid[index] = Array(1000).fill('.')
    }
    let retVal = null
    grid[1][1] = 'x'

    inputs.forEach(input => {
      const instruction = input.split(' ')
      const coords = instruction[2].replace(':', '').split(',')
      const size = instruction[3].split('x')

      for (let row = 0; row < size[0]; row++) {
        for (let column = 0; column < size[1]; column++) {
          const rowVal = parseInt(coords[0]) + row
          const colVal = parseInt(coords[1]) + column
          const gridValue = grid[rowVal][colVal]

          if (gridValue === '.') {
            grid[rowVal][colVal] = 1
          } else if (gridValue === 1) {
            grid[rowVal][colVal] = 'x'
          }
        }
      }
    })

    for (let index = inputs.length - 1; index > 0; index--) {
      const input = inputs[index]
      const instruction = input.split(' ')
      const coords = instruction[2].replace(':', '').split(',')
      const size = instruction[3].split('x')
      let overLapSize = 0

      for (let row = 0; row < size[0]; row++) {
        for (let column = 0; column < size[1]; column++) {
          const rowVal = parseInt(coords[0]) + row
          const colVal = parseInt(coords[1]) + column
          const gridValue = grid[rowVal][colVal]

          if (gridValue === 'x') {
            overLapSize++
          }
        }
      }

      if (overLapSize === 0) {
        retVal = instruction[0]
      }
    }

    return retVal
  }
}
