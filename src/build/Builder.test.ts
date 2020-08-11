import util from 'util'
import { Chain } from '../core/Chain'
import { Builder } from './Builder'

util.inspect.defaultOptions.depth = null

describe('Builder', () => {
  describe('from names build chain has correct', () => {
    let chain: Chain

    beforeAll(() => {
      chain = new Builder(3)
        .from(['ab', 'axyz', 'abc def', 'awq axyp',  'axa', 'xyz', 'xyz', 'ax', 'a'])
        .build()
      // console.log(chain)
    })

    test('nGrams', () => {
      expect(chain).toMatchObject({
        nGrams: 3
      })
    })

    test('parts', () => {
      expect(chain).toMatchObject({
        P: { '1': { C: 7, T: 0 }, '2': { C: 2, T: 0 }, T: 9 },
      })
    })

    test('lengths', () => {
      expect(chain).toMatchObject({
        L: { '1': { C: 1, T: 0 }, '2': { C: 2, T: 0 }, '3': { C: 6, T: 0 }, '4': { C: 2, T: 0 }, T: 11 }
      })
    })

    test('starts', () => {
      expect(chain).toMatchObject({
        S: { T: 11, a: { C: 8, T: 0 }, d: { C: 1, T: 0 }, x: { C: 2, T: 0 } }
      })
    })

    test('elements', () => {
      expect(chain).toMatchObject({
        E:
          { T: 13,
            a:
              { C: 8,
                T: 7,
                b: { C: 2, T: 1, c: { C: 1, T: 0 } },
                x: { C: 4, T: 3, y: { C: 2, T: 0 }, a: { C: 1, T: 0 } },
                w: { C: 1, T: 1, q: { C: 1, T: 0 } } },
            x:
              { C: 4,
                T: 4,
                y: { C: 4, T: 4, z: { C: 3, T: 0 }, p: { C: 1, T: 0 } } },
            d: { C: 1, T: 1, e: { C: 1, T: 1, f: { C: 1, T: 0 } } } }
      })
    })
  })

  test('scale', () => {
    const names = []
    for (let i = 0; i !== 100; i++) {
      names.push(...['ab', 'ac abc', 'abd abcd', 'abce'])
    }
    for (let i = 0; i !== 10; i++) {
      names.push(...['xy', 'xz', 'xyz xyw'])
    }
    const chain = new Builder(3)
      .from(names)
      .scale(100)
      .build()

    expect(chain).toMatchObject({
      L:
        { '2': { C: 34, T: 0 },
          '3': { C: 34, T: 0 },
          '4': { C: 31, T: 0 },
          T: 99 },
      E:
        { T: 100,
          a:
            { C: 71,
              T: 100,
              b: { C: 83, T: 100, c: { C: 75, T: 0 }, d: { C: 25, T: 0 } },
              c: { C: 17, T: 0 } },
          b:
            { C: 24,
              T: 100,
              c: { C: 100, T: 100, d: { C: 50, T: 0 }, e: { C: 50, T: 0 } } },
          x:
            { C: 5,
              T: 40,
              y: { C: 30, T: 20, z: { C: 10, T: 0 }, w: { C: 10, T: 0 } },
              z: { C: 10, T: 0 } } }
    })
  })

  describe('optimize', function () {

    test('is making direct numbers for nested elements', () => {
      const chain = new Builder(3)
        .from(['ab', 'ac', 'x'])
        .optimize()
        .build()

      expect(chain).toMatchObject({
        nGrams: 3,
        P: { '1': 3, T: 3 },
        L: { '1': 1, '2': 2, T: 3 },
        S: { T: 3, a: 2, x: 1 },
        E: { T: 3, a: { C: 2, T: 2, b: 1, c: 1 }, x: 1 }
      })
    })

    test('removes key with count 0 after scaling', () => {
      const names = []
      for (let i = 0; i !== 100; i++) {
        names.push(...['abc'])
      }
      names.push('abz')
      names.push('azz')
      const chain = new Builder(3)
        .from(names)
        .scale(10)
        .optimize()
        .build()

      expect(chain).toMatchObject({
        E: { T: 10, a: { C: 10, T: 10, b: { C: 10, T: 10, c: 10 } } } // no z
      })
    })

  });

})

