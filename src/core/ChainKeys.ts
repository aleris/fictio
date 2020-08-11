import { Element } from './Element'

/**
 * Keys for chain model elements.
 */
export class ChainKeys {
  /**
   * key for n-grams used for generating the model
   */
  static readonly NGrams = 'nGrams'

  /**
   * key for parts of the tokens used to save number of parts (words separated by spaces) in each token
   */
  static readonly Parts = 'P'

  /**
   * key for lengths of words
   */
  static readonly Lengths = 'L'

  /**
   * key for start letters of words
   */
  static readonly StartLetters = 'S'

  /**
   * key for elements consisting of hierarchical chains of sub-elements up to the n-grams level
   */
  static readonly Elements = 'E'

  /**
   * key for element self count
   */
  static readonly Count = 'C'

  /**
   * key for element children total count
   */
  static readonly ChildrenTotal = 'T'

  /**
   * Returns a list of keys in the element except {@link ChildrenTotal}, {@link Count} and {@link NGrams}.
   * @param element
   */
  static filterNonElementKeys(element: Element): string[] {
    return Object.keys(element).filter(k => this.isNonElementKey(k))
  }

  private static isNonElementKey(k: string): boolean {
    return k !== ChainKeys.ChildrenTotal && k !== ChainKeys.Count && k !== ChainKeys.NGrams
  }
}
