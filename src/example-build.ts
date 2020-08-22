import * as fs from 'fs'
import * as util from 'util'
import { Model } from './build/Model'
import { DataFileLoader } from './build/DataFileLoader'
import { Builder } from './build/Builder'
import { ModelObjectWriter } from './build/ModelObjectWriter'
import { Generator } from './generate/Generator'
import { ModelSizeOptimizer } from './build/ModelSizeOptimizer'

util.inspect.defaultOptions.depth = null

/**
 * Writes the model to disk and shows some examples generated with it as well as the file size.
 * @param modelName
 * @param model
 */
function writeModel(modelName: string, model: Model) {
  const optimized = ModelSizeOptimizer.optimize(model, 9999)

  console.log(`Model ${modelName}`)
  console.log('\tExample generated names:')
  const nameGenerator = new Generator(optimized)
  for (let i = 0; i !== 5; i++) {
    console.log(`\t\t${nameGenerator.next()}`)
  }

  const modelPath = `./gen/${modelName}.ts`
  ModelObjectWriter.writeAsCodeFile(modelName, modelPath, optimized)
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
  .build()
writeModel('fictionalPlaceNames2', fictionalPlaceNames2)


// build a 3-grams model from a single file
console.log(`Building model from ${cities500NamesFile} with 3-grams`)
const cities500Names3 = new Builder(3)
  .from(cities500Names)
  .build()
writeModel('cities500Names3', cities500Names3)


// a more complex case, builds a 4-gram model, using names from multiple files
// this approach uses a more generic and bigger first file to prevent out-of-vocabulary tokens
// and the second file to model it in a specific style
console.log(`Building model from ${cities500NamesFile} and ${fictionalPlaceNamesFile} with 4-grams`)
const fictionalPlaceNames4 = new Builder(4)
  .from(cities500Names)
  // the second file is much smaller than the first so a weight is used to give it more importance
  .from(fictionalPlaceNames, 10000)
  .build()
writeModel('fictionalPlaceNames4', fictionalPlaceNames4)
