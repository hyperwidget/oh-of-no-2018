import { cloneDeep } from 'lodash'
const LUMBERYARD = '#'
const OPEN = '.'
const TREES = '|'

const getAdjacentValues = (grid, x, y) => {
  let adjacents = []

  //I'ma just hardcode some of this

  // Row above
  if (y > 0) {
    if (x > 0) {
      adjacents.push(grid[y - 1][x - 1])
    }
    adjacents.push(grid[y - 1][x])
    if (x + 1 < grid[y].length) {
      adjacents.push(grid[y - 1][x + 1])
    }
  }

  // Current row
  if (x > 0) {
    adjacents.push(grid[y][x - 1])
  }
  if (x + 1 < grid[y].length) {
    adjacents.push(grid[y][x + 1])
  }

  // Next Row
  if (y + 1 <= grid.length - 1) {
    if (x > 0) {
      adjacents.push(grid[y + 1][x - 1])
    }
    adjacents.push(grid[y + 1][x])
    if (x + 1 < grid[y].length) {
      adjacents.push(grid[y + 1][x + 1])
    }
  }

  // if (y === 1 && x == 4) {
  //   console.log(adjacents, grid[y + 1], 'GET NEXT RIW')
  // }
  return adjacents
}

export default {
  a: input => {
    let grid = []

    input.forEach(instruction => {
      grid.push(instruction.split(''))
    })
    // console.table(grid)

    for (let minutes = 0; minutes < 10; minutes++) {
      const copy = cloneDeep(grid)
      // console.table(copy)
      // console.log('copy', minutes)
      for (let row = 0; row < copy.length; row++) {
        for (let col = 0; col < copy[row].length; col++) {
          const adjacents = getAdjacentValues(copy, col, row)
          const currentVal = copy[row][col]
          const adjacentString = adjacents.join('')
          // if (row === 1 && col == 4) {
          //   console.log(adjacents, 'Hiii')
          // }

          switch (currentVal) {
            case OPEN:
              if ((adjacentString.match(/\|/g) || []).length >= 3) {
                grid[row][col] = TREES
              }
              break
            case TREES:
              if ((adjacentString.match(/\#/g) || []).length >= 3) {
                grid[row][col] = LUMBERYARD
              }
              break
            case LUMBERYARD:
              if (
                (adjacentString.match(/\#/g) || []).length >= 1 &&
                (adjacentString.match(/\|/g) || []).length >= 1
              ) {
                grid[row][col] = LUMBERYARD
              } else {
                grid[row][col] = OPEN
              }
              break
            default:
              break
          }
        }
      }
      // console.table(grid)
    }

    const finalString = grid.map(row => row.join('')).join('')
    const treeTotal = (finalString.match(/\|/g) || []).length
    const lumberYardTotal = (finalString.match(/\#/g) || []).length

    return treeTotal * lumberYardTotal
  },
  b: input => {
    let grid = []

    input.forEach(instruction => {
      grid.push(instruction.split(''))
    })
    // console.table(grid)

    let lastTotal = 0
    const values = []
    let searchVal = ''

    for (let minutes = 0; minutes < 1000000000; minutes++) {
      const copy = cloneDeep(grid)
      // console.table(copy)
      // console.log('copy', minutes)
      for (let row = 0; row < copy.length; row++) {
        for (let col = 0; col < copy[row].length; col++) {
          const adjacents = getAdjacentValues(copy, col, row)
          const currentVal = copy[row][col]
          const adjacentString = adjacents.join('')
          // if (row === 1 && col == 4) {
          //   console.log(adjacents, 'Hiii')
          // }

          switch (currentVal) {
            case OPEN:
              if ((adjacentString.match(/\|/g) || []).length >= 3) {
                grid[row][col] = TREES
              }
              break
            case TREES:
              if ((adjacentString.match(/\#/g) || []).length >= 3) {
                grid[row][col] = LUMBERYARD
              }
              break
            case LUMBERYARD:
              if (
                (adjacentString.match(/\#/g) || []).length >= 1 &&
                (adjacentString.match(/\|/g) || []).length >= 1
              ) {
                grid[row][col] = LUMBERYARD
              } else {
                grid[row][col] = OPEN
              }
              break
            default:
              break
          }
        }
      }
      // console.table(grid)

      const stringy = grid.map(row => row.join('')).join('\n')

      if (values.includes(stringy) && searchVal === stringy) {
        // console.log(minutes - lastTotal)
        const diff = minutes - lastTotal
        console.log(minutes)

        if (diff < 300) {
          // console.log(1000000000 - minutes, 'sub')
          // console.log(minutes, 'minutes')
          // console.log(diff, 'diff')
          // console.log(
          //   `increasing by ${Math.floor(
          //     Math.abs((1000000000 - minutes) / diff)
          //   ) * diff}`
          // )
          if (minutes + (diff - 1) * 10000 < 1000000000) {
            minutes += (diff - 1) * 10000
          }
        }
        lastTotal = minutes

        // console.log(stringy)
        // console.log(grid.map(row => row.join('')).join('\n'))
      } else if (values.includes(stringy)) {
        if (searchVal === '') {
          searchVal = stringy
        }
      } else {
        values.push(stringy)
      }

      if (minutes % 28 === 0) {
        // console.log(minutes)
        // console.log(grid.map(row => row.join('')).join('\n'))
        // const treeTotal = (finalString.match(/\|/g) || []).length
        // const lumberYardTotal = (finalString.match(/\#/g) || []).length
        // let currentVal = treeTotal * lumberYardTotal
        // console.log(currentVal)
        // console.log(currentVal - lastTotal)
        // lastTotal = currentVal
      }
    }
    console.log(grid.map(row => row.join('')).join('\n'))

    const finalString = grid.map(row => row.join('')).join('')
    const treeTotal = (finalString.match(/\|/g) || []).length
    const lumberYardTotal = (finalString.match(/\#/g) || []).length

    return treeTotal * lumberYardTotal

    // 197999 too high
  }
}
