import * as fs from 'fs'
import * as util from 'util'
import { Chain } from './core/Chain'
import { DataFileLoader } from './build/DataFileLoader'
import { Builder } from './build/Builder'
import { ChainObjectWriter } from './build/ChainObjectWriter'
import { Generator } from './generate/Generator'

util.inspect.defaultOptions.depth = null

/**
 * Writes the model to disk and shows some examples generated with it as well as the file size.
 * @param modelName
 * @param chain
 */
function writeModel(modelName: string, chain: Chain) {
  console.log(`Model ${modelName}`)
  console.log('\tExample generated names:')
  const nameGenerator = new Generator(chain)
  for (let i = 0; i !== 5; i++) {
    console.log(`\t\t${nameGenerator.next()}`)
  }

  const modelPath = `./gen/${modelName}.ts`
  ChainObjectWriter.writeAsTypescriptExportedObject(modelName, modelPath, chain)
  const stats = fs.statSync(modelPath)
  const fileSizeInBytes = stats["size"]
  console.log(`\tModel ${modelName} written to ${modelPath}, has ${fileSizeInBytes} bytes\n`)
}

const dataFileLoader = new DataFileLoader()

const cities500NamesFile = 'cities500Names.txt' // contains a list of real city names
const cities500Names = dataFileLoader.load(cities500NamesFile)
const fictionalPlaceNamesFile = 'fictionalPlaceNames.txt' // contains a list of fantasy place names
const fictionalPlaceNames = dataFileLoader.load(fictionalPlaceNamesFile)

// simplest case, builds a 2-gram model from a single file
console.log(`Building model from ${fictionalPlaceNamesFile} with 2-grams`)
const fictionalPlaceNames2 = new Builder(2)
  .from(cities500Names)
  .optimize() // optimize makes the leaf nodes numbers instead of objects to reduce object size on disk
  .build()
writeModel('fictionalPlaceNames2', fictionalPlaceNames2)


// build a 3-grams model from a single file
console.log(`Building model from ${cities500NamesFile} with 3-grams`)
const cities500Names3 = new Builder(3)
  .from(cities500Names)
  // scales the counters stored for each token so that the values are smaller
  // also helps to reduce object size on disk
  // only makes sense for big files with lots of letters
  .scale(10000)
  .optimize()
  .build()
writeModel('cities500Names3', cities500Names3)


// a more complex case, builds a 4-gram model, using names from multiple files
// this approach uses a more generic and bigger first file to prevent out-of-vocabulary tokens
// and the second file to model it in a specific style
console.log(`Building model from ${cities500NamesFile} and ${fictionalPlaceNamesFile} with 4-grams`)
const fictionalPlaceNames4 = new Builder(4)
  .from(cities500Names)
  // the second file is much smaller than the first so a weight is used to give it more importance
  .from(fictionalPlaceNames, 100000)
  .scale(10000)
  .optimize()
  .build()
writeModel('fictionalPlaceNames4', fictionalPlaceNames4)
