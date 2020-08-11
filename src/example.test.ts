import { fictionalPlaceNames4 } from '../gen/fictionalPlaceNames4'
import { Generator } from './generate/Generator'

test('generate', () => {
  const generator = new Generator(fictionalPlaceNames4)
  console.log(generator.next())
  console.log(generator.next())
  console.log(generator.next())
})
