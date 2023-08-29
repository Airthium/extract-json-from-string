// Block
const blocks = {
  '[': ']',
  '{': '}'
}

/**
 * Jsonify
 * @param stringWithJSON String with JSON
 * @returns JSON
 */
const jsonify = (stringWithJSON: string): JSON => {
  try {
    return JSON.parse(stringWithJSON)
  } catch (_err) {
    stringWithJSON = stringWithJSON
      .replace(/([a-zA-Z0-9_$]+\s*):/g, '"$1":')
      .replace(/'([^']+?)'([\s,\]}])/g, '"$1"$2')
    return JSON.parse(stringWithJSON)
  }
}

/**
 * Any
 * @param str String
 * @param iterator
 * @returns
 */
const any = (
  str: string,
  iterator: (letter: string, i: number) => boolean
): boolean => {
  let result = false

  for (let i = 0; i < str.length; i++) {
    result = iterator(str[i], i)
    if (result) {
      break
    }
  }

  return result
}

/**
 * Extract
 * @param str String
 * @returns
 */
const extract = (str: string): string | null => {
  let startIndex = str.search(/[{[]/)
  if (startIndex === -1) {
    return null
  }

  let openingChar = str[startIndex]
  let closingChar = blocks[openingChar]
  let endIndex = -1
  let count = 0

  str = str.substring(startIndex)
  any(str, (letter, i) => {
    if (letter === openingChar) {
      count++
    } else if (letter === closingChar) {
      count--
    }

    if (!count) {
      endIndex = i
      return true
    }

    return false
  })

  if (endIndex === -1) {
    return null
  }

  let obj = str.substring(0, endIndex + 1)
  return obj
}

const extractJSONFromString = (str: string): any[] => {
  let result: string | null
  const objects: JSON[] = []

  while ((result = extract(str)) !== null) {
    try {
      let obj = jsonify(result)
      objects.push(obj)
    } catch (_err) {}

    str = str.replace(result, '')
  }

  return objects
}

export default extractJSONFromString
