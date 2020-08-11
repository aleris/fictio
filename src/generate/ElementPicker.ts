import { ChainKeys } from '../core/ChainKeys'
import { Element } from '../core/Element'

export class ElementPicker {
  static randomPick(element: Element): string {
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
      return childElement
    } else {
      return childElement[ChainKeys.Count] as number
    }
  }
}
