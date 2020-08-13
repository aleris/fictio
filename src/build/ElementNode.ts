/**
 * An token element node in the Marcov chain.
 * Can be a a letter or a root token.
 */
export interface ElementNode {
  /**
   * The token (ex: 'a')
   */
  token: string | number

  /**
   * The number of occurrences in the train data.
   */
  count: number

  /**
   * The total number of counts in the children (future elements in the chain sequence)
   */
  childrenTotal: number

  /**
   * The list of  children elements (future elements in the chain sequence)
   */
  children: ElementNode[]
}
