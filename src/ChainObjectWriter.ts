import fs from "fs"
import { Chain } from './Chain'
import { ChainBuilder } from './ChainBuilder'

export class ChainObjectWriter {
  buildAndSave(dataFileName: string): Chain {
    const names = fs.readFileSync(`./data/${dataFileName}.txt`).toString()
      .split('\n')
      .filter(line => !this.isEmpty(line) && !this.isComment(line))

    const chainBuilder = new ChainBuilder()
    const chain = chainBuilder.fromNames(names)

    this.write(dataFileName, chain)

    return chain
  }

  private isEmpty(s: string) {
    return s === ''
  }

  private isComment(s: string) {
    return s.startsWith('#')
  }

  private write(name: string, chain: Chain) {
    fs.writeFileSync(`./src/chains/${name}.ts`, `export const ${name} = ${this.asSizeOptimizedString(chain)}`)
  }

  private asSizeOptimizedString(object: object): string {
    return JSON.stringify(object)
      .replace(/"([a-z]|[0-9]+)"/g, '$1')
  }
}
