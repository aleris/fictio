import { ModelKeys } from '../core/ModelKeys'
import { Model } from './Model'
import { ElementNode } from './ElementNode'
import { NGramGenerator } from './NGramGenerator'

/**
 * Markov chain model builder for name generation.
 */
export class Builder {
  private readonly model: Model
  private readonly trainData: { tokens: string[], weight: number }[] = []

  /**
   * Creates a new model builder.
   * @param nGrams number of grams to use for source tokens train data.
   */
  constructor(nGrams: number) {
    this.model = {
      nGrams,
      token: 'root',
      count: 1,
      childrenTotal: 0,
      children: []
    }
  }

  /**
   * Updates the model from a list of tokens.
   * @param tokens a list of training strings.
   * @param weight weight with which to multiply each occurrence of a letter in the model, defaults to 1.
   * @returns this builder
   */
  from(tokens: string[], weight = 1): Builder {
    this.trainData.push({tokens, weight})
    return this
  }

  /**
   * Gets the build model
   */
  build() {
    for (const source of this.trainData) {
      for (let name of source.tokens) {
        const parts = name.split(/\s+/g)
        this.incrementLink(ModelKeys.Parts, [parts.length], source.weight)

        for (let namePart of parts) {
          this.incrementLink(ModelKeys.Lengths, [namePart.length], source.weight)

          const lowercaseNamePart = namePart.toLowerCase()
          const startCharacter = lowercaseNamePart.substr(0, 1)
          this.incrementLink(ModelKeys.StartLetters, [startCharacter], source.weight)

          for (let gram of NGramGenerator.generate(lowercaseNamePart, this.model.nGrams)) {
            this.incrementLink(ModelKeys.Elements, gram, source.weight)
          }
        }
      }
    }
    return this.model
  }

  private incrementLink(key: string, tokens: (string | number)[], weight: number) {
    let element = this.incrementCount(this.model, key, weight)
    for (let t of tokens) {
      element = this.incrementCount(element, t, weight)
    }
  }

  private incrementCount(element: ElementNode, token: string | number, weight: number): ElementNode {
    let childElement = element.children.find(c => c.token == token)
    if (undefined === childElement) {
      childElement = {
        token,
        count: 0,
        childrenTotal: 0,
        children: []
      }
      element.children.push(childElement)
    }
    childElement.count += weight
    element.childrenTotal += weight
    return childElement
  }
}
