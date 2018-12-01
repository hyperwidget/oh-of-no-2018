import { readFileSync } from 'fs'

export const readFile = day => {
  const dir = process.cwd()
  console.log(dir)
  return readFileSync(`${dir}/inputFiles/${day}.txt`, {
    encoding: 'utf8'
  }).split('\n')
}

export default readFile
