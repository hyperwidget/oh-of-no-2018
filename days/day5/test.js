export default {
  a: [
    { input: [`dabAcCaCBAcCcaDA`], expected: 10 },
    { input: [`dDbAcCaCBAcCcaDA`], expected: 8 },
    { input: [`DDbAcCaCBAcCcaDA`], expected: 10 }
  ],
  b: [
    { input: [`dabAcCaCBAcCcaDA`], expected: 4 },
    { input: [`dDbAcCaCBAcCcaDA`], expected: 8 },
    { input: [`DDbAcCaCBAcCcaDA`], expected: 10 }
  ]
}
