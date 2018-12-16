import { isEqual, intersection, difference } from 'lodash'

const addr = (register, a, b, c) => {
  register[c] = register[a] + register[b]
  return register
}

const addi = (register, a, b, c) => {
  register[c] = register[a] + b
  return register
}

const mulr = (register, a, b, c) => {
  register[c] = register[a] * register[b]
  return register
}

const muli = (register, a, b, c) => {
  register[c] = register[a] * b
  return register
}

const banr = (register, a, b, c) => {
  register[c] = register[a] & register[b]
  return register
}

const bani = (register, a, b, c) => {
  register[c] = register[a] & b
  return register
}

const borr = (register, a, b, c) => {
  register[c] = register[a] | register[b]
  return register
}

const bori = (register, a, b, c) => {
  register[c] = register[a] | b
  return register
}

const setr = (register, a, b, c) => {
  register[c] = register[a]
  return register
}

const seti = (register, a, b, c) => {
  register[c] = a
  return register
}

const gtir = (register, a, b, c) => {
  register[c] = a > register[b] ? 1 : 0
  return register
}

const gtri = (register, a, b, c) => {
  register[c] = register[a] > b ? 1 : 0
  return register
}

const gtrr = (register, a, b, c) => {
  register[c] = register[a] > register[b] ? 1 : 0
  return register
}

const eqir = (register, a, b, c) => {
  register[c] = a === register[b] ? 1 : 0

  return register
}

const eqri = (register, a, b, c) => {
  register[c] = register[a] === b ? 1 : 0
  return register
}

const eqrr = (register, a, b, c) => {
  register[c] = register[a] === register[b] ? 1 : 0
  return register
}

const funcMap = {
  0: addr,
  1: addi,
  2: mulr,
  3: muli,
  4: banr,
  5: bani,
  6: borr,
  7: bori,
  8: setr,
  9: seti,
  10: gtir,
  11: gtri,
  12: gtrr,
  13: eqir,
  14: eqri,
  15: eqrr
}

const copy = input => input.slice(0)

export default {
  a: input => {
    let totalMatches = 0
    for (let i = 0; i < input.length; i++) {
      const before = input[i]
        .split(': [')[1]
        .replace(']', '')
        .split(', ')
        .map(val => parseInt(val))
      const instruction = input[i + 1].split(' ').map(val => parseInt(val))
      const after = input[i + 2]
        .split(':  [')[1]
        .replace(']', '')
        .split(', ')
        .map(val => parseInt(val))
      let matches = 0

      console.log(before, 'before')
      console.log(instruction, 'instruction')
      console.log(after, 'after')

      const a = instruction[1]
      const b = instruction[2]
      const c = instruction[3]

      // console.log(addr(copy(before), instruction))

      if (isEqual(addr(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(addi(copy(before), a, b, c))

      if (isEqual(addi(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(mulr(copy(before), a, b, c))

      if (isEqual(mulr(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(muli(copy(before), a, b, c))

      if (isEqual(muli(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(banr(copy(before), a, b, c))

      if (isEqual(banr(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(bani(copy(before), a, b, c))

      if (isEqual(bani(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(borr(copy(before), a, b, c))

      if (isEqual(borr(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(bori(copy(before), a, b, c))

      if (isEqual(bori(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(setr(copy(before), a, b, c))

      if (isEqual(setr(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(seti(copy(before), a, b, c))

      if (isEqual(seti(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(gtir(copy(before), a, b, c))

      if (isEqual(gtir(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(gtri(copy(before), a, b, c))

      if (isEqual(gtri(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(gtrr(copy(before), a, b, c))

      if (isEqual(gtrr(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(seti(copy(before), a, b, c))

      if (isEqual(eqir(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(eqri(copy(before), a, b, c))

      if (isEqual(eqri(copy(before), a, b, c), after)) {
        matches++
      }

      // console.log(seti(copy(before), a, b, c))

      if (isEqual(eqrr(copy(before), a, b, c), after)) {
        matches++
      }

      console.log(matches)
      if (matches >= 3) {
        totalMatches++
      }

      i += 3
      if (input[i + 1] === '') {
        i = input.length
      }
    }

    return totalMatches
    // 237 too low
    // 541 too low
  },
  b: input => {
    let totalMatches = 0
    let opCodeLogs = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: [],
      15: []
    }

    let lastLine = 0
    for (let i = 0; i < input.length; i++) {
      const before = input[i]
        .split(': [')[1]
        .replace(']', '')
        .split(', ')
        .map(val => parseInt(val))
      const instruction = input[i + 1].split(' ').map(val => parseInt(val))
      const after = input[i + 2]
        .split(':  [')[1]
        .replace(']', '')
        .split(', ')
        .map(val => parseInt(val))
      let matches = 0

      const opCodes = []

      // console.log(before, 'before')
      // console.log(instruction, 'instruction')
      // console.log(after, 'after')

      const a = instruction[1]
      const b = instruction[2]
      const c = instruction[3]

      // console.log(addr(copy(before), instruction))

      if (isEqual(addr(copy(before), a, b, c), after)) {
        opCodes.push(0)
      }

      // console.log(addi(copy(before), a, b, c))

      if (isEqual(addi(copy(before), a, b, c), after)) {
        opCodes.push(1)
      }

      // console.log(mulr(copy(before), a, b, c))

      if (isEqual(mulr(copy(before), a, b, c), after)) {
        opCodes.push(2)
      }

      // console.log(muli(copy(before), a, b, c))

      if (isEqual(muli(copy(before), a, b, c), after)) {
        opCodes.push(3)
      }

      // console.log(banr(copy(before), a, b, c))

      if (isEqual(banr(copy(before), a, b, c), after)) {
        opCodes.push(4)
      }

      // console.log(bani(copy(before), a, b, c))

      if (isEqual(bani(copy(before), a, b, c), after)) {
        opCodes.push(5)
      }

      // console.log(borr(copy(before), a, b, c))

      if (isEqual(borr(copy(before), a, b, c), after)) {
        opCodes.push(6)
      }

      // console.log(bori(copy(before), a, b, c))

      if (isEqual(bori(copy(before), a, b, c), after)) {
        opCodes.push(7)
      }

      // console.log(setr(copy(before), a, b, c))

      if (isEqual(setr(copy(before), a, b, c), after)) {
        opCodes.push(8)
      }

      // console.log(seti(copy(before), a, b, c))

      if (isEqual(seti(copy(before), a, b, c), after)) {
        opCodes.push(9)
      }

      // console.log(gtir(copy(before), a, b, c))

      if (isEqual(gtir(copy(before), a, b, c), after)) {
        opCodes.push(10)
      }

      // console.log(gtri(copy(before), a, b, c))

      if (isEqual(gtri(copy(before), a, b, c), after)) {
        opCodes.push(11)
      }

      // console.log(gtrr(copy(before), a, b, c))

      if (isEqual(gtrr(copy(before), a, b, c), after)) {
        opCodes.push(12)
      }

      // console.log(seti(copy(before), a, b, c))

      if (isEqual(eqir(copy(before), a, b, c), after)) {
        opCodes.push(13)
      }

      // console.log(eqri(copy(before), a, b, c))

      if (isEqual(eqri(copy(before), a, b, c), after)) {
        opCodes.push(14)
      }

      // console.log(seti(copy(before), a, b, c))

      if (isEqual(eqrr(copy(before), a, b, c), after)) {
        opCodes.push(15)
      }

      // console.log(instruction[0])
      opCodeLogs[instruction[0]].push(opCodes)

      i += 3
      if (input[i + 1] === '') {
        lastLine = i
        i = input.length
      }
    }

    // console.log(lastLine)
    // console.log(opCodeLogs)

    const codes = {}

    for (const key in opCodeLogs) {
      const logs = opCodeLogs[key]
      const intersected = intersection(...logs)
      codes[key] = intersected
    }

    // console.log(codes, 'starting')
    let done = false
    const found = []
    while (!done) {
      let moreThanOne = false

      for (const key in codes) {
        const value = codes[key]
        if (value.length === 1 && found.indexOf(value) === -1) {
          found.push(value[0])
        } else {
          moreThanOne = true
          // console.log(found)
          // console.log(key, difference(value, found))
          codes[key] = difference(value, found)
        }
      }

      if (moreThanOne === false) {
        done = true
      }
      // console.log(codes, counter)
      // console.log(found)
      // counter++
    }

    const callers = {}
    for (const key in codes) {
      callers[key] = funcMap[codes[key][0]]
    }

    // console.log(codes)

    let registers = [0, 0, 0, 0]

    for (let i = lastLine + 3; i < input.length; i++) {
      const instruction = input[i].split(' ').map(val => parseInt(val))
      const a = instruction[1]
      const b = instruction[2]
      const c = instruction[3]

      registers = callers[instruction[0]](registers, a, b, c)
      // console.log(registers)
      // console.log(instruction, 'i')
    }
    // console.log(input[lastLine + 3])
    // console.log(callers)

    return registers[0]
  }
}
