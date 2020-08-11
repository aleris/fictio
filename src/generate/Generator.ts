import { Chain} from '../core/Chain'
import { ChainKeys } from '../core/ChainKeys'
import { Element } from '../core/Element'
import { ElementPicker } from './ElementPicker'

/**
 * Generates names using a prebuild model.
 */
export class Generator {
  /**
   * Creates a generator with the specified {@link Chain} model.
   * @param chain the model to use
   */
  constructor(private chain: Chain) { }

  /**
   * Randomly generates the next name
   * @param multipleParts true to generate multiple parts names, false otherwise
   */
  next(multipleParts = false): string {
    const partsCount = multipleParts ? Number(this.nextToken(ChainKeys.Parts)) : 1
    const parts = []
    while (parts.length < partsCount) {
      const length = Number(this.nextToken(ChainKeys.Lengths))
      const firstCharacter = this.nextToken(ChainKeys.StartLetters)
      const characters = [firstCharacter]
      while (characters.length < length) {
        const character = this.nextToken(ChainKeys.Elements, characters)
        characters.push(character)
      }
      const name = this.capitalize(characters.join(''))
      parts.push(name)
    }
    return parts.join(' ')
  }

  private nextToken(key: string, history: string[] = []): string {
    let element = this.chain[key] as Element
    let path = this.tail(history, this.chain.nGrams - 1)
    while (0 < path.length) {
      let pointerElement = this.atPath(element, path)
      if (undefined != pointerElement) {
        element = pointerElement
        break
      }
      path = path.slice(1, path.length)
    }
    return ElementPicker.randomPick(element)
  }

  private atPath(root: Element, path: string[]): Element | undefined {
    let element = root
    for (let token of path) {
      element = element[token] as Element
      if (element === undefined) {
        return undefined
      }
    }
    return element
  }

  private tail(a: any[], n: number): any[] {
    if (a.length <= n) {
      return a
    }
    return a.slice(a.length - n, a.length)
  }

  private capitalize(name: string): string {
    return name[0].toUpperCase() + name.substr(1)
  }
}
