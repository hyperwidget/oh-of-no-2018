const processNode = (inputs, cursor, total) => {
  // Get child and meta count, increase cursor position by 2
  const childrenCount = inputs[cursor]
  const metaCount = inputs[cursor + 1]
  let newCursor = cursor + 2
  let nodeTotal = 0

  // process children by calling this same function
  // getting back a new cursor position from where it's done processing
  // and that node's total
  for (let i = 0; i < childrenCount; i++) {
    const response = processNode(inputs, newCursor, total)
    nodeTotal += response.total
    newCursor = response.cursor
  }

  // get the meta values for this node
  for (let i = 0; i < metaCount; i++) {
    nodeTotal += parseInt(inputs[newCursor])
    newCursor++
  }

  return { total: nodeTotal + total, cursor: newCursor }
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

  // If this node has no children, then proces node as in parta
  if (parseInt(childrenCount) === 0) {
    for (let i = 0; i < metaCount; i++) {
      nodeTotal += parseInt(inputs[newCursor])
      newCursor++
    }

    return { total: nodeTotal, cursor: newCursor, children: [] }
  } else {
    // Other wise get values of meta data by node's children's indexes
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

    // RECURSE!
    const metaDataTotal = processNode(inputs, 0, 0, 1)

    return metaDataTotal.total
  },
  b: input => {
    const inputs = input[0].split(' ')

    // RECURSE!
    const metaDataTotal = processNode2(inputs, 0, 0)

    return metaDataTotal.total
    // 318 too low
    // 0 - wrong 🙃
    // Fumbled around, discovered that I was misunderstanding
    // and was nuking the total of a node if any of it's children were empty
  }
}
