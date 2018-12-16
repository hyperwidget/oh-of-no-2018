export default {
  a: [
    {
      input: [`Before: [3, 2, 1, 1]`, `9 2 1 2`, `After:  [3, 2, 2, 1]`],
      expected: 1
    },
    {
      input: [`Before: [1, 2, 1, 1]`, `10 3 3 1`, `After:  [1, 0, 1, 1]`],
      expected: 1
    }
  ],
  b: [
    {
      input: [`Before: [3, 2, 1, 1]`, `9 2 1 2`, `After:  [3, 2, 2, 1]`],
      expected: 1
    },
    {
      input: [`Before: [1, 2, 1, 1]`, `10 3 3 1`, `After:  [1, 0, 1, 1]`],
      expected: 1
    }
  ]
}
