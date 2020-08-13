import { NGramGenerator } from './NGramGenerator'

describe('NGramGenerator', () => {
  test('generate 1-grams', () => {
    const result = NGramGenerator.generate('abc', 1)
    expect(result).toStrictEqual([['a'], ['b'], ['c']])
  })

  test('generate 2-grams', () => {
    const result = NGramGenerator.generate('abcx', 2)
    expect(result).toStrictEqual([['a', 'b'], ['b', 'c'], ['c', 'x']])
  })

  test('generate 3-grams', () => {
    const result = NGramGenerator.generate('abcxy', 3)
    expect(result).toStrictEqual([['a', 'b', 'c'], ['b', 'c', 'x'], ['c', 'x', 'y']])
  })

  test('generate 4-grams', () => {
    const result = NGramGenerator.generate('abcxyz', 4)
    expect(result).toStrictEqual([['a', 'b', 'c', 'x'], ['b', 'c', 'x', 'y'], ['c', 'x', 'y', 'z']])
  })
})
