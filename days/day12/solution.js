const getIndicesOf = (searchStr, str) => {
  var searchStrLen = searchStr.length
  if (searchStrLen == 0) {
    return []
  }
  var startIndex = 0,
    index,
    indices = []

  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index)
    startIndex = index + 1
  }
  return indices
}

export default {
  a: inputs => {
    let generation = 0
    const instructions = {}
    const historicStates = []
    let currentZeroIndex = 0

    let state = '....' + inputs.shift() + '....'
    inputs.shift()
    currentZeroIndex += 4

    inputs.forEach((input, index) => {
      const val = input.replace(' =>', '').split(' ')
      instructions[index] = {
        value: val[0],
        result: val[1]
      }
    })

    for (let i = 0; i < 20; i++) {
      let newState = ''
      if (inputs.length === 14) {
        newState = '.'.repeat(state.length)
      } else {
        newState = state
      }

      for (const key in instructions) {
        const instruction = instructions[key]
        const indices = getIndicesOf(instruction.value, state)

        if (indices.length > 0) {
          indices.forEach(index => {
            newState =
              newState.substr(0, index + 2) +
              instruction.result +
              newState.substr(index + 3)
          })
        }

        const length = newState.length
        if (
          Math.max(...indices) + 5 >= length &&
          (newState[length - 1] === '#' ||
            newState[length - 2] === '#' ||
            newState[length - 3] === '#' ||
            newState[length - 4] === '#' ||
            newState[length - 5] === '#')
        ) {
          newState = newState + '....'
        }
        if (
          (Math.min(...indices) < 2 && newState[0] === '#') ||
          newState[1] === '#'
        ) {
          console.log('ADDING')
          newState = '..' + newState
          currentZeroIndex += 2
        }
      }

      state = newState
      historicStates.push(state)
    }

    const indexesOfPlants = getIndicesOf('#', state)

    const potSum = indexesOfPlants.reduce(
      (total, pot) => pot - currentZeroIndex + total,
      0
    )

    return potSum
  },
  b: inputs => {
    console.log('test')
    let generation = 0
    const instructions = {}
    const historicStates = []
    let currentZeroIndex = 0
    let potSum = 0
    let lastDiff = 0

    let state = '....' + inputs.shift() + '....'
    inputs.shift()
    currentZeroIndex += 4

    inputs.forEach((input, index) => {
      const val = input.replace(' =>', '').split(' ')
      instructions[index] = {
        value: val[0],
        result: val[1]
      }
    })

    for (let i = 0; i < 1000; i++) {
      let newState = ''
      if (inputs.length === 14) {
        newState = '.'.repeat(state.length)
      } else {
        newState = state
      }

      for (const key in instructions) {
        const instruction = instructions[key]
        const indices = getIndicesOf(instruction.value, state)
        if (indices.length > 0) {
          indices.forEach(index => {
            newState =
              newState.substr(0, index + 2) +
              instruction.result +
              newState.substr(index + 3)
          })
        }

        const length = newState.length
        if (
          Math.max(...indices) + 5 >= length &&
          (newState[length - 1] === '#' ||
            newState[length - 2] === '#' ||
            newState[length - 3] === '#' ||
            newState[length - 4] === '#' ||
            newState[length - 5] === '#')
        ) {
          newState = newState + '....'
        }
        if (
          (Math.min(...indices) < 2 && newState[0] === '#') ||
          newState[1] === '#'
        ) {
          newState = '..' + newState
          currentZeroIndex += 2
        }
      }

      state = newState
      historicStates.push(state)

      const indexesOfPlants = getIndicesOf('#', state)

      const currentSum = indexesOfPlants.reduce(
        (total, pot) => pot - currentZeroIndex + total,
        0
      )

      lastDiff = currentSum - potSum
      potSum = currentSum
    }

    const total = potSum + (50000000000 - 1000) * lastDiff

    return total

    // 299649998214115 - too high
    // 2996499994036 - too high
    // 2649999996115 - wrong
    // 2649999996062 - also wrong
    // 63679500 - too low
  }
}
