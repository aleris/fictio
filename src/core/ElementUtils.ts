import { ModelKeys } from './ModelKeys'
import { OptimizedElement } from './OptimizedElement'

export class ElementUtils {
  /**
   * Returns a list of keys in the element except {@link Count} and {@link NGrams}.
   * @param element
   */
  static filterNonElementKeys(element: OptimizedElement): string[] {
    return Object.keys(element).filter(k => this.isNonElementKey(k))
  }

  private static isNonElementKey(k: string): boolean {
    return k !== ModelKeys.Count && k !== ModelKeys.NGrams
  }

  static asKeyValueList(element: OptimizedElement): {k: string, v: number}[] {
    return ElementUtils.filterNonElementKeys(element).map(k => ({k, v: this.extractValue(element, k) }))
  }

  static sortByValueDescending(flatList: {k: string, v: number}[]) {
    return flatList.sort((a, b) => b.v - a.v)
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
