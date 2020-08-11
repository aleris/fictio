import { Builder } from '../build/Builder'
import { Generator } from './Generator'

describe('Generator', () => {
  test('next returns a new name based on model', () => {
    const chain = new Builder(3)
      .from(['abcd', 'abcx'])
      .scale(10)
      .optimize()
      .build()
    const generator = new Generator(chain)
    for (let i = 0; i != 10; i++) {
      const name = generator.next()
      expect(name).toMatch(/Abc[dx]/)
    }
  })

  test('next returns cleaned name without trailing non letter', () => {
    const chain = new Builder(3)
      .from(['abc-', 'abc\''])
      .build()
    const generator = new Generator(chain)
    for (let i = 0; i != 10; i++) {
      const name = generator.next()
      expect(name).toMatch(/Abc/)
    }
  })
})
