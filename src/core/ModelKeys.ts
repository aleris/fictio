/**
 * Keys for model.
 * The value of the key is 1-letter for the size optimized model.
 */
export enum ModelKeys {
  /**
   * key for n-grams used for generating the model
   */
  NGrams = 'N',

  /**
   * key for parts of the tokens used to save number of parts (words separated by spaces) in each token
   */
  Parts = 'P',

  /**
   * key for lengths of words
   */
  Lengths = 'L',

  /**
   * key for start letters of words
   */
  StartLetters = 'S',

  /**
   * key for elements consisting of hierarchical chains of sub-elements up to the n-grams level
   */
  Elements = 'E',

  /**
   * key for element self count
   */
  Count = 'C'
}
