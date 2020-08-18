import * as fs from 'fs'
import { mocked } from 'ts-jest'
import { ModelObjectWriter } from './ModelObjectWriter'
import { ModelKeys } from '../core/ModelKeys'

jest.mock('fs')
const mockedFs = mocked(fs, true)

describe('ModelObjectWriter', () => {
  test('writeAsCodeFile', () => {
    const o = {
      [ModelKeys.NGrams]: 1,
      [ModelKeys.Lengths]: { 3: 10, 5: 2 },
      [ModelKeys.Elements]: { a: 1, b: {[ModelKeys.Count]: 2, c: 345 }}
    }
    ModelObjectWriter.writeAsCodeFile('test', 'test.js', o)
    expect(mockedFs.writeFileSync)
      .toHaveBeenCalledWith('test.js', 'export const test = {N:1,L:{3:10,5:2},E:{a:1,b:{C:2,c:345}}}')
  })
})
