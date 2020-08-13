import { ElementNode } from './ElementNode'

/**
 * Model data structure for the Markov chain.
 */
export interface Model extends ElementNode {
  /**
   * n-grams used for generating this model
   */
  nGrams: number
}
