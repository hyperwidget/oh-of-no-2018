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

    let state = '..' + inputs.shift() + '..'
    inputs.shift()
    currentZeroIndex += 2

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
        console.log(key, 'key')
        console.log(state, 'previousState')
        console.log(newState, 'instructionStart')
        console.log(indices)
        console.log(instruction.value)
        console.log(instruction.result)
        if (indices.length > 0) {
          indices.forEach(index => {
            newState =
              newState.substr(0, index + 2) +
              instruction.result +
              newState.substr(index + 3)
            console.log(newState, 'afterChange')
          })
        }
      }

      state = '..' + newState + '..'
      currentZeroIndex += 2
      console.log(state)
      console.log(currentZeroIndex)
      historicStates.push(state)
    }

    const indexesOfPlants = getIndicesOf('#', state)
    // console.log(indexesOfPlants)

    console.log(indexesOfPlants.length)
    console.log(historicStates.length)

    const potSum = indexesOfPlants.reduce(
      (total, pot) => pot - currentZeroIndex + total,
      0
    )

    console.log(historicStates)

    return potSum
  },
  b: inputs => {
    return input
  }
}
