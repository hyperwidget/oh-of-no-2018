export default {
  a: [
    {
      input: [
        'abcdef',
        'bababc',
        'abbcde',
        'abcccd',
        'aabcdd',
        'abcdee',
        'ababab'
      ],
      expected: 12
    }
  ],
  b: [
    {
      input: ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'],
      expected: 'fgij'
    },
    {
      input: [
        'abcde',
        'fghijasdfac',
        'klmno',
        'pqrst',
        'fghijusdfac',
        'axcye',
        'wvxyz'
      ],
      expected: 'fghijsdfac'
    }
  ]
}
