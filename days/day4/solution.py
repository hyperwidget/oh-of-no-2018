import itertools
import operator

from pathlib import Path
from datetime import datetime, date, time, timedelta

p = Path('inputFile.txt')
fileLines = p.read_text().splitlines()

tests = {
    'a': [
        {
            'input': [
                '[1518-11-01 00:00] Guard #10 begins shift',
                '[1518-11-01 00:05] falls asleep',
                '[1518-11-01 00:25] wakes up',
                '[1518-11-01 00:30] falls asleep',
                '[1518-11-01 00:55] wakes up',
                '[1518-11-01 23:58] Guard #99 begins shift',
                '[1518-11-02 00:40] falls asleep',
                '[1518-11-02 00:50] wakes up',
                '[1518-11-03 00:05] Guard #10 begins shift',
                '[1518-11-03 00:24] falls asleep',
                '[1518-11-03 00:29] wakes up',
                '[1518-11-04 00:02] Guard #99 begins shift',
                '[1518-11-04 00:36] falls asleep',
                '[1518-11-04 00:46] wakes up',
                '[1518-11-05 00:03] Guard #99 begins shift',
                '[1518-11-05 00:45] falls asleep',
                '[1518-11-05 00:55] wakes up'
            ],
            'expected': 240
        }
    ],
    'b': [
        {
            'input': [
                '[1518-11-01 00:00] Guard #10 begins shift',
                '[1518-11-01 00:05] falls asleep',
                '[1518-11-01 00:25] wakes up',
                '[1518-11-01 00:30] falls asleep',
                '[1518-11-01 00:55] wakes up',
                '[1518-11-01 23:58] Guard #99 begins shift',
                '[1518-11-02 00:40] falls asleep',
                '[1518-11-02 00:50] wakes up',
                '[1518-11-03 00:05] Guard #10 begins shift',
                '[1518-11-03 00:24] falls asleep',
                '[1518-11-03 00:29] wakes up',
                '[1518-11-04 00:02] Guard #99 begins shift',
                '[1518-11-04 00:36] falls asleep',
                '[1518-11-04 00:46] wakes up',
                '[1518-11-05 00:03] Guard #99 begins shift',
                '[1518-11-05 00:45] falls asleep',
                '[1518-11-05 00:55] wakes up'
            ],
            'expected': 4455
        }
    ]}

dateFormat = '%Y-%m-%d %H:%M'


def getMostSleptMinute(logs):
    minutes = []

    for logId in logs:
        log = logs[logId]

        sleptMinutes = []
        for time in range(len(log)):
            value = log[time]
            if value != '.':
                sleptMinutes.append(time)

        minutes.append(sleptMinutes)

    flattened = sorted(list(item for sublist in minutes for item in sublist))

    counts = {}

    for g in itertools.groupby(flattened):
        counts[g[0]] = len(list(g[1]))

    if len(counts.keys()) > 0:
        maxVal = max(counts.items(), key=operator.itemgetter(1))[0]
    else:
        return {'count': 0, 'minute': 0}

    return {'count': counts[maxVal], 'minute': maxVal}


def sortInput(input):
    return datetime.strptime(input.split(']')[0].replace('[', ''), dateFormat)


def createGuard(id):
    return {
        'id': id,
        'logs': {},
        'totalAsleep': 0,
        'mostAsleepMinute': 0
    }


def part_a(inputs):

    sortedInputs = sorted(inputs, key=sortInput)

    guards = {}
    chosenGuard = None
    currentGuard = None
    lastMinute = 0

    # // Format input inot the way I chose to use it
    for input in sortedInputs:
        log = input.split(' ')
        dateVal = datetime.strptime(log[0].replace('[', ''), '%Y-%m-%d')
        time = log[1].replace(']', '').split(':')
        action = log[2]
        id = log[3].replace('#', '')

    #   // If the guard exists, we're dealing with sleeping or waking
        if not str.isdigit(id):
            # If the guard falls alseep, we just need to keep track of when he fell asleep
            if action == 'falls':
                lastMinute = time[1]
            else:
                # If the guard wakes up, we use the falls asleep time to update the logs with
                # his slept minutes as well as updates this guard's total Sleep time
                for index in range(int(lastMinute), int(time[1])):
                    currentGuard['logs'][dateVal.strftime(
                        "%Y-%m-%d")][index] = 'x'
                    currentGuard['totalAsleep'] = currentGuard['totalAsleep'] + 1

                lastMinute = time[1]

        else:
            #  If guard doesn't exist then set up new guard ++ logs
            if id not in guards:
                guards[id] = createGuard(id)

            currentGuard = guards[id]

            #  If the time's hour isn't midnight then set up the log for the following day
            #  because we really don't care when the guard starts, just what day his shift is for
            if time[0] != '00':
                dateVal = dateVal + timedelta(days=1)
                currentGuard['logs'][dateVal.strftime(
                    "%Y-%m-%d")] = ['.' for _ in range(60)]
            else:
                currentGuard['logs'][dateVal.strftime(
                    "%Y-%m-%d")] = ['.' for _ in range(60)]

            lastMinute = 0

            #  Get guard with most slept minutes
            for guardId in guards:
                guard = guards[guardId]
                if chosenGuard == None or guard['totalAsleep'] > chosenGuard['totalAsleep']:
                    chosenGuard = guard

    #  Get minute most slept on
    mostSleptMinute = getMostSleptMinute(chosenGuard['logs'])['minute']

    return int(chosenGuard['id']) * int(mostSleptMinute)


def part_b(inputs):

    sortedInputs = sorted(inputs, key=sortInput)

    guards = {}
    chosenGuard = None
    currentGuard = None
    lastMinute = 0

    # // Format input inot the way I chose to use it
    for input in sortedInputs:
        log = input.split(' ')
        dateVal = datetime.strptime(log[0].replace('[', ''), '%Y-%m-%d')
        time = log[1].replace(']', '').split(':')
        action = log[2]
        id = log[3].replace('#', '')

    #   // If the guard exists, we're dealing with sleeping or waking
        if not str.isdigit(id):
            # If the guard falls alseep, we just need to keep track of when he fell asleep
            if action == 'falls':
                lastMinute = time[1]
            else:
                # If the guard wakes up, we use the falls asleep time to update the logs with
                # his slept minutes as well as updates this guard's total Sleep time
                for index in range(int(lastMinute), int(time[1])):
                    currentGuard['logs'][dateVal.strftime(
                        "%Y-%m-%d")][index] = 'x'
                    currentGuard['totalAsleep'] = currentGuard['totalAsleep'] + 1

                lastMinute = time[1]

        else:
            #  If guard doesn't exist then set up new guard ++ logs
            if id not in guards:
                guards[id] = createGuard(id)

            currentGuard = guards[id]

            #  If the time's hour isn't midnight then set up the log for the following day
            #  because we really don't care when the guard starts, just what day his shift is for

            if time[0] != '00':
                dateVal = dateVal + timedelta(days=1)
                currentGuard['logs'][dateVal.strftime(
                    "%Y-%m-%d")] = ['.' for _ in range(60)]
            else:
                currentGuard['logs'][dateVal.strftime(
                    "%Y-%m-%d")] = ['.' for _ in range(60)]

            lastMinute = 0

    for key in guards:
        guard = guards[key]
        answer = getMostSleptMinute(guard['logs'])
        guard['mostSleptMinute'] = answer['minute']
        guard['mostSleptMinuteCount'] = answer['count']

#     Find guard with most slept minutes
    for key in guards:
        guard = guards[key]

        if chosenGuard == None or guard['mostSleptMinuteCount'] > chosenGuard['mostSleptMinuteCount']:
            chosenGuard = guard

    return int(chosenGuard['id']) * int(chosenGuard['mostSleptMinute'])


solutions = {
    'a': part_a,
    'b': part_b
}


def test(part):
    for index in range(len(tests[part])):
        test = tests[part][index]
        result = solutions[part](test['input'])
        if result == test['expected']:
            print(f"Pass {index + 1}.")
        else:
            print(
                f"Fail {index + 1}: Expected {test['expected']}  got {result}")


def process(part):
    print(solutions[part](fileLines))


test('a')
process('a')

test('b')
process('b')
