import { ChainKeys } from './ChainKeys'

describe('ChainKeys', () => {

  test('filterNonElementKeys', () => {
    const e = {
      [ChainKeys.NGrams]: 1,
      [ChainKeys.Parts]: 1,
      [ChainKeys.Lengths]: 1,
      [ChainKeys.StartLetters]: 1,
      [ChainKeys.Count]: 1,
      [ChainKeys.ChildrenTotal]: 1,
      a: 1
    }

    const r = ChainKeys.filterNonElementKeys(e)

    expect(r.length).toStrictEqual(4)
    expect(r).toStrictEqual([ChainKeys.Parts, ChainKeys.Lengths, ChainKeys.StartLetters, 'a'])
  })

})
