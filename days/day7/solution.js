import { difference } from 'lodash'

const processRequirementsMet = (stepsTaken, requirements) => {
  return difference(requirements, stepsTaken).length === 0
}

export default {
  a: inputs => {
    const steps = {}
    const targets = []
    const path = []
    let startingPoint = null

    inputs.forEach(input => {
      const splitInput = input.split(' ')
      const name = splitInput[1]
      const target = splitInput[7]

      if (!steps[name]) {
        steps[name] = {
          name,
          targets: [],
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

      if (!steps[target]) {
        steps[target] = {
          name,
          targets: [],
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

      steps[name].targets.push(target)
      steps[target].requires.push(name)
      targets.push(target)
    })

    const keys = Object.keys(steps).sort()
    startingPoint = difference(Object.keys(steps), targets).sort()[0]
    steps[startingPoint].processed = true
    path.push(startingPoint)

    // Loop through keys, update their `requirementsMet`
    keys.forEach(key => {
      steps[key].requirementsMet = processRequirementsMet(
        path,
        steps[key].requires
      )
    })

    while (path.length < keys.length) {
      let firstProcessed = false
      for (let i = 0; i < keys.length && !firstProcessed; i++) {
        const key = keys[i]
        const step = steps[key]
        if (!step.processed) {
          // console.log('checking ' + key)
          if (step.requirementsMet) {
            path.push(key)
            steps[key].processed = true
            firstProcessed = true
          }
        }
      }

      keys.forEach(key => {
        steps[key].requirementsMet = processRequirementsMet(
          path,
          steps[key].requires
        )
      })
    }

    return path.join('')
    // Had an issue previously where I had the wrong starting point
    // SEFDGJLPKNRYOAMQIUHTCVWZXB
  },
  b: inputs => {
    const steps = {}
    const workerCount = inputs.length === 7 ? 2 : 4
    const delay = inputs.length === 7 ? 1 : 60
    const targets = []
    const path = []
    const workers = []
    let startingPoint = null

    inputs.forEach(input => {
      const splitInput = input.split(' ')
      const name = splitInput[1]
      const target = splitInput[7]

      if (!steps[name]) {
        steps[name] = {
          name,
          targets: [],
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

      if (!steps[target]) {
        steps[target] = {
          name,
          targets: [],
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

      steps[name].targets.push(target)
      steps[target].requires.push(name)
      targets.push(target)
    })

    for (let i = 0; i < workerCount; i++) {
      workers.push({ available: true, currentlyProcessing: null, timeLeft: 0 })
    }

    const keys = Object.keys(steps).sort()
    startingPoint = difference(Object.keys(steps), targets).sort()[0]
    steps[startingPoint].processed = true
    path.push(startingPoint)

    // Loop through keys, update their `requirementsMet`
    keys.forEach(key => {
      steps[key].requirementsMet = processRequirementsMet(
        path,
        steps[key].requires
      )
    })

    while (path.length < keys.length) {
      let firstProcessed = false
      for (let i = 0; i < keys.length && !firstProcessed; i++) {
        const key = keys[i]
        const step = steps[key]
        if (!step.processed) {
          // console.log('checking ' + key)
          if (step.requirementsMet) {
            path.push(key)
            steps[key].processed = true
            firstProcessed = true
          }
        }
      }

      keys.forEach(key => {
        steps[key].requirementsMet = processRequirementsMet(
          path,
          steps[key].requires
        )
      })
    }

    return path.join('')
    // Had an issue previously where I had the wrong starting point
    // SEFDGJLPKNRYOAMQIUHTCVWZXB
  }
}
