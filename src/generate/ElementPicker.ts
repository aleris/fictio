import { OptimizedElement } from '../core/OptimizedElement'
import { ElementUtils } from '../core/ElementUtils'

/**
 * Model element picker.
 */
export class ElementPicker {
  /**
   * Randomly picks a token for all sub-elements of the given element based on the probability of each sub-element.
   * @param element the element that has sub-elements from which to choose.
   * @returns the picked token
   */
  static randomPick(element: OptimizedElement): string {
    // The element contains counters not probabilities directly it uses the following algorithm:
    // 1. makes a list of key values pairs where the key is the token and the value is the counter
    // 2. sortByValueDescending the list in descending order of value (counter)
    // 3. pick a random index between o and total counts of all child counts
    // 4. iterate the list and add the count of each element until the sum is higher than the picked index
    const flatList = ElementUtils.asKeyValueArray(element)
    const totalCount = flatList.map(e => e.v).reduce((p, c) => p + c, 0)
    const listDescending = ElementUtils.sortByValueDescending(flatList)
    const pickIndex = Math.random() * totalCount
    let countAccumulator = 0
    for (let n of listDescending) {
      countAccumulator += n.v
      if (pickIndex < countAccumulator) {
        return n.k
      }
    }
    return listDescending[listDescending.length - 1].k
  }
}
