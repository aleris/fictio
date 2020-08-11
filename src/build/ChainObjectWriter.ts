import * as fs from 'fs'
import { Chain } from '../core/Chain'

/**
 * Writes a {@link Chain} model to disk.
 */
export class ChainObjectWriter {
  /**
   * Writes the {@link Chain} model to disk as a javascript object to the given path with the provided name.
   * @param name name of the model used for the object name in the javascript generated code
   * @param path where to write the model file
   * @param chain the chain model to write
   */
  static writeAsTypescriptExportedObject(name: string, path: string, chain: Chain) {
    const str = this.asString(chain)
    const code = `export const ${name} = ${str}`
    fs.writeFileSync(path, code)
  }

  private static asString(object: object): string {
    return JSON.stringify(object)
      .replace(/"([a-zA-Z0-9]+)"/g, '$1')
  }
}
