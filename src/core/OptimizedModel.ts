import { OptimizedElement } from './OptimizedElement'
import { ModelKeys } from './ModelKeys'

/**
 * Model data structure for the Markov chain.
 */
export interface OptimizedModel extends OptimizedElement {
  /**
   * n-grams used for generating this model
   */
  [ModelKeys.NGrams]: number
}
