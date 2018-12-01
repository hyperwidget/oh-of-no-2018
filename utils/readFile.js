import { readFileSync } from 'fs'

export const readFile = day => {
  const dir = process.cwd()
  console.log(dir)
  return readFileSync(`${dir}/days/${day}/inputFile.txt`, {
    encoding: 'utf8'
  }).split('\n')
}

export default readFile
