import { maxBy } from 'lodash'

const process = (input, multiplier = 1) => {
  const splitted = input[0].split(' ')
  const playerCount = parseInt(splitted[0])
  const lastMarbleValue = parseInt(splitted[6]) * multiplier
  const scores = {}

  let lastPlay = { id: '-', currentPosition: 0, marbles: [0] }
  let currentMarble = 1

  while (currentMarble < lastMarbleValue) {
    for (
      let i = 1;
      i < playerCount + 1 && currentMarble < lastMarbleValue + 1;
      i++
    ) {
      const lastLen = lastPlay.marbles.length
      let newMarbles = []
      let currentPosition = lastPlay.currentPosition
      if (lastLen === 0) currentMarble = lastMarbleValue + 1

      if (currentMarble % 23 !== 0) {
        currentPosition += 2
        if (currentPosition > lastLen) {
          currentPosition = currentPosition % lastLen
        }
        if (currentMarble === 1) {
          currentPosition = 1
        }

        newMarbles = [
          ...lastPlay.marbles.slice(0, currentPosition),
          currentMarble,
          ...lastPlay.marbles.slice(currentPosition)
        ]
      } else {
        if (!scores[i]) {
          scores[i] = 0
        }

        scores[i] += currentMarble

        currentPosition -= 7

        if (currentPosition < 0) {
          currentPosition = lastLen - Math.abs(currentPosition)
        }

        scores[i] += lastPlay.marbles[currentPosition]

        newMarbles = [
          ...lastPlay.marbles.slice(0, currentPosition),
          ...lastPlay.marbles.slice(currentPosition + 1)
        ]
      }
      lastPlay = {
        id: i,
        currentMarble,
        currentPosition,
        marbles: newMarbles
      }
      currentMarble++
    }
  }
  var maxKey = maxBy(Object.keys(scores), function(o) {
    return scores[o]
  })

  return scores[maxKey]
}

export default {
  a: input => process(input),
  b: input => process(input, 100)
}
