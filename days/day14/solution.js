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
    return input
  }
}
