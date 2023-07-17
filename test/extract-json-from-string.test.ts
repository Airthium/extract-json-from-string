import extractJSONFromString from '../lib/extract-json-from-string'

describe('extract-json-from-string', () => {
  test('single JSON', () => {
    const results = extractJSONFromString(
      "Here's an object { foo: 'bar' } that should be extracted"
    )
    expect(results).toEqual([{ foo: 'bar' }])
  })

  test('multiple JSON', () => {
    const results = extractJSONFromString(
      "Here's an object { foo: 'bar' } that should be extracted as well as { baz: 'quux' } this"
    )
    expect(results).toEqual([{ foo: 'bar' }, { baz: 'quux' }])
  })

  test('nested JSON', () => {
    const results = extractJSONFromString(
      "Here's an object { foo: { bar: { baz: 'quux' }, hello: { world: true } } } that should be extracted"
    )
    expect(results).toEqual([
      { foo: { bar: { baz: 'quux' }, hello: { world: true } } }
    ])
  })

  test('with array', () => {
    const results = extractJSONFromString(
      "Here's an array ['foo', 'bar'] that should be extracted"
    )
    expect(results).toEqual([['foo', 'bar']])
  })

  test('with multiple arrays', () => {
    const results = extractJSONFromString(
      "Here's an array ['foo', 'bar'] that should be extracted as well as ['baz', 'quux'] this"
    )
    expect(results).toEqual([
      ['foo', 'bar'],
      ['baz', 'quux']
    ])
  })

  test('with nested arrays', () => {
    const results = extractJSONFromString(
      "Here's an array [ 'foo', [ 'bar', [ 'baz', 'quux' ], 'hello', [ 'world', true ] ] ] that should be extracted"
    )
    expect(results).toEqual([
      ['foo', ['bar', ['baz', 'quux'], 'hello', ['world', true]]]
    ])
  })

  test('with mix', () => {
    const results = extractJSONFromString(
      `Here's some ['foo', { bar: true }] things to ${JSON.stringify({
        baz: 'quux',
        items: [1, 2, 3],
        nested: [{ property: { inArray: 1 } }]
      })} extract`
    )
    expect(results).toEqual([
      ['foo', { bar: true }],
      {
        baz: 'quux',
        items: [1, 2, 3],
        nested: [{ property: { inArray: 1 } }]
      }
    ])
  })

  test('invalid object', () => {
    let results = extractJSONFromString('laskfjd laksdj fals { lkasjdf')
    expect(results.length).toBe(0)

    results = extractJSONFromString('laskfjd laksdj fals { lkasjdf }')
    expect(results.length).toBe(0)

    results = extractJSONFromString('laskfjd laksdj fals lkasjdf')
    expect(results.length).toBe(0)

    results = extractJSONFromString(
      'laskfjd laksdj fals { lkasjdf } sakjd { foo: "bar" }'
    )
    expect(results).toEqual([{ foo: 'bar' }])
  })
})
