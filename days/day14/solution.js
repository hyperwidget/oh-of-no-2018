import { takeRight } from 'lodash'

export default {
  a: input => {
    const recipes = [3, 7]
    const elves = [0, 1]
    const desiredRecipeCount = parseInt(input[0])

    while (recipes.length < desiredRecipeCount + 10) {
      for (let e = 0; e < elves.length; e++) {
        const targetRecipe = 1 + recipes[elves[e]] + elves[e]
        if (targetRecipe > recipes.length - 1) {
          elves[e] = targetRecipe % recipes.length
        } else {
          elves[e] = targetRecipe
        }
      }

      const recipeSum = elves.reduce((prev, curr) => prev + recipes[curr], 0)
      recipes.push(
        ...recipeSum
          .toString()
          .split('')
          .map(n => parseInt(n))
      )
    }

    return recipes.join('').substr(desiredRecipeCount, 10)
  },
  b: input => {
    const recipes = [3, 7]
    const elves = [0, 1]
    let done = false
    let joined = ''

    while (!done) {
      for (let e = 0; e < elves.length; e++) {
        const targetRecipe = 1 + recipes[elves[e]] + elves[e]
        if (targetRecipe > recipes.length - 1) {
          elves[e] = targetRecipe % recipes.length
        } else {
          elves[e] = targetRecipe
        }
      }

      const recipeSum = elves.reduce((prev, curr) => prev + recipes[curr], 0)
      recipes.push(
        ...recipeSum
          .toString()
          .split('')
          .map(n => parseInt(n))
      )

      joined = takeRight(recipes, input[0].length * 2).join('')
      if (joined.indexOf(input) > -1) {
        const allJoined = recipes.join('')
        done = allJoined.indexOf(input[0])
      }
    }

    return done
  }
}
