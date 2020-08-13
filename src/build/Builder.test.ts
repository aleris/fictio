import util from 'util'
import { Builder } from './Builder'
import { Model } from './Model'

util.inspect.defaultOptions.depth = null

describe('Builder', () => {
  describe('from names build chain has correct', () => {
    let model: Model

    beforeAll(() => {
      model = new Builder(3)
        .from(['ab', 'axyz', 'abc def', 'awq axyp',  'axa', 'xyz', 'xyz', 'ax', 'a'])
        .build()
    })

    test('nGrams', () => {
      expect(model).toMatchObject({
        nGrams: 3
      })
    })

    test('parts', () => {
      expect(model.children).toContainEqual({ token: 'P',
            count: 9,
            childrenTotal: 9,
            children:
              [ { token: 1, count: 7, childrenTotal: 0, children: [] },
                { token: 2, count: 2, childrenTotal: 0, children: [] } ]
      })
    })

    test('lengths', () => {
      expect(model.children).toContainEqual({ token: 'L',
        count: 11,
        childrenTotal: 11,
        children:
          [ { token: 2, count: 2, childrenTotal: 0, children: [] },
            { token: 4, count: 2, childrenTotal: 0, children: [] },
            { token: 3, count: 6, childrenTotal: 0, children: [] },
            { token: 1, count: 1, childrenTotal: 0, children: [] } ] })
    })

    test('starts', () => {
      expect(model.children).toContainEqual({ token: 'S',
        count: 11,
        childrenTotal: 11,
        children:
          [ { token: 'a', count: 8, childrenTotal: 0, children: [] },
            { token: 'd', count: 1, childrenTotal: 0, children: [] },
            { token: 'x', count: 2, childrenTotal: 0, children: [] } ] })
    })

    test('elements', () => {
      expect(model.children).toContainEqual({ token: 'E',
        count: 13,
        childrenTotal: 13,
        children:
          [ { token: 'a',
            count: 8,
            childrenTotal: 7,
            children:
              [ { token: 'b',
                count: 2,
                childrenTotal: 1,
                children: [ { token: 'c', count: 1, childrenTotal: 0, children: [] } ] },
                { token: 'x',
                  count: 4,
                  childrenTotal: 3,
                  children:
                    [ { token: 'y', count: 2, childrenTotal: 0, children: [] },
                      { token: 'a', count: 1, childrenTotal: 0, children: [] } ] },
                { token: 'w',
                  count: 1,
                  childrenTotal: 1,
                  children: [ { token: 'q', count: 1, childrenTotal: 0, children: [] } ] } ] },
            { token: 'x',
              count: 4,
              childrenTotal: 4,
              children:
                [ { token: 'y',
                  count: 4,
                  childrenTotal: 4,
                  children:
                    [ { token: 'z', count: 3, childrenTotal: 0, children: [] },
                      { token: 'p', count: 1, childrenTotal: 0, children: [] } ] } ] },
            { token: 'd',
              count: 1,
              childrenTotal: 1,
              children:
                [ { token: 'e',
                  count: 1,
                  childrenTotal: 1,
                  children: [ { token: 'f', count: 1, childrenTotal: 0, children: [] } ] } ] } ] })
    })

  })

})
