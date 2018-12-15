import { sortBy } from 'lodash'
import PF from 'pathfinding'

const finder = new PF.AStarFinder()

const BATTLE_OVER = 'done'
const ATTACK = 'attack'
const MOVE = 'move'
const NOTHING = 'nothing'

const getSortedUnits = units => {
  const sorted = sortBy(units, ['currentPosition'])
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

const getEmptyAdjacentCells = (unit, grid) => {
  const pos = unit.currentPosition
  const cells = []

  // above
  if (grid[pos[0] - 1][pos[1]] === '.') {
    cells.push([pos[0] - 1, pos[1]])
  }
  // left
  if (grid[pos[0]][pos[1] - 1] === '.') {
    cells.push([pos[0], pos[1] - 1])
  }
  // right
  if (grid[pos[0]][pos[1 + 1]] === '.') {
    cells.push([pos[0], pos[1] + 1])
  }

  //below
  if (grid[pos[0] + 1][pos[1]] === '.') {
    cells.push([pos[0] + 1, pos[1]])
  }

  return cells
}

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

  console.log(paths, unit.id)

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
      const nextStep = getNextStep(unit, grid, remainingEnemies)
      if (nextStep && !alreadyMoved) {
        action.type = MOVE
        action.target = nextStep
      } else {
        action.type = NOTHING
      }
    }
  }

  console.log(unit.id, action)

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
    let done = false
    while (!done && turnCount < 25) {
      const sortedUnits = getSortedUnits(units)
      // console.log(sortedUnits, 'SORTED')

      sortedUnits.forEach(unitId => {
        const currentUnit = units[unitId]
        if (!currentUnit.dead) {
          const action = getUnitsNextAction(currentUnit, grid, units)
          switch (action.type) {
            case ATTACK:
              const targetUnit = units[action.target]
              targetUnit.health -= currentUnit.attack
              console.log(`${currentUnit.id} ATTACKS ${action.target}`)
              if (targetUnit.health <= 0) {
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
                console.log(
                  `${currentUnit.id} ATTACKS ${followUpAction.target}`
                )
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
              break
            default:
              break
          }
        }
        // console.table(grid)
      })

      turnCount++
      console.table(grid)
      console.log('NEW TURN, turn ' + turnCount)
    }

    // console.log(units)
    // console.table(grid)

    return input
  },
  b: input => {
    return input
  }
}
