import { Element } from './Element'

/**
 * Model data structure for the Markov chain.
 */
export interface Chain extends Element {
  /**
   * n-grams used for generating this model
   */
  nGrams: number
}
