import { fictionalPlaceNames } from './chains/fictionalPlaceNames'
import { NameGenerator } from './NameGenerator'

const nameGenerator = new NameGenerator(fictionalPlaceNames)
for (let i = 0; i !== 5; i++) {
  console.log(nameGenerator.nextName(false))
}
