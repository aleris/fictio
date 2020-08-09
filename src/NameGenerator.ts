import { Chain, CHAIN_KEY_LENGTHS, CHAIN_KEY_PARTS, CHAIN_KEY_START, CHAIN_KEY_TOTALS } from './Chain'

export class NameGenerator {
  constructor(private chain: Chain) { }

  nextName(multipleParts = true) {
    const partsCount = multipleParts ? Number(this.nextToken(CHAIN_KEY_PARTS)) : 1
    const parts = []
    while (parts.length < partsCount) {
      const length = Number(this.nextToken(CHAIN_KEY_LENGTHS))
      const firstCharacter = this.nextToken(CHAIN_KEY_START)
      let previousCharacter = firstCharacter
      const characters = [firstCharacter.toUpperCase()]
      while (characters.length < length) {
        const character = this.nextToken(previousCharacter)
        characters.push(character)
        previousCharacter = character
      }
      const name = characters.join('')
      parts.push(name)
    }
    return parts.join(' ')
  }

  private nextToken(key: string): string {
    const totalCount = this.chain[CHAIN_KEY_TOTALS][key]
    const placeIndex = Math.floor(Math.random() * totalCount)
    const chainElement = this.chain[key]
    let accumulator = 0
    for (let token of Object.keys(chainElement)) {
      accumulator += chainElement[token]
      if (placeIndex < accumulator) {
        return token
      }
    }
    return '-'
  }
}
