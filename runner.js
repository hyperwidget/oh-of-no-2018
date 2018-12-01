// import * as solutions from './solutions'
// import * as tests from './tests'
import { readFile } from './utils/readFile'
import * as days from './days'

const day = process.argv[2]
const part = process.argv[3]
const command = process.argv[4]
const dayCode = days[day]

console.log(`Running ${day} ${part} ${command}`)

if (command === 'test') {
  dayCode.tests[part].forEach((test, index) => {
    let errMessage = ''
    const result = dayCode.solutions[part](test.input)
    const expected = test.expected
    const pass = result === expected
    if (!pass) {
      errMessage = `Expected: ${expected} Got: ${result}`
    }

    console.log(`Test ${index + 1}: ${pass ? 'Pass!' : 'Fail!'} ${errMessage}`)
  })
} else if (command === 'process') {
  const solution = dayCode.solutions[part]
  const result = solution(readFile(day))

  console.log(`Answer: ${result}`)
}
