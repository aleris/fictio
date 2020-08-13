import { Builder } from '../build/Builder'
import { ModelSizeOptimizer } from '../build/ModelSizeOptimizer'
import { Generator } from './Generator'

describe('Generator', () => {
  test('next returns a new name based on model', () => {
    const model = new Builder(3)
      .from(['abcd', 'abcx'])
      .build()
    const optimizedModel = ModelSizeOptimizer.optimize(model)
    const generator = new Generator(optimizedModel)
    for (let i = 0; i != 10; i++) {
      const name = generator.next()
      expect(name).toMatch(/Abc[dx]/)
    }
  })

  test('next returns cleaned name without trailing non letter', () => {
    const model = new Builder(3)
      .from(['abc-', 'abc\''])
      .build()
    const optimizedModel = ModelSizeOptimizer.optimize(model)
    const generator = new Generator(optimizedModel)
    for (let i = 0; i != 10; i++) {
      const name = generator.next()
      expect(name).toMatch(/Abc/)
    }
  })
})
