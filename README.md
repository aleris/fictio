# FICTIO

Random fictional names generator.

Builds configurable Marcov chain models from list of names and generates random names.

## Build

Builds a simple 2-gram model from a single file:

```typescript
const cities500Names = dataFileLoader.load('cities500Names.txt')
const chain = new Builder(2)
  .from(cities500Names)
  .build()
```

## Generate 

Generate names from a model

```typescript
const nameGenerator = new Generator(chain)
console.log(nameGenerator.next())
```

## How to use it

1. Build the model and save it to disk

Use `Builder` to generate a model from a list of strings like in the examples included in the `./data` folder.
Use `ChainObjectWriter` to write the model to disk as a `typescript` file

See `./src/build.ts` for examples of how to build models.
Run `npm run start` to execute this file and generate example models.

2. Generate names

Use `Generator` to load a prebuild model directly form the `typescript` file and generate random names.

See `example.test.ts` for an example on how to use the generator.

## Tests

Run `npm run test` to execute the tests.
