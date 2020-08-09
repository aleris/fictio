import { ChainObjectWriter } from './ChainObjectWriter'
import { NameGenerator } from './NameGenerator'

const chainObjectWriter = new ChainObjectWriter()
const chain = chainObjectWriter.buildAndSave('fictionalPlaceNames')
const nameGenerator = new NameGenerator(chain)
for (let i = 0; i !== 5; i++) {
  console.log(nameGenerator.nextName())
}
