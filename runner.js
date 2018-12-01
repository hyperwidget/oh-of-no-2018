import * as solutions from './solutions'
import * as tests from './tests'
import { readFile } from './utils/readFile'

const day = process.argv[2]
const part = process.argv[3]
const command = process.argv[4]

console.log(`Running ${day} ${part} ${command}`)

if (command === 'test') {
  tests[day][part].forEach((test, index) => {
    let errMessage = ''
    const result = solutions[day][part].solution(test.input)
    const pass = result === test.expected
    if (!pass) {
      errMessage = `Expected: ${test.expected} Got: ${result}`
    }

    console.log(`Test ${index + 1}: ${pass ? 'Pass!' : 'Fail!'} ${errMessage}`)
  })
} else if (command === 'process') {
  const solution = solutions[day][part]
  const result = solution.solution(readFile(day))

  console.log(`Answer: ${result}`)
}
