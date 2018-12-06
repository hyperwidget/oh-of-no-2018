import { flattenDeep, max, countBy, uniq, maxBy } from 'lodash'

const calcMan = (x1, x2, y1, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

export default {
  a: inputs => {
    const formattedInput = inputs.map(input => {
      const vals = input.split(',')
      return [parseInt(vals[0]), parseInt(vals[1])]
    })

    // find max size of grid to fill it
    let maxSize = max(flattenDeep(formattedInput)) + 1

    // create grid
    const grid = Array(maxSize)
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Array(maxSize)
    }

    // add inputs to grid
    for (let i = 0; i < formattedInput.length; i++) {
      const input = formattedInput[i]
      grid[input[1]][input[0]] = i + 1 + '*'
    }

    // loop through each grid slot
    for (let row = 0; row < maxSize; row++) {
      for (let col = 0; col < maxSize; col++) {
        // If this isn't an input slot, don't track
        if (!grid[row][col]) {
          // track closest in grid slot
          let closest = maxSize
          let closestInput = -1
          // loop through each input and determine closest manhattan distance

          for (let i = 0; i < formattedInput.length; i++) {
            const man = calcMan(
              row,
              formattedInput[i][1],
              col,
              formattedInput[i][0]
            )
            if (man < closest) {
              closest = man
              closestInput = i + 1
            }

            // if same closeness to multiple - then `.`s
            else if (man === closest) {
              closestInput = '.'
            }
          }
          grid[row][col] = closestInput
        }
      }
    }

    // count all occurances of a number in grid
    const valueCounts = countBy(flattenDeep(grid))

    // get values on outside of grid (they'll be infinite)
    const outerVals = []
    for (let col = 0; col < maxSize; col++) {
      outerVals.push(grid[0][col])
    }
    for (let col = 0; col < maxSize; col++) {
      outerVals.push(grid[maxSize - 1][col])
    }
    for (let row = 0; row < maxSize; row++) {
      outerVals.push(grid[row][0])
    }
    for (let row = 0; row < maxSize; row++) {
      outerVals.push(grid[row][maxSize - 1])
    }

    const cleanOuterVals = uniq(outerVals)
    const cleanOuterValsObject = {}

    for (let i = 0; i < cleanOuterVals.length; i++) {
      cleanOuterValsObject[cleanOuterVals[i]] = 0
    }

    const cleanedVals = {}
    // console.log(valueCounts)

    // remove outerVals from value counts
    for (const key in valueCounts) {
      if (valueCounts.hasOwnProperty(key)) {
        const element = valueCounts[key]
        if (cleanOuterValsObject[key] === undefined) {
          cleanedVals[key] = element
        }
      }
    }

    const maxVal = maxBy(Object.keys(cleanedVals), o => cleanedVals[o])

    return cleanedVals[maxVal] + 1
  },
  b: inputs => {
    let maxDistance = 0
    const formattedInput = inputs.map(input => {
      const vals = input.split(',')
      return [parseInt(vals[0]), parseInt(vals[1])]
    })

    if (formattedInput.length === 6) {
      maxDistance = 32
    } else {
      maxDistance = 10000
    }

    // find max size of grid to fill it
    let maxSize = max(flattenDeep(formattedInput)) + 1

    // create grid
    const grid = Array(maxSize)
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Array(maxSize)
    }

    // add inputs to grid
    for (let i = 0; i < formattedInput.length; i++) {
      const input = formattedInput[i]
      grid[input[1]][input[0]] = i + 1 + '*'
    }

    // loop through each grid slot
    for (let row = 0; row < maxSize; row++) {
      for (let col = 0; col < maxSize; col++) {
        // If this isn't an input slot, don't track
        // track closest in grid slot
        let totalMan = 0
        let closestInput = -1
        // loop through each input and track manhattan distance
        for (let i = 0; i < formattedInput.length; i++) {
          const man = calcMan(
            row,
            formattedInput[i][1],
            col,
            formattedInput[i][0]
          )
          totalMan += man
        }

        // If value is less than target then hashtag it #blessed
        if (totalMan < maxDistance) {
          grid[row][col] = '#'
        } else {
          grid[row][col] = '.'
        }
      }
    }

    // count all occurances of '#'
    return countBy(flattenDeep(grid))['#']
  }
}
