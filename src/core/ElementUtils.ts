import { ModelKeys } from './ModelKeys'
import { OptimizedElement } from './OptimizedElement'

/**
 * Utilities for working with {@link OptimizedElement}
 */
export class ElementUtils {
  /**
   * Returns a list of keys in the element except {@link Count} and {@link NGrams}.
   * @param element
   */
  static filterNonElementKeys(element: OptimizedElement): string[] {
    return Object.keys(element).filter(k => this.isNonElementKey(k))
  }

  /**
   * Returns sub-elements map nodes as a key-value array
   * @param element
   */
  static asKeyValueArray(element: OptimizedElement): {k: string, v: number}[] {
    return ElementUtils.filterNonElementKeys(element).map(k => ({k, v: this.extractValue(element, k) }))
  }

  /**
   * Sorts an array of key-values objects descending by value.
   * @param list
   */
  static sortByValueDescending(list: {k: string, v: number}[]) {
    return list.sort((a, b) => b.v - a.v)
  }

  private static isNonElementKey(k: string): boolean {
    return k !== ModelKeys.Count && k !== ModelKeys.NGrams
  }

  private static extractValue(element: OptimizedElement, key: string): number {
    let childElement = element[key]
    if (typeof childElement === 'number') {
      // the leaves are directly numbers
      return childElement
    } else {
      return childElement[ModelKeys.Count] as number
    }
  }
}
