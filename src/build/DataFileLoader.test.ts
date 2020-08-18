import * as fs from 'fs'
import { mocked } from 'ts-jest'
import { DataFileLoader } from './DataFileLoader'

jest.mock('fs')
const mockedFs = mocked(fs, true)

describe('DataFileLoader', () => {
  test('load', () => {
    mockedFs.readFileSync.mockReturnValue(`abc\nxyz`)
    const dataFileLoader = new DataFileLoader()
    const result = dataFileLoader.load('test.txt')
    expect(result).toStrictEqual(['abc', 'xyz'])
  })

  test('load ignores blank lines', () => {
    mockedFs.readFileSync.mockReturnValue(`abc\n\n   \nxyz`)
    const dataFileLoader = new DataFileLoader()
    const result = dataFileLoader.load('test.txt')
    expect(result).toStrictEqual(['abc', 'xyz'])
  })

  test('load ignores comment lines', () => {
    mockedFs.readFileSync.mockReturnValue(`# comment\nabc`)
    const dataFileLoader = new DataFileLoader()
    const result = dataFileLoader.load('test.txt')
    expect(result).toStrictEqual(['abc'])
  })
})
