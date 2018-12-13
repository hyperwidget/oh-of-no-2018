import { sortBy } from 'lodash'

const getSortedCartIds = carts => {
  const cars = []
  for (const key in carts) {
    cars.push({
      key,
      row: carts[key].currentPosition[0],
      col: carts[key].currentPosition[1]
    })
  }

  return sortBy(cars, c => [c.row, c.col])
}

export default {
  a: inputs => {
    const grid = []
    const cars = {}
    let carCounter = 1
    let moveCounter = 0
    let crash = false

    // Set initial Everything
    inputs.forEach(input => {
      grid.push(input.split(''))
    })

    for (let row = 0; row < grid.length - 1; row++) {
      for (let col = 0; col < grid[row].length - 1; col++) {
        let cell = grid[row][col]
        if (cell === 'v' || cell == '^' || cell == '>' || cell == '<') {
          cars[carCounter] = {
            currentPosition: [row, col],
            currentSymbol: cell,
            lastIntersectionDirection: 'right'
          }
          carCounter++
          if (cell === 'v' || cell == '^') {
            grid[row][col] = '|'
          } else {
            grid[row][col] = '-'
          }
        }
      }
    }

    while (!crash) {
      const carOrder = getSortedCartIds(cars)
      const activeCoords = []

      carOrder.forEach(sortedCar => {
        const currentCar = cars[sortedCar.key]
        switch (currentCar.currentSymbol) {
          case '^':
            currentCar.currentPosition[0] = currentCar.currentPosition[0] - 1
            break
          case 'v':
            currentCar.currentPosition[0] = currentCar.currentPosition[0] + 1

            break
          case '<':
            currentCar.currentPosition[1] = currentCar.currentPosition[1] - 1
            break
          case '>':
            currentCar.currentPosition[1] = currentCar.currentPosition[1] + 1
            break
          default:
            break
        }

        const currentPos = currentCar.currentPosition.join(',')
        if (activeCoords.indexOf(currentPos) > -1) {
          console.log('KABLAM 😭')
          crash = currentPos
          return currentPos
          // return not being respected?
        }

        // because icky return
        if (!crash) {
          activeCoords.push(currentPos)

          const cellValue =
            grid[currentCar.currentPosition[0]][currentCar.currentPosition[1]]

          switch (cellValue) {
            case '\\':
              switch (currentCar.currentSymbol) {
                case '^':
                  currentCar.currentSymbol = '<'

                  break
                case 'v':
                  currentCar.currentSymbol = '>'

                  break
                case '<':
                  currentCar.currentSymbol = '^'

                  break
                case '>':
                  currentCar.currentSymbol = 'v'
                  break

                default:
                  break
              }
              break
            case '/':
              switch (currentCar.currentSymbol) {
                case '^':
                  currentCar.currentSymbol = '>'

                  break
                case 'v':
                  currentCar.currentSymbol = '<'

                  break
                case '<':
                  currentCar.currentSymbol = 'v'

                  break
                case '>':
                  currentCar.currentSymbol = '^'
                  break

                default:
                  break
              }
              break
            case '+':
              switch (currentCar.lastIntersectionDirection) {
                case 'left':
                  currentCar.lastIntersectionDirection = 'straight'
                  break
                case 'straight':
                  switch (currentCar.currentSymbol) {
                    case '^':
                      currentCar.currentSymbol = '>'

                      break
                    case 'v':
                      currentCar.currentSymbol = '<'

                      break
                    case '<':
                      currentCar.currentSymbol = '^'

                      break
                    case '>':
                      currentCar.currentSymbol = 'v'
                      break

                    default:
                      break
                  }
                  currentCar.lastIntersectionDirection = 'right'
                  break
                case 'right':
                  switch (currentCar.currentSymbol) {
                    case '^':
                      currentCar.currentSymbol = '<'

                      break
                    case 'v':
                      currentCar.currentSymbol = '>'

                      break
                    case '<':
                      currentCar.currentSymbol = 'v'

                      break
                    case '>':
                      currentCar.currentSymbol = '^'
                      break

                    default:
                      break
                  }
                  currentCar.lastIntersectionDirection = 'left'
                  break

                default:
                  break
              }
              break

            default:
              break
          }
        }
      })

      moveCounter++
    }

    // reverse the answer because reasons
    return crash
  },
  b: inputs => {
    const grid = []
    const cars = {}
    let carCounter = 1
    let moveCounter = 0
    let crash = false
    let remainingCarCount = 20

    // Set initial Everything
    inputs.forEach(input => {
      grid.push(input.split(''))
    })

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        let cell = grid[row][col]
        if (cell === 'v' || cell == '^' || cell == '>' || cell == '<') {
          cars[carCounter] = {
            currentPosition: [row, col],
            currentSymbol: cell,
            lastIntersectionDirection: 'right'
          }
          carCounter++
          if (cell === 'v' || cell == '^') {
            grid[row][col] = '|'
          } else {
            grid[row][col] = '-'
          }
        }
      }
    }

    while (remainingCarCount > 1) {
      const carOrder = getSortedCartIds(cars)
      const movedCars = []
      for (let i = 0; i < carOrder.length - 1; i++) {
        if (
          cars[carOrder[i].key].currentPosition[0] ===
            cars[carOrder[i + 1].key].currentPosition[0] &&
          cars[carOrder[i].key].currentPosition[1] ===
            cars[carOrder[i + 1].key].currentPosition[1] - 1
        ) {
        }
      }

      carOrder.forEach(sortedCar => {
        let crash = false
        const currentCar = cars[sortedCar.key]
        if (currentCar) {
          switch (currentCar.currentSymbol) {
            case '^':
              currentCar.currentPosition[0] = currentCar.currentPosition[0] - 1
              break
            case 'v':
              currentCar.currentPosition[0] = currentCar.currentPosition[0] + 1

              break
            case '<':
              currentCar.currentPosition[1] = currentCar.currentPosition[1] - 1
              break
            case '>':
              currentCar.currentPosition[1] = currentCar.currentPosition[1] + 1
              break
            default:
              break
          }

          const currentPos = currentCar.currentPosition.join(',')
          Object.keys(cars).map(id => {
            if (id !== sortedCar.key) {
              const compCar = cars[id]
              if (
                currentCar.currentPosition[0] === compCar.currentPosition[0] &&
                currentCar.currentPosition[1] === compCar.currentPosition[1]
              ) {
                console.log('KABLAM 😭')
                console.log(compCar, currentCar)
                console.log('removing: ', sortedCar.key, id)

                cars[sortedCar.key].deleted = true
                cars[id].deleted = true
                delete cars[sortedCar.key]
                delete cars[id]
                crash = currentPos
              }
            }
          })

          // because icky return
          if (!crash) {
            const cellValue =
              grid[currentCar.currentPosition[0]][currentCar.currentPosition[1]]

            switch (cellValue) {
              case '\\':
                switch (currentCar.currentSymbol) {
                  case '^':
                    currentCar.currentSymbol = '<'

                    break
                  case 'v':
                    currentCar.currentSymbol = '>'

                    break
                  case '<':
                    currentCar.currentSymbol = '^'

                    break
                  case '>':
                    currentCar.currentSymbol = 'v'
                    break

                  default:
                    break
                }
                break
              case '/':
                switch (currentCar.currentSymbol) {
                  case '^':
                    currentCar.currentSymbol = '>'

                    break
                  case 'v':
                    currentCar.currentSymbol = '<'

                    break
                  case '<':
                    currentCar.currentSymbol = 'v'

                    break
                  case '>':
                    currentCar.currentSymbol = '^'
                    break

                  default:
                    break
                }
                break
              case '+':
                switch (currentCar.lastIntersectionDirection) {
                  case 'left':
                    currentCar.lastIntersectionDirection = 'straight'
                    break
                  case 'straight':
                    switch (currentCar.currentSymbol) {
                      case '^':
                        currentCar.currentSymbol = '>'

                        break
                      case 'v':
                        currentCar.currentSymbol = '<'

                        break
                      case '<':
                        currentCar.currentSymbol = '^'

                        break
                      case '>':
                        currentCar.currentSymbol = 'v'
                        break

                      default:
                        break
                    }
                    currentCar.lastIntersectionDirection = 'right'
                    break
                  case 'right':
                    switch (currentCar.currentSymbol) {
                      case '^':
                        currentCar.currentSymbol = '<'

                        break
                      case 'v':
                        currentCar.currentSymbol = '>'

                        break
                      case '<':
                        currentCar.currentSymbol = 'v'

                        break
                      case '>':
                        currentCar.currentSymbol = '^'
                        break

                      default:
                        break
                    }
                    currentCar.lastIntersectionDirection = 'left'
                    break

                  default:
                    break
                }
                break

              default:
                break
            }
          }

          movedCars.push({
            id: sortedCar.key,
            position: currentCar.currentPosition
          })
        }
      })

      remainingCarCount = Object.keys(cars).length
      moveCounter++
    }

    console.log(cars)
    // reverse the answer because reasons
    return crash

    // 98,125 -- wrong
    // 98,124 -- wrong
    // I was not correctly accounting for `>>>` scenarios
  }
}
