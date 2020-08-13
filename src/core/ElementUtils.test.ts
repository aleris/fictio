import { ElementUtils } from './ElementUtils'

describe('ElementUtils', () => {

  test('asKeyValueList', () => {
    const e = { C: 111, a: { C: 6}, b: { C: 2 } }
    const r = ElementUtils.asKeyValueList(e)

    expect(r.length).toStrictEqual(2)
    expect(r).toMatchObject([ {k: 'a', v: 6}, {k: 'b', v: 2} ])
  })

  test('sortByValueDescending', () => {
    const list = [ {k: 'b', v: 2}, {k: 'a', v: 1}, {k: 'c', v: 3} ]
    const r = ElementUtils.sortByValueDescending(list)

    expect(r.length).toStrictEqual(3)
    expect(r).toMatchObject([ {k: 'c', v: 3}, {k: 'b', v: 2}, {k: 'a', v: 1} ])
  })
})
