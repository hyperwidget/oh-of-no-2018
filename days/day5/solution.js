const removeReactions = input => {
  let matchStart = false
  // Loop through input from the start, if the next letter is the same letter
  // but opposite case then return the input minus those two indexes

  for (let i = 0; i < input.length - 1 && matchStart === false; i++) {
    const letter = input[i]
    const nextLetter = input[i + 1]
    if (
      (letter === letter.toLowerCase() &&
        letter.toUpperCase() === nextLetter) ||
      (letter === letter.toUpperCase() && letter.toLowerCase() === nextLetter)
    ) {
      matchStart = i
      break
    }
  }

  if (matchStart !== false) {
    return input.slice(0, matchStart).concat(input.slice(matchStart + 2))
  } else {
    return input
  }
}

export default {
  a: inputs => {
    const input = inputs[0]

    let done = false
    let splitVals = input.split('')

    // keep removing reactions until there are no more
    while (!done) {
      const startCount = splitVals.length

      splitVals = removeReactions(splitVals)

      // No changes - ur done
      if (startCount === splitVals.length) {
        done = true
      }
    }

    return splitVals.length
  },
  b: inputs => {
    const input = inputs[0]

    let lowest = false
    // For every letter in the alphabet, remove each case from the original string
    // Process as above for each, tracking the lowest amount of letters left
    for (let i = 0; i < 26; i++) {
      let done = false
      const letter = (i + 10).toString(36)
      let splitVals = input
        .replace(new RegExp(letter, 'g'), '')
        .replace(new RegExp(letter.toUpperCase(), 'g'), '')
        .split('')

      while (!done) {
        const startCount = splitVals.length

        splitVals = removeReactions(splitVals)

        // No changes - ur done
        if (startCount === splitVals.length) {
          done = true
        }
      }

      if (lowest === false || splitVals.length < lowest) {
        lowest = splitVals.length
      }
    }

    return lowest
  }
}
