import itertools
from pathlib import Path

p = Path('inputFile.txt')
fileLines = p.read_text().splitlines()

tests = {
    'a': [
        {'input': [
            'abcdef',
            'bababc',
            'abbcde',
            'abcccd',
            'aabcdd',
            'abcdee',
            'ababab'
        ],
            'expected': 12}
    ],
    'b': [
        {
            'input': ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'],
            'expected': 'fgij'
        }
    ]}


def part_a(input):
    double = 0
    triple = 0

    for id in input:
        tracked = {}
        doubleUsed = False
        tripleUsed = False
        splitVal = list(id)

        for val in splitVal:
            if val in tracked:
                tracked[val] = tracked[val] + 1
            else:
                tracked[val] = 1

        for key in tracked:
            if not doubleUsed and tracked[key] == 2:
                double = double + 1
                doubleUsed = True

            if not tripleUsed and tracked[key] == 3:
                triple = triple + 1
                tripleUsed = True

    return double * triple


def part_b(input):
    for val in input:
        for comparedAgainst in input:
            differences = [i for i in range(
                len(val)) if val[i] != comparedAgainst[i]]

            if len(differences) == 1:
                index = differences[0]

                return val[:index] + val[index+1:]


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

test('b')
process('b')
