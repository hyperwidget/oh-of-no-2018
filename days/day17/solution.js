const flow = (grid, startingX, startingY) => {
  let y = startingY
  let x = startingX
  let done = false
  let overflow = false
  let counter = 1
  let lastX = 0
  let lastY = 0
  // while (!done && counter <= 5) {

  while (!overflow) {
    lastX = x
    lastY = y
    y = startingY
    x = startingX
    let splash = false
    while (!splash) {
      if (y + 1 > grid.length - 1) {
        splash = true
        overflow = true
      } else if (grid[y + 1][x] === '-') {
        if (y > 70 && y < 80 && x < 70) {
          console.log(x, y, 'splash IN ZONE')
        }
        splash = true
        overflow = true
        // console.log('SPLASHOVERFLOW')
      }

      if (!splash) {
        if (grid[y + 1][x] !== '#' && grid[y + 1][x] !== '~') {
          y++
          grid[y][x] = '|'
        } else {
          splash = true
          grid[y][x] = '~'
          let fullRight = false
          let fullLeft = false
          const startSpreadX = x
          while (!fullRight) {
            if (grid[y][x + 1] !== '#') {
              x++
              if (grid[y + 1][x] === '.') {
                // console.log(grid[y + 1][x - 1], y, x, 'FALL')

                // backtrack to start of spread to make them all '-'
                for (let i = x; i >= startSpreadX; i--) {
                  grid[y][i] = '-'
                }

                grid[y][x] = '|'
                grid = flow(
                  grid,
                  x,
                  y
                )
                fullRight = true
              } else {
                grid[y][x] = '~'
              }
              // } else {
              //   fullRight = true
              //   // rightOverflow = true
              // }
            } else {
              fullRight = true
              // rightOverflow = true
            }
          }

          x = startSpreadX
          // console.log('WATER')

          while (!fullLeft) {
            // console.log(x, y)
            if (x <= 0) {
              // console.log('overflow, cmon')
              overflow = true
              let overflowedLeft = true
              fullLeft = true
            }
            {
              if (grid[y][x - 1] !== '#') {
                x--
                if (grid[y + 1][x] === '.') {
                  grid[y][x] = '|'
                  for (let i = x; i <= startSpreadX; i++) {
                    grid[y][i] = '-'
                  }
                  grid = flow(
                    grid,
                    x,
                    y
                  )
                  fullLeft = true
                } else {
                  grid[y][x] = '~'
                }
              } else {
                fullLeft = true
              }
            }
          }

          if (overflow) {
          }
        }
      }

      if (overflow) {
        y++
        if (grid[y]) {
          while (grid[y][x + 1] === '~') {
            x++
            grid[y][x] = '-'
          }
          x = startingX
          while (grid[y][x - 1] === '~') {
            x--
            grid[y][x] = '-'
          }
        }
      }
    }

    if (lastX === x && lastY === y) {
      console.log('NO MOVEMENT')
      console.log(y, x)
      overflow = true
    }
    counter++
  }

  // }

  return grid
}

export default {
  a: input => {
    let grid = []
    let highestX = 0
    let lowestX = 999
    let lowestY = 0
    let highestY = 0

    // Super not clever way of setting everything up, I don't care
    input.forEach(instruction => {
      const splitVal = instruction.split(', ')

      const part1 = splitVal[0].split('=')
      const part2 = splitVal[1].split('=')
      const part2Spread = part2[1].split('..').map(val => parseInt(val))

      if (part1[0] === 'x') {
        if (parseInt(part1[1]) > highestX) {
          highestX = parseInt(part1[1])
        }
        if (parseInt(part1[1]) < lowestX) {
          lowestX = parseInt(part1[1])
        }
      }
      if (part1[0] === 'y') {
        if (parseInt(part1[1]) > highestY) {
          highestY = parseInt(part1[1])
        }
        if (parseInt(part1[1]) < lowestY) {
          lowestY = parseInt(part1[1])
        }
      }

      if (part2[0] === 'x') {
        if (part2Spread[part2Spread.length - 1] > highestX) {
          highestX = part2Spread[part2Spread.length - 1]
        }
        if (part2Spread[0] < lowestX) {
          lowestX = part2Spread[0]
        }
      }
      if (part2[0] === 'y') {
        if (part2Spread[part2Spread.length - 1] > highestY) {
          highestY = part2Spread[part2Spread.length - 1]
        }

        if (part2Spread[0] < lowestY) {
          lowestY = part2Spread[0]
        }
      }
    })

    for (let y = 0; y <= highestY; y++) {
      grid.push([])
      for (let x = 0; x <= highestX + 1; x++) {
        grid[y].push('.')
      }
    }

    // Duplication? oh wells
    input.forEach(instruction => {
      const splitVal = instruction.split(', ')

      const part1 = splitVal[0].split('=')
      const part2 = splitVal[1].split('=')
      const part2Spread = part2[1].split('..').map(val => parseInt(val))

      if (part2[0] === 'x') {
        for (
          let i = part2Spread[0];
          i <= part2Spread[part2Spread.length - 1];
          i++
        ) {
          grid[part1[1]][i] = '#'
        }
      }
      if (part2[0] === 'y') {
        for (
          let i = part2Spread[0];
          i <= part2Spread[part2Spread.length - 1];
          i++
        ) {
          grid[i][part1[1]] = '#'
        }
      }
    })

    grid[0][500] = '+'

    // Lets make the grid smaller, we only care about values in it
    // console.log(`${lowestX}, ${highestX}`)

    const startingPlace = 500 - lowestX + 1
    // console.log(startingPlace)

    for (let i = 0; i < grid.length; i++) {
      grid[i] = grid[i].slice(lowestX - 2, highestX + 2)
    }

    let done = false
    let counter = 1
    // while (!done && counter <= 5) {
    grid = flow(
      grid,
      startingPlace,
      0
    )

    // console.table(grid)

    for (let i = 0; i < grid.length; i++) {
      // if (i > 70 && i < 80) {
      console.log(grid[i].join(''))
      // }
    }

    let total = 0
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const val = grid[i][j]
        if (val === '|' || val === '~' || val === '-') {
          total++
        }
      }
    }

    return total
    // 118 too small
    // 31955 too big (didn't subtract 2)
    // 31953 too big (didn't subtract 2)
  },
  b: input => {
    let grid = []
    let highestX = 0
    let lowestX = 999
    let lowestY = 0
    let highestY = 0

    // Super not clever way of setting everything up, I don't care
    input.forEach(instruction => {
      const splitVal = instruction.split(', ')

      const part1 = splitVal[0].split('=')
      const part2 = splitVal[1].split('=')
      const part2Spread = part2[1].split('..').map(val => parseInt(val))

      if (part1[0] === 'x') {
        if (parseInt(part1[1]) > highestX) {
          highestX = parseInt(part1[1])
        }
        if (parseInt(part1[1]) < lowestX) {
          lowestX = parseInt(part1[1])
        }
      }
      if (part1[0] === 'y') {
        if (parseInt(part1[1]) > highestY) {
          highestY = parseInt(part1[1])
        }
        if (parseInt(part1[1]) < lowestY) {
          lowestY = parseInt(part1[1])
        }
      }

      if (part2[0] === 'x') {
        if (part2Spread[part2Spread.length - 1] > highestX) {
          highestX = part2Spread[part2Spread.length - 1]
        }
        if (part2Spread[0] < lowestX) {
          lowestX = part2Spread[0]
        }
      }
      if (part2[0] === 'y') {
        if (part2Spread[part2Spread.length - 1] > highestY) {
          highestY = part2Spread[part2Spread.length - 1]
        }

        if (part2Spread[0] < lowestY) {
          lowestY = part2Spread[0]
        }
      }
    })

    for (let y = 0; y <= highestY; y++) {
      grid.push([])
      for (let x = 0; x <= highestX + 1; x++) {
        grid[y].push('.')
      }
    }

    // Duplication? oh wells
    input.forEach(instruction => {
      const splitVal = instruction.split(', ')

      const part1 = splitVal[0].split('=')
      const part2 = splitVal[1].split('=')
      const part2Spread = part2[1].split('..').map(val => parseInt(val))

      if (part2[0] === 'x') {
        for (
          let i = part2Spread[0];
          i <= part2Spread[part2Spread.length - 1];
          i++
        ) {
          grid[part1[1]][i] = '#'
        }
      }
      if (part2[0] === 'y') {
        for (
          let i = part2Spread[0];
          i <= part2Spread[part2Spread.length - 1];
          i++
        ) {
          grid[i][part1[1]] = '#'
        }
      }
    })

    grid[0][500] = '+'

    // Lets make the grid smaller, we only care about values in it
    // console.log(`${lowestX}, ${highestX}`)

    const startingPlace = 500 - lowestX + 1
    // console.log(startingPlace)

    for (let i = 0; i < grid.length; i++) {
      grid[i] = grid[i].slice(lowestX - 2, highestX + 2)
    }

    let done = false
    let counter = 1
    // while (!done && counter <= 5) {
    grid = flow(
      grid,
      startingPlace,
      0
    )

    // console.table(grid)

    for (let i = 0; i < grid.length; i++) {
      // if (i > 70 && i < 80) {
      console.log(grid[i].join(''))
      // }
    }

    let total = 0
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const val = grid[i][j]
        if (val === '~') {
          total++
        }
      }
    }

    return total
    //
  }
}
