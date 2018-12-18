export default {
  a: input => {
    const grid = []
    let highestX = 0
    let highestY = 0

    console.log(input, 'val')

    input.forEach(instruction => {
      const splitVal = instruction.split(' ')

      const part1 = instruction[0].split('=')
      const part2 = instruction[1].split('=')
      const part2Spread = part2[1].split('..')

      if (part1[0] === 'x') {
        if (part1[0] > highestX) {
          highestX = part1[0]
        }
      }
      if (part1[0] === 'y') {
        if (part1[0] > highestY) {
          highestY = part1[0]
        }
      }

      if (part2[0] === 'x') {
        if (part2Spread[part2Spread.length - 1] > highestX) {
          highestX = part2Spread[part2Spread.length - 1]
        }
      }
      if (part2[0] === 'y') {
        if (part2Spread[part2Spread.length - 1] > highestY) {
          highestY = part2Spread[part2Spread.length - 1]
        }
      }
    })

    console.log(highestX)
    console.log(highestY)

    return input
  },
  b: input => {
    return input
  }
}
