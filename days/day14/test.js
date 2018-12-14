export default {
  a: [
    { input: [`5`], expected: '0124515891' },
    { input: [`9`], expected: '5158916779' },
    { input: [`18`], expected: '9251071085' },
    { input: ['2018'], expected: '5941429882' }
  ],
  b: [
    { input: [`01245`], expected: 5 },
    { input: [`51589`], expected: 9 },
    { input: [`92510`], expected: 18 },
    { input: ['59414'], expected: 2018 }
  ]
}
