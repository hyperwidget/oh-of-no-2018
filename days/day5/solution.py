import itertools
from pathlib import Path

p = Path('inputFile.txt')
fileLines = p.read_text().splitlines()

tests = {
    'a': [
        {'input': ['dabAcCaCBAcCcaDA'], 'expected': 10},
        {'input': ['dDbAcCaCBAcCcaDA'], 'expected': 8},
        {'input': ['DDbAcCaCBAcCcaDA'], 'expected': 10}
    ],
    'b': [
        {'input': ['dabAcCaCBAcCcaDA'], 'expected': 4},
    ]}


def removeReactions(input):
    matchStart = False
#   // Loop through input from the start, if the next letter is the same letter
#   // but opposite case then return the input minus those two indexes

    for index, letter in enumerate(input):
        if index + 1 < len(input):
            nextLetter = input[index + 1]
            matchStart = None

            if letter.islower() and nextLetter == letter.upper() or letter.isupper() and nextLetter == letter.lower():
                matchStart = index
                break

    if matchStart is not None:
        return input[:matchStart] + input[matchStart + 2:]
    else:
        return input


def part_a(inputs):
    input = inputs[0]

    done = False

    # keep removing reactions until there are no more
    while not done:
        startCount = len(input)

        input = removeReactions(input)

        #  No changes - ur done
        if startCount == len(input):
            return len(input)


def part_b(inputs):
    input = inputs[0]

    lowest = None
    # // For every letter in the alphabet, remove each case from the original string
    # // Process as above for each, tracking the lowest amount of letters left
    for i in range(1, 27):
        done = False
        letter = chr(i+96)

        removed = input.replace(letter, '').replace(letter.upper(), '')

        while not done:
            startCount = len(removed)

            removed = removeReactions(removed)

            # // No changes - ur done
            if startCount == len(removed):
                done = True

        if not lowest or len(removed) < lowest:
            lowest = len(removed)

    return lowest


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
