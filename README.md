# FICTIO

Random fictional names generator written in Typescript.

Builds configurable Marcov chain models from list of training strings and generates random names.

## Build

Build a simple 2-gram model from a single file:

```typescript
const cities500Names = dataFileLoader.load('cities500Names.txt')
const chain = new Builder(2)
  .from(cities500Names)
  .build()
```

Build a more complex 4-gram model from two files:

```typescript
const fictionalPlaceNames = new Builder(4)
  .from(cities500Names)
  // the second file is much smaller than the first so a weight is used to give it more importance
  .from(fictionalPlaceNames, 10000)
  .build()
```

## Optimize model size

The model size is growing exponentially with n-grams parameter and depends also on the training data.

The generator uses a size optimized model which can be obtained like this:
 
```typescript
const optimizedModel = ModelSizeOptimizer.optimize(model)
```

## Generate 

Generate names from a model

```typescript
const nameGenerator = new Generator(optimizedModel)
console.log(nameGenerator.next())
```

Examples in the training data:
- Aereth
- Dosadi
- Halvmork

Examples of generated names:
- Amiamar
- Ellicon
- Hooletaluna
- Trishnu
- Pyrrhia

But also, (albeit for lower n-grams):
- Fureraywauiu 😵
- Acaskagnyeserwer 🤔
- Kanggemervadebikaynieza 🥺

## How to use it

**Build the model and save it to disk:**

Use `Builder` to generate a model from a list of strings like in the examples included in the `./data` folder.

Use `ModelSizeOptimizer` to shrink the model object.
 
Use `ChainObjectWriter` to write the model to disk as a const object in a `typescript` file. The same can be used
for `javascript` without the export keyword.  

See `./src/build.ts` for examples of how to build models.
Run `npm run start` to execute this file and generate example models.

**Generate names:**

Use `Generator` to load a prebuild optimized model directly form a file and generate random names.

See `./src/example.test.ts` for an example on how to directly use the generator.

## Tests

Run `npm run test` to execute the tests.
