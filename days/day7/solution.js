import { difference } from 'lodash'

const processRequirementsMet = (stepsTaken, requirements) => {
  return difference(requirements, stepsTaken).length === 0
}

export default {
  a: inputs => {
    const steps = {}

    // steps that are pointed to by another
    const targets = []

    // holder of completed objects in order
    const path = []
    let startingPoint = null

    // For each instruction add an item to a steps object
    // each step tracks the requisite pre-steps
    // whether it can be processed
    // and whether it has already been processed
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

    // Find the starting point by finding steps that aren't pointed to
    // by comparing the step ids with starting point and getting the first alphabetically
    // (in the event there's more than one)
    const keys = Object.keys(steps).sort()
    startingPoint = difference(Object.keys(steps), targets).sort()[0]

    // Add the starting point to the path and mark it as processed
    steps[startingPoint].processed = true
    path.push(startingPoint)

    // Loop through keys, update their `requirementsMet`
    keys.forEach(key => {
      steps[key].requirementsMet = processRequirementsMet(
        path,
        steps[key].requires
      )
    })

    // While there's still work to do, keep workin
    while (path.length < keys.length) {
      // Since we only process one step at a time, and processing that step can change
      // what step should be processed next; break if we've processed one
      let firstProcessed = false
      for (let i = 0; i < keys.length && !firstProcessed; i++) {
        const key = keys[i]
        const step = steps[key]

        if (!step.processed) {
          if (step.requirementsMet) {
            path.push(key)
            steps[key].processed = true
            firstProcessed = true
          }
        }
      }

      // After processing a step, check each step to see if it's requirements are now met
      keys.forEach(key => {
        steps[key].requirementsMet = processRequirementsMet(
          path,
          steps[key].requires
        )
      })
    }

    return path.join('')
    // SEFDGJLPKNRYOAMQIUHTCVWZXB - Wrong
    // Had an issue previously where I had the wrong starting point (because I didn't take into account multiple starting points; fixed by sorting)
  },
  b: inputs => {
    const steps = {}

    // Variable const values depending on if testing or processing
    const workerCount = inputs.length === 7 ? 2 : 5
    const delay = inputs.length === 7 ? 0 : 60
    const targets = []
    const path = []
    const workers = []

    // Track total elapsed time
    let totalTime = 0
    let startingPoints = null

    // Set up steps same as before
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

    // Set up workers
    for (let i = 0; i < workerCount; i++) {
      workers.push({
        currentlyProcessing: null,
        availableAt: 0
      })
    }

    // Get starting points
    const keys = Object.keys(steps).sort()
    startingPoints = difference(Object.keys(steps), targets).sort()

    // Since we can have multiple starting points at once, start as many as you can
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

    // Workworkworkworkwork🎵
    while (path.length < keys.length) {
      // This is _basically_ a ticking clock at this point, where every loop is a new second
      let canBeProcessed = []

      // If a step is done processing then add it to the path and mark as processed
      workers.forEach(worker => {
        if (worker.availableAt === totalTime && worker.processing) {
          path.push(worker.processing)
          steps[worker.processing].processed = true
        }
      })

      // Now that workers have maybe finished; check if requirements are met
      keys.forEach(key => {
        steps[key].requirementsMet = processRequirementsMet(
          path,
          steps[key].requires
        )
      })

      // Find available steps by checking remaining steps' prereqs
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

      // since the 'can be processed list' might also contain stuff already in process
      // find the stuff that's already in process and remove it from that list
      workers.forEach(worker => {
        if (worker.availableAt > totalTime && worker.processing) {
          inProcess.push(worker.processing)
        }
      })

      canBeProcessed = difference(canBeProcessed, inProcess).sort()

      // if worker is available then start working on process
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

      // Time keeps slippin
      totalTime++
    }

    return totalTime - 1
    // 1055 -- too high -- I only had 4 workers set up instead of 5. swear words

    // Thought about skipping to the next time that was > current time instead of ticking every second. didn't just cuz
  }
}
