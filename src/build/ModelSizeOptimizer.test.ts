import { ModelSizeOptimizer } from './ModelSizeOptimizer'
import util from "util"

util.inspect.defaultOptions.depth = null

describe('ModelSizeOptimizer', () => {
  const model = {
    nGrams: 3,
    token: 'root',
    count: 1,
    childrenTotal: 44,
    children:
      [{
        token: 'P',
        count: 1,
        childrenTotal: 3,
        children:
          [ {token: 1, count: 22, childrenTotal: 0, children: []},
            {token: 2, count: 77, childrenTotal: 0, children: []}]
      },
        {
          token: 'E',
          count: 99,
          childrenTotal: 20,
          children:
            [{
              token: 'a',
              count: 2,
              childrenTotal: 27,
              children:
                [{
                  token: 'b',
                  count: 27,
                  childrenTotal: 0,
                  children: []
                }]
            },
              {
                token: 'b',
                count: 18,
                childrenTotal: 279,
                children:
                  [{
                    token: 'r',
                    count: 1,
                    childrenTotal: 0,
                    children: []
                  }, {
                    token: 'c',
                    count: 278,
                    childrenTotal: 11,
                    children: [{token: 'f', count: 11, childrenTotal: 0, children: []}]
                  }]
              }]
        }]
  }

  test('optimize', () => {
    const result = ModelSizeOptimizer.optimize(model)
    expect(result).toStrictEqual(
      { N: 3,
        P: { '1': 22, '2': 77 },
        E:
          {
            a: { C: 2, b: 27 },
            b: { C: 18, r: 1, c: { C: 278, f: 11 } } } }
    )
  })

  test('optimize with maxCount', () => {
    const result = ModelSizeOptimizer.optimize(model, 5)
    expect(result).toStrictEqual(
      {
        N: 3,
        P: { 1: 22, 2: 77 },
        E:
          { a: { C: 1, b: 1 },
            b: { C: 5, c: { C: 5, f: 1 } } } }
    )
  })
})
