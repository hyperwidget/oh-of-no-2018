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
        },
        {
            'input': [
                'abcde',
                'fghijasdfac',
                'klmno',
                'pqrst',
                'fghijusdfac',
                'axcye',
                'wvxyz'
            ],
            'expected': 'fghijsdfac'
        }
    ]}


def part_a(input):
    return input


def part_b(input):
    return input


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
# process('b')
