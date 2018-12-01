export const solution = {
  a: {
    input: providedInput,
    solution: input => {
      return input.reduce((tally, inputVal) => (tally += eval(inputVal)), 0)
    }
  },
  b: {
    input: providedInput,
    solution: inputs => {
      let frequencies = { 0: true }
      let foundDuplicate = false
      let currentFrequency = 0

      while (!foundDuplicate) {
        for (let index = 0; index < inputs.length && !foundDuplicate; index++) {
          currentFrequency += eval(inputs[index])

          if (frequencies[currentFrequency]) {
            foundDuplicate = true
          } else {
            frequencies[currentFrequency] = true
          }
        }
      }

      return currentFrequency
    }
  }
}

export default solution
