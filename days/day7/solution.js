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
          targets: [],
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

      if (!steps[target]) {
        steps[target] = {
          targets: [],
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

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
    const workerCount = inputs.length === 7 ? 2 : 5
    const delay = inputs.length === 7 ? 0 : 60
    const targets = []
    const path = []
    const workers = []
    let totalTime = 0
    let startingPoints = null

    inputs.forEach(input => {
      const splitInput = input.split(' ')
      const name = splitInput[1]
      const target = splitInput[7]

      if (!steps[name]) {
        steps[name] = {
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

      if (!steps[target]) {
        steps[target] = {
          requires: [],
          processed: false,
          requirementsMet: false
        }
      }

      steps[target].requires.push(name)
      targets.push(target)
    })

    for (let i = 0; i < workerCount; i++) {
      workers.push({
        currentlyProcessing: null,
        availableAt: 0
      })
    }

    const keys = Object.keys(steps).sort()
    startingPoints = difference(Object.keys(steps), targets).sort()
    // steps[startingPoint].processed = true
    // path.push(startingPoint)
    startingPoints.forEach((point, index) => {
      workers[index].availableAt =
        delay + point.toLowerCase().charCodeAt(0) - 96
      workers[index].processing = point
    })

    // Loop through keys, update their `requirementsMet`
    keys.forEach(key => {
      steps[key].requirementsMet = processRequirementsMet(
        path,
        steps[key].requires
      )
    })

    while (path.length < keys.length) {
      let canBeProcessed = []

      workers.forEach(worker => {
        if (worker.availableAt === totalTime && worker.processing) {
          path.push(worker.processing)
          steps[worker.processing].processed = true
        }
      })

      keys.forEach(key => {
        steps[key].requirementsMet = processRequirementsMet(
          path,
          steps[key].requires
        )
      })

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const step = steps[key]
        if (!step.processed) {
          if (step.requirementsMet) {
            canBeProcessed.push(key)
          }
        }
      }

      let inProcess = []

      workers.forEach(worker => {
        if (worker.availableAt > totalTime && worker.processing) {
          inProcess.push(worker.processing)
        }
      })

      canBeProcessed = difference(canBeProcessed, inProcess).sort()

      // if worker is available then process
      if (canBeProcessed.length > 0) {
        workers.forEach(worker => {
          if (worker.availableAt <= totalTime && canBeProcessed.length > 0) {
            const key = canBeProcessed.shift()
            worker.processing = key
            worker.availableAt =
              totalTime + delay + key.toLowerCase().charCodeAt(0) - 96
          }
        })
      }

      totalTime++
    }

    return totalTime - 1
    // 1055 -- too high -- I only had 4 workers set up instead of 5. swear words
  }
}
