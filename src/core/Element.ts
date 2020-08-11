/**
 * A hierarchical chain element for modeling Marcov chains used in {@link Chain}
 */
export interface Element {
  /**
   * A sub-element of this element
   */
  [key: string]: Element | number
}
