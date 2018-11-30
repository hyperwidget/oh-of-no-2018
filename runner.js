import * as solutions from './solutions'
import * as tests from './tests'

const day = process.argv[2]
const part = process.argv[3]
const command = process.argv[4]

console.log(day)
console.log(part)
console.log(command)

console.log(solutions[day][part].input)

if (command === 'test') {
  tests[day][part].forEach((test, index) => {
    let errMessage = ''
    const result = solutions[day][part].solution(test.input)
    const pass = result === test.expected
    if (!pass) {
      errMessage = `Expected: ${test.expected} Got: ${result}`
    }

    console.log(`Test ${index}: ${pass ? 'Pass!' : 'Fail!'} ${errMessage}`)
  })
} else if (command === 'process') {
  const solution = solutions[day][part]
  const result = solution.solution(solution.input)

  console.log(`Answer: ${result}`)
}
