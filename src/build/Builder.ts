import { Chain} from '../core/Chain'
import { ChainKeys } from '../core/ChainKeys'
import { Element } from '../core/Element'

/**
 * Builds a character level markov chain model from a list of tokens.
 * The model is primary built for generating names and consists of:
 * - parts ('Loca Bor' has 2 parts)
 * - lenghts (4 and 3 in the example above)
 * - starting letters (l and b)
 * - marcov chain of n-grams as a trie map (loc, oca, bor) with counters of all letters
 */
export class Builder {
  private optimized = false
  private readonly chain: Chain

  /**
   * Construct a builder with the specified nGrams.
   * @param nGrams number of grams. Use a value between 2 and 4. The higher the value, the bigger the model size.
   */
  constructor(nGrams = 2) {
    this.chain = {
      nGrams
    }
  }

  /**
   * Updates the model from a list of tokens.
   * @param tokens a list of tokens.
   * @param weight weight with which to multiply each occurrence of a letter in the model.
   * @returns this builder
   */
  from(tokens: string[], weight = 1): Builder {
    for (let name of tokens) {
      const parts = name.split(/\s+/g)
      this.incrementLink(ChainKeys.Parts, [String(parts.length)], weight)

      for (let namePart of parts) {
        this.incrementLink(ChainKeys.Lengths, [String(namePart.length)], weight)

        const lowercaseNamePart = namePart.toLowerCase()
        const startCharacter = lowercaseNamePart.substr(0, 1)
        this.incrementLink(ChainKeys.StartLetters, [startCharacter], weight)

        for (let gram of Builder.generateNGrams(lowercaseNamePart, this.chain.nGrams)) {
          this.incrementLink(ChainKeys.Elements, gram, weight)
        }
      }
    }
    return this
  }

  /**
   * Proportionally scales the model in such a way that no count value is exceeding the given number.
   * @param maxCount maximum value of a letter probability counter
   * @returns this builder
   */
  scale(maxCount: number): Builder {
    if (this.optimized) {
      throw 'must be called before optimize'
    }
    this.scaleNode(this.chain, maxCount)
    return this
  }

  /**
   * Optimizes the model for size.
   * Makes leaf nodes directly numbers instead of an object so `{a: { C: 5 } }` becomes `{a: 5}`
   * Nodes with count 0 which could appear after a scaling are also removed.
   * @returns this builder
   */
  optimize(): Builder {
    this.optimizeNode(this.chain)
    this.optimized = true
    return this
  }

  /**
   * Gets the built model.
   * @returns the model chain
   */
  build(): Chain {
    return this.chain
  }

  private static generateNGrams(text: string, n: number): string[][] {
    const result = new Array<string[]>()
    const allLetters = Array.from(text)
    if (text.length <= n) {
      result.push(allLetters)
    } else {
      for (let i = 0; i < allLetters.length - n + 1; i++) {
        result.push(allLetters.slice(i, i + n))
      }
    }
    return result
  }

  private incrementLink(key: string, tokens: string[], weight: number) {
    let current = this.chain[key] as Element
    if (undefined === current) {
      current = this.chain[key] = { [ChainKeys.ChildrenTotal]: 0 } as Element
    }
    for (let t of tokens) {
      this.incrementNode(current, t, weight)
      current = current[t] as Element
    }
  }

  private incrementNode(element: Element, token: string, weight: number) {
    if (undefined === element[token]) {
      element[token] = { [ChainKeys.Count]: weight, [ChainKeys.ChildrenTotal]: 0 } as Element
    } else {
      this.incrementValue(element[token] as Element, ChainKeys.Count, weight)
    }
    this.incrementValue(element, ChainKeys.ChildrenTotal, weight)
  }

  private incrementValue(element: Element, key: string, value: number): number {
    const existing = element[key] as number
    const updated = existing + value
    element[key] = updated
    return updated
  }

  private optimizeNode(element: Element) {
    for (let elemKey of ChainKeys.filterNonElementKeys(element)) {
      const childElement = element[elemKey]
      if (typeof childElement === 'number') {
        if (childElement === 0) {
          delete element[elemKey]
        }
        continue
      }
      const count = childElement[ChainKeys.Count]
      if (count === 0) {
        delete element[elemKey]
        continue
      }
      const total = childElement[ChainKeys.ChildrenTotal]
      if (total === 0) {
        element[elemKey] = count
      } else {
        this.optimizeNode(childElement)
      }
    }
  }

  private scaleNode(element: Element, maxCount: number) {
    const tot = element[ChainKeys.ChildrenTotal] as number
    if (tot < maxCount) {
      return
    }
    let scaledTotal = 0
    for (let elemKey of ChainKeys.filterNonElementKeys(element)) {
      const childElement = element[elemKey] as Element
      this.scaleNode(childElement, maxCount)
      if (undefined !== childElement[ChainKeys.Count]) {
        const scaledCount = Math.round(childElement[ChainKeys.Count] as number * maxCount / tot)
        childElement[ChainKeys.Count] = scaledCount
        scaledTotal += scaledCount
      }
    }
    if (scaledTotal !== 0) {
      element[ChainKeys.ChildrenTotal] = scaledTotal
    }
  }
}
