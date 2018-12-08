import itertools
from pathlib import Path

p = Path('inputFile.txt')
fileLines = p.read_text().splitlines()

tests = {
    'a': [
        {'input': ['1, 1', '1, 6', '8, 3', '3, 4',
                   '5, 5', '8, 9'], 'expected': 17}
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


def makeInput(input):
    splitted = input.split(',')
    val = [int(splitted[0]), int(splitted[1])]
    return val


def part_a(inputs):
    formattedInputs = list(map(makeInput, inputs))
    print(formattedInputs)
    # const formattedInput = inputs.map(input=> {
    #     const vals=input.split(',')
    #     return [parseInt(vals[0]), parseInt(vals[1])]
    # })

    # // find max size of grid to fill it
    # let maxSize = max(flattenDeep(formattedInput)) + 1

    # // create grid
    # const grid = Array(maxSize)
    # for (let i=0
    #      i < grid.length
    #      i++) {
    #     grid[i] = Array(maxSize)
    # }

    # // add inputs to grid
    # for (let i=0
    #      i < formattedInput.length
    #      i++) {
    #     const input = formattedInput[i]
    #     grid[input[1]][input[0]] = i + 1 + '*'
    # }

    # // loop through each grid slot
    # for (let row=0
    #      row < maxSize
    #      row++) {
    #     for (let col=0
    #          col < maxSize
    #          col++) {
    #         // If this isn't an input slot, don't track
    #         if (!grid[row][col]) {
    #             // track closest in grid slot
    #             let closest = maxSize
    #             let closestInput = -1
    #             // loop through each input and determine closest manhattan distance

    #             for (let i=0
    #                  i < formattedInput.length
    #                  i++) {
    #                 const man = calcMan(
    #                     row,
    #                     formattedInput[i][1],
    #                     col,
    #                     formattedInput[i][0]
    #                 )
    #                 if (man < closest) {
    #                     closest = man
    #                     closestInput = i + 1
    #                 }

    #                 // if same closeness to multiple - then `.`s
    #                 else if (man == = closest) {
    #                     closestInput = '.'
    #                 }
    #             }
    #             grid[row][col] = closestInput
    #         }
    #     }
    # }

    # // count all occurances of a number in grid
    # const valueCounts = countBy(flattenDeep(grid))

    # // get values on outside of grid(they'll be infinite)
    # const outerVals = []
    # for (let col=0
    #      col < maxSize
    #      col++) {
    #     outerVals.push(grid[0][col])
    # }
    # for (let col=0
    #      col < maxSize
    #      col++) {
    #     outerVals.push(grid[maxSize - 1][col])
    # }
    # for (let row=0
    #      row < maxSize
    #      row++) {
    #     outerVals.push(grid[row][0])
    # }
    # for (let row=0
    #      row < maxSize
    #      row++) {
    #     outerVals.push(grid[row][maxSize - 1])
    # }

    # const cleanOuterVals = uniq(outerVals)
    # const cleanOuterValsObject = {}

    # for (let i=0
    #      i < cleanOuterVals.length
    #      i++) {
    #     cleanOuterValsObject[cleanOuterVals[i]] = 0
    # }

    # const cleanedVals = {}
    # // console.log(valueCounts)

    # // remove outerVals from value counts
    # for (const key in valueCounts) {
    #     if (valueCounts.hasOwnProperty(key)) {
    #         const element = valueCounts[key]
    #         if (cleanOuterValsObject[key] === undefined) {
    #             cleanedVals[key] = element
    #         }
    #     }
    # }

    # const maxVal = maxBy(Object.keys(cleanedVals), o=> cleanedVals[o])

    # return cleanedVals[maxVal] + 1
    return 0


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


test('a')
# process('a')

# test('b')
# process('b')
