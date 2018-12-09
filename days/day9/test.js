export default {
  a: [
    { input: [`9 players; last marble is worth 25 points`], expected: 32 },

    { input: [`10 players; last marble is worth 1618 points`], expected: 8317 },
    {
      input: [`13 players; last marble is worth 7999 points`],
      expected: 146373
    },
    { input: [`17 players; last marble is worth 1104 points`], expected: 2764 },
    {
      input: [`21 players; last marble is worth 6111 points`],
      expected: 54718
    },
    { input: [`30 players; last marble is worth 5807 points`], expected: 37305 }
  ],
  b: [
    { input: 1, expected: 1 },
    { input: 1, expected: 1 },
    { input: 1, expected: 1 },
    { input: 1, expected: 1 }
  ]
}
