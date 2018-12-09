import { maxBy } from 'lodash'

const process = (input, multiplier = 1) => {
  const splitted = input[0].split(' ')
  const playerCount = parseInt(splitted[0])
  const lastMarbleValue = parseInt(splitted[6]) * multiplier
  const scores = {}

  let currentPlay = { value: 0 }
  currentPlay.previous = currentPlay
  currentPlay.next = currentPlay

  for (let i = 1; i < lastMarbleValue + 1; i++) {
    if (i % 23 !== 0) {
      const newPlay = {
        value: i,
        previous: currentPlay.next,
        next: currentPlay.next.next
      }
      currentPlay.next.next.previous = newPlay
      currentPlay.next.next = newPlay
      currentPlay = newPlay
    } else {
      const currentPlayer = i % playerCount
      if (!scores[currentPlayer]) scores[currentPlayer] = 0
      const replayce =
        currentPlay.previous.previous.previous.previous.previous.previous
          .previous

      scores[currentPlayer] += replayce.value + i

      replayce.previous.next = replayce.next
      replayce.next.previous = replayce.previous

      currentPlay = replayce.next
    }
  }

  console.log()
  return Object.values(scores)
    .sort()
    .reverse()[0]
}

export default {
  a: input => process(input),
  b: input => process(input, 100)
}
