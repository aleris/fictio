import { ChainKeys } from '../core/ChainKeys'
import { Element } from '../core/Element'

/**
 * Chain element picker.
 */
export class ElementPicker {
  /**
   * Randomly picks a token for all sub-elements of the given element based on the probability of each sub-element.
   * @param element the element that has sub-elements from which to choose.
   * @returns the picked token
   */
  static randomPick(element: Element): string {
    // The element contains counters not probabilities directly it uses the following algorithm:
    // 1. makes a list of key values pairs where the key is the token and the value is the counter
    // 2. sort the list in descending order of value (counter)
    // 3. pick a random index between o and total counts of all child counts
    // 4. iterate the list and add the count of each element until the sum is higher than the picked index
    const t = element[ChainKeys.ChildrenTotal] as number
    const l = this.sort(this.flatten(element))
    const i = Math.random() * t
    let a = 0
    for (let n of l) {
      a += n.v
      if (i < a) {
        return n.k
      }
    }
    return l[l.length - 1].k
  }

  private static sort(flatList: {k: string, v: number}[]) {
    return flatList.sort((a, b) => b.v - a.v)
  }

  private static flatten(element: Element): {k: string, v: number}[] {
    return ChainKeys.filterNonElementKeys(element).map(k => ({k, v: this.value(element, k) }))
  }

  private static value(element: Element, key: string): number {
    let childElement = element[key]
    if (typeof childElement === 'number') {
      // the leafs contains directly numbers
      return childElement
    } else {
      return childElement[ChainKeys.Count] as number
    }
  }
}
