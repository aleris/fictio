import { ElementPicker } from './ElementPicker'

describe('ElementPicker', () => {

  describe('randomPick returns elements with correct probability', () => {

    test('from element leafs', () => {
      const e = { C: 2, a: 5, b: 50, c: 20, d: 25 }
      const result = {a: 0, b: 0, c: 0, d: 0} as { [key: string]: number }
      const iter = 100
      for (let i = 0; i !== 100 * iter; i++) {
        result[ElementPicker.randomPick(e)] += 1 / iter
      }
      expect(result.a).toBeGreaterThan(3)
      expect(result.a).toBeLessThan(7)

      expect(result.b).toBeGreaterThan(48)
      expect(result.b).toBeLessThan(52)

      expect(result.c).toBeGreaterThan(18)
      expect(result.c).toBeLessThan(22)
    })

    test('from intermediary elements', () => {
      const e = {
        C: 17,
        a: {C: 25, c: {C: 75}},
        b: {C: 75}
      }
      const result = {a: 0, b: 0} as { [key: string]: number }
      const iter = 100
      for (let i = 0; i !== 100 * iter; i++) {
        result[ElementPicker.randomPick(e)] += 1 / iter
      }
      expect(result.a).toBeGreaterThan(23)
      expect(result.a).toBeLessThan(27)

      expect(result.b).toBeGreaterThan(73)
      expect(result.b).toBeLessThan(77)
    })

  })

})
