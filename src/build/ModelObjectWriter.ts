import * as fs from 'fs'
import { OptimizedModel } from '../core/OptimizedModel'

/**
 * Writes a {@link OptimizedModel} model to disk.
 */
export class ModelObjectWriter {
  /**
   * Writes the {@link OptimizedModel} model to disk as an object to the given path with the provided name.
   * @param name name of the model used for the object name in the typescript generated code
   * @param path where to write the model file
   * @param model the model to write
   * @param writeExport true to write 'export '
   */
  static writeAsCodeFile(name: string, path: string, model: OptimizedModel, writeExport = true) {
    const str = this.asString(model)
    const code = `${writeExport ? 'export ' : ''}const ${name} = ${str}`
    fs.writeFileSync(path, code)
  }

  private static asString(object: object): string {
    return JSON.stringify(object)
      .replace(/["']([a-zA-Z0-9]+)["']/g, '$1')
  }
}
