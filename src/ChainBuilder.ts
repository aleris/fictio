import { Chain, CHAIN_KEY_LENGTHS, CHAIN_KEY_PARTS, CHAIN_KEY_START, ChainElementMap } from './Chain'

export class ChainBuilder {
  fromNames(names: Array<string>): Chain {
    const chain = {} as Chain
    for (let name of names) {
      let parts = name.split(/\s+/g)
      this.incrementTokenCount(chain, CHAIN_KEY_PARTS, String(parts.length))
      for (let namePart of parts) {
        const lowerNamePart = namePart.toLowerCase()
        this.incrementTokenCount(chain, CHAIN_KEY_LENGTHS, String(lowerNamePart.length))
        const startCharacter = lowerNamePart.substr(0, 1)
        this.incrementTokenCount(chain, CHAIN_KEY_START, startCharacter)
        let previousCharacter = startCharacter
        for (let i = 1; i !== lowerNamePart.length; i++) {
          const c = lowerNamePart.charAt(i)
          this.incrementTokenCount(chain, previousCharacter, c)
          previousCharacter = c
        }
      }
    }
    this.scaleCountWeights(chain)
    chain.totals = this.calculateTotals(chain)
    return chain
  }

  incrementTokenCount(chain: Chain, key: string, token: string) {
    let chainElement = chain[key]
    if (undefined === chainElement) {
      chainElement = chain[key] = {}
    }
    let count = chainElement[token]
    if (undefined === count) {
      count = 0
    }
    chainElement[token] = ++count
  }

  scaleCountWeights(chain: Chain) {
    for (let key of Object.keys(chain)) {
      let chainElement = chain[key]
      for (let token of Object.keys(chainElement)) {
        const count = chainElement[token]
        chainElement[token] = Math.floor(Math.pow(count, 1.25))
      }
    }
  }

  calculateTotals(chain: Chain): ChainElementMap {
    const totalCounts = {} as ChainElementMap
    for (let key of Object.keys(chain)) {
      let totalCount = 0
      let chainElement = chain[key]
      for (let token of Object.keys(chainElement)) {
        const count = chainElement[token]
        totalCount += count
      }
      totalCounts[key] = totalCount
    }
    return totalCounts
  }
}
