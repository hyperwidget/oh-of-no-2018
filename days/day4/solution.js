import moment, { min } from 'moment'
import { flatten, countBy, maxBy } from 'lodash'

// Just a default guard object witht the structure I want
const createGuard = id => {
  return {
    id,
    logs: {},
    totalAsleep: 0,
    mostAsleepMinute: 0
  }
}

// A fresh array with no minutes slept in
const createFreshLog = () => {
  return new Array(60).fill('.')
}

// Loops through the logs provided, compares them and finds the minute
// that occurs in the logs the most, returns a count and the minute itself
const getMostSleptMinute = logs => {
  let minutes = []

  for (const key in logs) {
    if (logs.hasOwnProperty(key)) {
      const log = logs[key]
      let sleptMinutes = []
      for (let i = 0; i < log.length; i++) {
        const time = log[i]

        if (time !== '.') {
          sleptMinutes.push(i)
        } else {
        }
      }
      minutes.push(sleptMinutes)
    }
  }

  const count = countBy(flatten(minutes))

  const max = maxBy(Object.keys(count), o => count[o])

  return { count: count[max], minute: max }
}

const dateFormat = 'YYYY-MM-DD'

const getDate = input => moment.utc(input).format(dateFormat)

export default {
  a: inputs => {
    // SORT INPUT
    inputs.sort((a, b) => {
      const alog = a.split(']')
      const aVal = new Date(alog[0].replace('[', ''))
      const blog = b.split(']')
      const bVal = new Date(blog[0].replace('[', ''))

      if (aVal < bVal) {
        return -1
      }
      if (aVal > bVal) {
        return 1
      }
      return 0
    })

    const guards = {}
    let chosenGuard = null
    let currentGuard = null
    let lastMinute = 0

    // Format input inot the way I chose to use it
    inputs.forEach(input => {
      const log = input.split(' ')
      const dateVal = new Date(log[0].replace('[', ''))
      const time = log[1].replace(']', '').split(':')
      const action = log[2]
      const id = log[3].replace('#', '')

      // If the guard exists, we're dealing with sleeping or waking
      if (Number.isNaN(parseInt(id))) {
        const logId = getDate(dateVal)

        // If the guard falls alseep, we just need to keep track of when he fell asleep
        if (action === 'falls') {
          lastMinute = time[1]
        } else {
          // If the guard wakes up, we use the falls asleep time to update the logs with
          // his slept minutes as well as updates this guard's total Sleep time
          for (let i = lastMinute; i < time[1]; i++) {
            currentGuard.logs[logId][i] = 'x'
            currentGuard.totalAsleep++
          }
          lastMinute = time[1]
        }
      } else {
        // If guard doesn't exist then set up new guard ++ logs
        if (!guards[id]) {
          guards[id] = createGuard(id)
        }

        currentGuard = guards[id]

        // If the time's hour isn't midnight then set up the log for the following day
        // because we really don't care when the guard starts, just what day his shift is for

        if (time[0] !== '00') {
          dateVal.setDate(dateVal.getDate() + 1)
          currentGuard.logs[getDate(dateVal)] = createFreshLog()
        } else {
          currentGuard.logs[getDate(dateVal)] = createFreshLog()
        }
        lastMinute = 0
      }
    })

    // Get guard with most slept minutes
    for (const key in guards) {
      const guard = guards[key]

      if (!chosenGuard || guard.totalAsleep > chosenGuard.totalAsleep) {
        chosenGuard = guard
      }
    }

    // Get minute most slept on
    const mostSleptMinute = getMostSleptMinute(chosenGuard.logs).minute

    return chosenGuard.id * mostSleptMinute
  },
  b: inputs => {
    // The same as part
    inputs.sort((a, b) => {
      const alog = a.split(']')
      const aVal = new Date(alog[0].replace('[', ''))
      const blog = b.split(']')
      const bVal = new Date(blog[0].replace('[', ''))

      if (aVal < bVal) {
        return -1
      }
      if (aVal > bVal) {
        return 1
      }
      return 0
    })

    const guards = {}
    let chosenGuard = null
    let currentGuard = null
    let lastMinute = 0

    inputs.forEach(input => {
      const log = input.split(' ')
      const dateVal = new Date(log[0].replace('[', ''))
      const time = log[1].replace(']', '').split(':')
      const action = log[2]
      const id = log[3].replace('#', '')

      if (Number.isNaN(parseInt(id))) {
        const logId = getDate(dateVal)
        if (action === 'falls') {
          lastMinute = time[1]
        } else {
          // Track total Sleep time
          for (let i = lastMinute; i < time[1]; i++) {
            currentGuard.logs[logId][i] = 'x'
            currentGuard.totalAsleep++
          }
          lastMinute = time[1]
        }
      } else {
        // Set up log
        if (!guards[id]) {
          guards[id] = createGuard(id)
        }

        currentGuard = guards[id]

        if (time[0] !== '00') {
          dateVal.setDate(dateVal.getDate() + 1)
          currentGuard.logs[getDate(dateVal)] = createFreshLog()
        } else {
          currentGuard.logs[getDate(dateVal)] = createFreshLog()
        }
        lastMinute = 0
      }
    })

    // Loop through guards and figure out most slept minute and count for each
    for (const key in guards) {
      const guard = guards[key]
      const answer = getMostSleptMinute(guard.logs)
      guard.mostSleptMinute = answer.minute
      guard.mostSleptMinuteCount = answer.count
    }

    // Find guard with most slept minutes
    for (const key in guards) {
      const guard = guards[key]

      if (
        !chosenGuard ||
        guard.mostSleptMinuteCount > chosenGuard.mostSleptMinuteCount
      ) {
        if (guard.mostSleptMinuteCount) {
          chosenGuard = guard
        }
      }
    }

    return chosenGuard.id * chosenGuard.mostSleptMinute
  }
}
