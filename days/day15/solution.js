import { sortBy, cloneDeep } from 'lodash'
import PF from 'pathfinding'

const finder = new PF.AStarFinder()

const BATTLE_OVER = 'done'
const ATTACK = 'attack'
const MOVE = 'move'
const NOTHING = 'nothing'

const getSortedUnits = units => {
  const sorted = sortBy(units, [
    function(u) {
      return u.currentPosition[0]
    },
    function(u) {
      return u.currentPosition[1]
    }
  ])
  const alive = sorted.filter(unit => !unit.dead)

  return alive.map(unit => unit.id)
}

const getInitialUnits = grid => {
  const units = {}
  let unitCount = { G: 1, E: 1 }
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cellValue = grid[row][col]

      if (cellValue === 'G' || cellValue === 'E') {
        const newUnit = {
          id: `${cellValue}${unitCount[cellValue]}`,
          health: 200,
          attack: 3,
          currentPosition: [row, col],
          type: cellValue,
          dead: false
        }
        units[newUnit.id] = newUnit
        unitCount[cellValue]++
      }
    }
  }

  return units
}

const griderator = grid => {}

const getEmptyAdjacentCells = (pos, grid) => {
  const cells = []

  // console.log(pos, 'POS')
  // above
  if (grid[pos[0] - 1][pos[1]] === '.') {
    cells.push([pos[0] - 1, pos[1]])
  }
  // left
  if (grid[pos[0]][pos[1] - 1] === '.') {
    // console.log('LEFT')
    cells.push([pos[0], pos[1] - 1])
  }
  // right
  if (grid[pos[0]][pos[1] + 1] === '.') {
    // console.log('RIGHT')
    cells.push([pos[0], pos[1] + 1])
  }

  //below
  if (grid[pos[0] + 1][pos[1]] === '.') {
    // console.log('BLOW')
    cells.push([pos[0] + 1, pos[1]])
  }

  return cells
}

function findNextMovement(unit, grid, enemies) {
  let targetKeys = {} // "x,y" ==> { x, y } of alive enemy
  enemies
    .filter(e => !e.dead && e.type !== unit.type)
    .map(e => getEmptyAdjacentCells(e.currentPosition, grid))
    .reduce((acc, list) => {
      return acc.concat(...[list])
    }, [])
    .map(vals => {
      return vals
    })
    .forEach(pos => {
      targetKeys[`${pos[0]},${pos[1]}`] = pos
    })

  // console.log(targetKeys, 'KEYS')

  let visited = {}
  visited[`${unit.currentPosition[0]},${unit.currentPosition[1]}`] = true

  let paths = [[unit.currentPosition]]
  while (true) {
    let newPaths = []
    let targetPaths = []
    paths.forEach(path => {
      // console.log(paths, path[path.length - 1], 'path-1')
      let adjacents = getEmptyAdjacentCells(path[path.length - 1], grid)
      // console.log(path[path.length - 1], adjacents, 'jacents')
      adjacents.forEach(adj => {
        let xy = `${adj[0]},${adj[1]}`
        // if (unit.id === 'G1') {
        // console.log(xy, 'xy')
        // console.log(grid[adj[0]][adj[1]], 'CELL CONTENT')
        // console.log(!visited[xy], visited, 'VISITED')
        // }
        if (targetKeys[xy]) {
          // found a path to a target!
          // add it so at the end of the iteration we chose the right one based on enemy order
          targetPaths.push([...path, adj, targetKeys[xy]])
        } else if (!visited[xy] && grid[adj[0]][adj[1]] === '.') {
          // new extended path to explore at next iteration
          newPaths.push([...path, adj])
          // console.log(newPaths, 'NEWPATHS')
        }
        visited[xy] = true // mark as visited so other paths ignore it
      })
    })

    // console.log(targetPaths, 'tp')
    if (targetPaths.length > 0) {
      // we got one or more paths reaching a target for the first time, here is where our search ends
      // if we found multiple shortest paths, use the one that reaches the first target according top-to-bottom/left-to-right order

      targetPaths = targetPaths.sort((p1, p2) =>
        p1[p1.length - 1][0] === p2[p2.length - 1][0]
          ? p1[p1.length - 1][1] - p2[p2.length - 1][1]
          : p1[p1.length - 1][0] - p2[p2.length - 1][0]
      )

      if (targetPaths.length > 1) {
        // console.log(targetPaths.map(target => target[target.length - 1]))
        // console.log(targetPaths.map(target => target[target.length - 1].length))
        const t1 = targetPaths[0][targetPaths[0].length - 1]
        const t2 = targetPaths[1][targetPaths[0].length - 1]
        // console.log(targetPaths)
        // console.log(
        //   `chooses ${targetPaths[0][1]} (${
        //     targetPaths[0][targetPaths[0].length - 1]
        //   })`
        // )
        if (targetPaths[0].length === targetPaths[1].length) {
          if (t1[0] !== t2[0] && t1[1] !== t2[1]) {
            // console.log(targetPaths[0].length, targetPaths[1].length)
            // console.log(targetPaths[0][targetPaths[0].length - 1])
            // console.log(targetPaths[1][targetPaths[1].length - 1])
            // console.table(grid)
            // console.log(unit.currentPosition)
            const n1 = targetPaths[0][1]
            const n2 = targetPaths[1][1]
            // console.log('DIFFERENT target')
            // console.log(
            //   `chooses ${targetPaths[0][1]} (${
            //     targetPaths[0][targetPaths[0].length - 1]
            //   })`
            // )
            // console.log(t1, t2)
            if (n2[0] < n1[0] || (n2[0] === n1[0] && n2[1] < n1[1])) {
              return targetPaths[1][1]
            }
          } else {
            // console.table(grid)
            // console.log('same target')
            // console.log(unit.currentPosition)
            // console.log(t1, t2)
          }
        }
      }

      // if (
      //   unit.id === 'G7' &&
      //   unit.currentPosition[0] === 8 &&
      //   unit.currentPosition[1] === 23
      // ) {
      // console.log(grid.map(row => row.join('')).join('\n'))
      // console.log(targetPaths)
      // console.log(
      //   targetPaths[0][1],
      //   targetPaths[0][targetPaths[0].length - 1],
      //   'TARGETPATHS, I CHOOSE YOU'
      // )
      // }

      // return the first step to take for the shortest path ([0] is the player current position)
      return targetPaths[0][1]
    }

    // no paths to a target found yet, keep iterating with the paths after one more step
    paths = newPaths
    // console.log(paths, 'pathsEnd')
    if (paths.length < 1) return null // no reachables targets, search ends without a result
  }
}

// First version; tool would only return a single path :'(
const getShortestPath = (unit, grid, enemies) => {
  const paths = []
  let shortestPath = false

  const startX = unit.currentPosition[1]
  const startY = unit.currentPosition[0]

  const translatedGrid = grid.map(row =>
    row
      .join('')
      .replace(/\./g, 0)
      .replace(/E/g, 1)
      .replace(/G/g, 1)
      .replace(/#/g, 1)
      .split('')
      .map(val => parseInt(val))
  )

  for (const key in enemies) {
    const enemy = enemies[key]
    const pfGrid = new PF.Grid(translatedGrid)
    pfGrid.setWalkableAt(startX, startY, true)

    const targets = getEmptyAdjacentCells(enemy, grid)
    targets.forEach(cell => {
      const endX = cell[1]
      const endY = cell[0]
      const cloned = pfGrid.clone()

      const path = finder.findPath(startX, startY, endX, endY, cloned)
      // console.log(endX, endY, path)
      paths.push({ length: path.length, path, cell })
    })
  }

  // console.log(paths, unit.id)

  paths.forEach(path => {
    if (path.length !== 0) {
      if (path.length < shortestPath.length || shortestPath === false) {
        shortestPath = path
      } else if (path.length === shortestPath.length) {
        const currentPath = path.path
        const shortestPathPath = shortestPath.path

        // console.log(`TIE BETWEEN `)
        // console.log(path)
        // console.log(shortestPath)

        if (currentPath[1][0][1] < shortestPathPath[1][0][1]) {
          shortestPath = path
          // console.log(`CHOSE because above`)
          // console.log(shortestPath)
        } else if (
          currentPath[1][0][1] === shortestPathPath[1][0][1] &&
          currentPath[1][1] < shortestPathPath[1][1]
        ) {
          shortestPath = path
          // console.log(`CHOSE because before`)
          // console.log(shortestPath)
        }
      }
    }
  })

  return shortestPath
}

const getNextStep = (unit, grid, enemies) => {
  const shortestPath = getShortestPath(unit, grid, enemies).path
  if (shortestPath) {
    const nextStep = shortestPath[1]
    return [nextStep[1], nextStep[0]]
  } else {
    return shortestPath
  }
}

const getRemainingEnemies = (currentUnitType, units) => {
  const enemyUnits = []
  for (const id in units) {
    const unit = units[id]
    if (unit.type !== currentUnitType && unit.health > 0) {
      enemyUnits.push(unit)
    }
  }

  return enemyUnits
}

const getEnemiesWithinRange = (unit, enemies) => {
  const currentPosition = unit.currentPosition
  const inRange = enemies.filter(enemy => {
    const enemyPosition = enemy.currentPosition

    if (
      (enemyPosition[0] === currentPosition[0] - 1 &&
        enemyPosition[1] === currentPosition[1]) ||
      (enemyPosition[0] === currentPosition[0] + 1 &&
        enemyPosition[1] === currentPosition[1]) ||
      (enemyPosition[0] === currentPosition[0] &&
        enemyPosition[1] === currentPosition[1] - 1) ||
      (enemyPosition[0] === currentPosition[0] &&
        enemyPosition[1] === currentPosition[1] + 1)
    )
      return true
  })

  return getSortedUnits(inRange)
}

const getUnitsNextAction = (unit, grid, units, alreadyMoved = false) => {
  const currentPosition = unit.currentPosition
  const action = {}

  const remainingEnemies = getRemainingEnemies(unit.type, units)

  if (remainingEnemies.length === 0) {
    action.type = BATTLE_OVER
  } else {
    const enemiesInRage = getEnemiesWithinRange(unit, remainingEnemies)

    if (enemiesInRage.length > 0) {
      action.type = ATTACK
      action.target = enemiesInRage.reduce((lowest, enemy) => {
        const lowestEnemyHealth = units[lowest].health
        const current = units[enemy].health

        if (current < lowestEnemyHealth) {
          return enemy
        }
        return lowest
      })
    } else {
      const nextStep = findNextMovement(unit, grid, remainingEnemies)
      // console.log(nextStep, 'MOVE')
      if (nextStep && !alreadyMoved) {
        action.type = MOVE
        action.target = nextStep
      } else {
        action.type = NOTHING
      }
    }
  }

  // console.log(unit.id, action)

  return action
}

export default {
  a: input => {
    const grid = []

    // Get the grid
    input.forEach(row => {
      grid.push(row.split(''))
    })

    const units = getInitialUnits(grid)

    let turnCount = 0
    let endedBeforeEndOfTurn = false
    let done = false
    while (!done) {
      const sortedUnits = getSortedUnits(units)
      // console.log(sortedUnits, 'SORTED')

      sortedUnits.forEach((unitId, index) => {
        const currentUnit = units[unitId]
        if (!currentUnit.dead) {
          const action = getUnitsNextAction(currentUnit, grid, units)
          switch (action.type) {
            case ATTACK:
              const targetUnit = units[action.target]
              targetUnit.health -= currentUnit.attack
              // console.log(`${currentUnit.id} ATTACKS ${action.target}`)
              if (targetUnit.health <= 0) {
                // console.log(`${action.target} DIES!`)
                targetUnit.dead = true
                grid[targetUnit.currentPosition[0]][
                  targetUnit.currentPosition[1]
                ] = '.'
              }
              break
            case MOVE:
              grid[currentUnit.currentPosition[0]][
                currentUnit.currentPosition[1]
              ] = '.'
              currentUnit.currentPosition = action.target

              grid[currentUnit.currentPosition[0]][
                currentUnit.currentPosition[1]
              ] = currentUnit.type

              const followUpAction = getUnitsNextAction(
                currentUnit,
                grid,
                units,
                true
              )

              if (followUpAction.type === ATTACK) {
                const targetUnit = units[followUpAction.target]
                targetUnit.health -= currentUnit.attack
                // console.log(
                // `${currentUnit.id} ATTACKS ${followUpAction.target}`
                // )
                if (targetUnit.health <= 0) {
                  targetUnit.dead = true
                  grid[targetUnit.currentPosition[0]][
                    targetUnit.currentPosition[1]
                  ] = '.'
                }
              }

              break
            case BATTLE_OVER:
              done = true
              if (index !== sortedUnits.length - 1) {
                endedBeforeEndOfTurn = true
              }
              break
            default:
              break
          }
        }
        // console.table(grid)
      })

      // console.log(`After turn ${turnCount}`)
      // if (turnCount <= 4) {
      //   console.log(grid.map(row => row.join('')).join('\n'))
      //   console.log(units)
      // }

      turnCount++

      // console.log('NEW TURN, turn ' + turnCount)
    }

    // console.log(units)
    // console.table(grid)

    let totalTurns = turnCount - 1

    // console.log(totalTurns)
    // console.log(units)
    let totalHealth = 0
    for (const key in units) {
      const unit = units[key]
      if (!unit.dead) {
        totalHealth += unit.health
      }
    }

    // console.log(totalHealth)

    return totalTurns * totalHealth
  },
  b: input => {
    const baseGrid = []

    // Get the baseGrid
    input.forEach(row => {
      baseGrid.push(row.split(''))
    })

    let elfPower = 4

    const baseUnits = getInitialUnits(baseGrid)

    let turnCount = 0
    let endedBeforeEndOfTurn = false
    let done = false
    let units = {}
    let grid = []
    while (!done) {
      let elfDeath = 0
      units = cloneDeep(baseUnits)
      grid = cloneDeep(baseGrid)

      for (const key in units) {
        const unit = units[key]
        if (unit.type === 'E') {
          unit.attack = elfPower
        }
      }

      turnCount = 0
      while (elfDeath === 0 && !done) {
        const sortedUnits = getSortedUnits(units)
        // console.log(sortedUnits, 'SORTED')

        sortedUnits.forEach((unitId, index) => {
          const currentUnit = units[unitId]
          if (!currentUnit.dead) {
            const action = getUnitsNextAction(currentUnit, grid, units)
            switch (action.type) {
              case ATTACK:
                const targetUnit = units[action.target]
                targetUnit.health -= currentUnit.attack
                // console.log(`${currentUnit.id} ATTACKS ${action.target}`)
                if (targetUnit.health <= 0) {
                  // console.log(`${action.target} DIES!`)
                  if (targetUnit.type === 'E') {
                    elfDeath++
                  }
                  targetUnit.dead = true
                  grid[targetUnit.currentPosition[0]][
                    targetUnit.currentPosition[1]
                  ] = '.'
                }
                break
              case MOVE:
                grid[currentUnit.currentPosition[0]][
                  currentUnit.currentPosition[1]
                ] = '.'
                currentUnit.currentPosition = action.target

                grid[currentUnit.currentPosition[0]][
                  currentUnit.currentPosition[1]
                ] = currentUnit.type

                const followUpAction = getUnitsNextAction(
                  currentUnit,
                  grid,
                  units,
                  true
                )

                if (followUpAction.type === ATTACK) {
                  const targetUnit = units[followUpAction.target]
                  targetUnit.health -= currentUnit.attack
                  // console.log(
                  // `${currentUnit.id} ATTACKS ${followUpAction.target}`
                  // )
                  if (targetUnit.health <= 0) {
                    targetUnit.dead = true
                    if (targetUnit.type === 'E') {
                      elfDeath++
                    }
                    grid[targetUnit.currentPosition[0]][
                      targetUnit.currentPosition[1]
                    ] = '.'
                  }
                }

                break
              case BATTLE_OVER:
                done = true
                if (index !== sortedUnits.length - 1) {
                  endedBeforeEndOfTurn = true
                }
                break
              default:
                break
            }
          }
          // console.table(grid)
        })

        turnCount++
        // console.log(turnCount)
        // console.table(grid)
        // console.log('NEW TURN, turn ' + turnCount)
      }

      elfPower++
      // console.log(
      //   `Heck, a elf died; giving them more POWER, power is now ${elfPower}`
      // )
    }

    // console.log(units)
    // console.table(grid)

    let totalTurns = turnCount - 1

    // console.log(totalTurns)
    let totalHealth = 0
    for (const key in units) {
      const unit = units[key]
      if (!unit.dead) {
        totalHealth += unit.health
      }
    }

    // console.log(totalHealth)
    // console.log(elfPower)

    return totalTurns * totalHealth
  }
}
