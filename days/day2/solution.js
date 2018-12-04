export default {
  a: input => {
    let double = 0
    let triple = 0
    input.forEach(id => {
      let tracked = {}
      let doubleUsed = false
      let tripleUsed = false
      const splitVal = id.split('')

      splitVal.forEach(val => {
        if (tracked[val]) {
          tracked[val]++
        } else {
          tracked[val] = 1
        }
      })

      Object.keys(tracked).forEach(key => {
        if (!doubleUsed && tracked[key] === 2) {
          double++
          doubleUsed = true
        }

        if (!tripleUsed && tracked[key] === 3) {
          triple++
          tripleUsed = true
        }
      })
    })
    return double * triple
  },
  b: input => {
    const splitValues = input.map(val => val.split(''))
    let retVal = null

    splitValues.forEach(value => {
      splitValues.forEach(comparedAgainst => {
        let index = -1
        let differences = 0

        for (let i = 0; i < comparedAgainst.length && differences < 2; i++) {
          if (comparedAgainst[i] !== value[i]) {
            differences++
            index = i
          }
        }

        if (differences === 1) {
          retVal = comparedAgainst
            .slice(0, index)
            .concat(comparedAgainst.slice(index + 1))
            .join('')
        }
      })
    })

    return retVal
  }
}
