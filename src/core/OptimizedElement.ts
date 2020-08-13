/**
 * A hierarchical chain element for modeling Marcov chains used in {@link Chain}
 */
export interface OptimizedElement {
  /**
   * A sub-element of this element
   */
  [key: string]: OptimizedElement | number
}
