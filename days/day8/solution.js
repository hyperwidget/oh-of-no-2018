const processNode = (inputs, cursor, total) => {
  const childrenCount = inputs[cursor]
  const metaCount = inputs[cursor + 1]
  let newCursor = cursor + 2
  let newTotal = total

  for (let i = 0; i < childrenCount; i++) {
    const response = processNode(inputs, newCursor, total)
    newTotal += response.total
    newCursor = response.cursor
  }

  for (let i = 0; i < metaCount; i++) {
    console.log(inputs[newCursor], 'adding to sum')
    newTotal += parseInt(inputs[newCursor])
    newCursor++
  }

  return { total: newTotal, cursor: newCursor }
}

const processNode2 = (inputs, cursor, total) => {
  const childrenCount = inputs[cursor]
  const metaCount = inputs[cursor + 1]
  let newCursor = cursor + 2
  let newTotal = total

  for (let i = 0; i < childrenCount; i++) {
    const response = processNode(inputs, newCursor, total)
    newTotal += response.total
    newCursor = response.cursor
  }

  for (let i = 0; i < metaCount; i++) {
    console.log(inputs[newCursor], 'adding to sum')
    newTotal += parseInt(inputs[newCursor])
    newCursor++
  }

  return { total: newTotal, cursor: newCursor }
}

export default {
  a: input => {
    const inputs = input[0].split(' ')

    const metaDataTotal = processNode(inputs, 0, 0)

    return metaDataTotal.total
  },
  b: input => {
    const inputs = input[0].split(' ')

    const metaDataTotal = processNode(inputs, 0, 0)

    return metaDataTotal.total
  }
}
