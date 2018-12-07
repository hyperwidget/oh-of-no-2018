import itertools
from pathlib import Path

p = Path('inputFile.txt')
fileLines = p.read_text().splitlines()

tests = {
    'a': [
        {'input': ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4',
                   '#3 @ 5,5: 2x2'], 'expected': 4}

    ],
    'b': [
        {'input': ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4',
                   '#3 @ 5,5: 2x2'], 'expected': '#3'}
    ]}


def part_a(inputs):
    if len(inputs) == 3:
        rangeSize = 10
    else:
        rangeSize = 1000

    count = 0

    grid = [['.'] * rangeSize for _ in range(rangeSize)]

    for input in inputs:
        instruction = input.split(' ')
        coords = instruction[2].replace(':', '').split(',')
        size = instruction[3].split('x')

        for row in range(int(size[0])):
            for col in range(int(size[1])):
                rowVal = int(coords[0]) + row
                colVal = int(coords[1]) + col
                gridValue = grid[rowVal][colVal]

                if gridValue == '.':
                    grid[rowVal][colVal] = 1
                elif gridValue == 1:
                    grid[rowVal][colVal] = 'x'
                    count = count + 1

    return count


def part_b(inputs):
    if len(inputs) == 3:
        rangeSize = 10
    else:
        rangeSize = 1000

    count = 0

    grid = [['.'] * rangeSize for _ in range(rangeSize)]

    for input in inputs:
        instruction = input.split(' ')
        coords = instruction[2].replace(':', '').split(',')
        size = instruction[3].split('x')

        for row in range(int(size[0])):
            for col in range(int(size[1])):
                rowVal = int(coords[0]) + row
                colVal = int(coords[1]) + col
                gridValue = grid[rowVal][colVal]

                if gridValue == '.':
                    grid[rowVal][colVal] = 1
                elif gridValue == 1:
                    grid[rowVal][colVal] = 'x'
                    count = count + 1

    for index in range(len(inputs), 0, -1):
        input = inputs[index - 1]
        instruction = input.split(' ')
        coords = instruction[2].replace(':', '').split(',')
        size = instruction[3].split('x')
        overlapSize = 0

        for row in range(int(size[0])):
            for col in range(int(size[1])):
                rowVal = int(coords[0]) + row
                colVal = int(coords[1]) + col
                gridValue = grid[rowVal][colVal]

                if gridValue == 'x':
                    overlapSize = overlapSize + 1

        if overlapSize == 0:
            return instruction[0]

    return count


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
