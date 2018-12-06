export default {
  a: inputs => {
    // Literally make a grid of 1000*1000 and fill it with dots
    const grid = Array(1000)
    for (let index = 0; index < grid.length; index++) {
      grid[index] = Array(1000).fill('.')
    }
    let count = 0
    grid[1][1] = 'x'

    // For every instruction, parse out into bits that are needed
    inputs.forEach(input => {
      const instruction = input.split(' ')
      const coords = instruction[2].replace(':', '').split(',')
      const size = instruction[3].split('x')

      // Loop through each instruction and add a `1` in every square that should be placed
      // If an overlap happens, put an x and increase the count of overlaps
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

    // Return overlaps
    return count
  },
  b: inputs => {
    // All this is exactly the same as part a
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

    // _THIS_ is just genious /s
    // This loops through all the instructions _backwards_ after having already
    // gone through the instructions in the original order
    // that way I don't need to worry about whether or not a future instruction
    // doesn't overlap with this one, because all the future instructions have been run already
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
