import itertools
from pathlib import Path

p = Path('inputFile.txt')
fileLines = p.read_text().splitlines()

tests = {
    'a': [
        {'input': ['+1', '-2', '+3', '+1'], 'expected': 3},
        {'input': ['+1', '+1', '-2'], 'expected': 0},
        {'input': ['-1', '-2', '-3'], 'expected': -6}
    ],
    'b': [
        {'input': ['+1', '-1'], 'expected': 0},
        {'input': ['+3', '+3', '+4', '-2', '-4'], 'expected': 10},
        {'input': ['-6', '+3', '+8', '+5', '-6'], 'expected': 5},
        {'input': ['+7', '+7', '-2', '-7', '-4'], 'expected': 14}
    ]}


def part_a(input):
    return list(itertools.accumulate(input, lambda x, y: int(x) + int(y)))[-1]


def part_b(input):
    frequencies = set({0})

    notFound = True
    currentFrequency = 0
    c = itertools.cycle(input)
    while notFound:
        for change in input:
            if notFound:
                currentFrequency += int(change)
                if currentFrequency in frequencies:
                    notFound = False
                else:
                    frequencies.add(currentFrequency)

    return currentFrequency


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


# test('a')
# process('a')

# test('b')
process('b')
