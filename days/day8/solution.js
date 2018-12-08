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
    newTotal += parseInt(inputs[newCursor])
    newCursor++
  }

  return { total: newTotal, cursor: newCursor }
}

const processNode2 = (inputs, cursor, total, index) => {
  const childrenCount = inputs[cursor]
  const metaCount = inputs[cursor + 1]
  const children = []
  let newCursor = cursor + 2
  let nodeTotal = 0

  for (let i = 0; i < childrenCount; i++) {
    const response = processNode2(inputs, newCursor, total, index + 1)
    newCursor = response.cursor
    children.push(response)
  }

  if (parseInt(childrenCount) === 0) {
    for (let i = 0; i < metaCount; i++) {
      nodeTotal += parseInt(inputs[newCursor])
      newCursor++
    }

    return { total: nodeTotal, cursor: newCursor, children: [] }
  } else {
    for (let i = 0; i < metaCount; i++) {
      const metaIdx = parseInt(inputs[newCursor]) - 1
      if (metaIdx + 1 <= children.length) {
        nodeTotal += children[metaIdx].total
      }
      newCursor++
    }
  }

  return { total: nodeTotal, cursor: newCursor, children }
}

export default {
  a: input => {
    const inputs = input[0].split(' ')

    const metaDataTotal = processNode(inputs, 0, 0, 1)

    return metaDataTotal.total
  },
  b: input => {
    const inputs = input[0].split(' ')

    const metaDataTotal = processNode2(inputs, 0, 0)

    return metaDataTotal.total
    // 318 too low
    // 0 - wrong 🙃
    // Fumbled around, discovered that I was misunderstanding
    // and was nuking the total of a node if any of it's children were empty
  }
}
