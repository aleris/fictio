import { Model } from './Model'
import { ElementNode } from './ElementNode'
import { ModelKeys } from '../core/ModelKeys'
import { OptimizedModel } from '../core/OptimizedModel'

export class ModelSizeOptimizer {
  /**
   * Produces a Javascript object optimized for file size on disk by only putting required keys and putting leaves
   * as numbers directly instead of objects like the intermediary nodes.
   * @param model the model to optimize
   * @param maxCount the maximum count on a node, if undefined keeps the count unchanged, otherwise it scales the counts
   * proportional with this value; 0 values that might result after this operation are removed
   * @returns a Javascript object optimized for file size
   */
  static optimize(model: Model, maxCount?: number): OptimizedModel {
    const result = { [ModelKeys.Count]: model.nGrams } as any
    model.count = model.childrenTotal = 1
    result[ModelKeys.NGrams] = model.nGrams
    ModelSizeOptimizer.optimizeElementNode(model, result, maxCount)
    delete result[ModelKeys.Count]
    this.removeCountKey(result, ModelKeys.Parts)
    this.removeCountKey(result, ModelKeys.Lengths)
    this.removeCountKey(result, ModelKeys.StartLetters)
    this.removeCountKey(result, ModelKeys.Elements)
    return result
  }

  private static optimizeElementNode(elementNode: ElementNode, target: any, maxCount?: number) {
    for (const child of elementNode.children) {
      const scaledCount = this.calculateScaledCount(elementNode, child, maxCount)
      if (scaledCount === 0) {
        continue
      }
      if (child.children.length === 0) {
        target[child.token] = scaledCount
      } else {
        if (scaledCount !== 0) {
          const sub = {[ModelKeys.Count]: scaledCount}
          target[child.token] = sub
          ModelSizeOptimizer.optimizeElementNode(child, sub, maxCount)
        }
      }
    }
  }

  private static calculateScaledCount(elementNode: ElementNode, child: ElementNode, maxCount?: number): number {
    let scaledCount
    if (undefined === maxCount) {
      scaledCount = child.count
    } else if (elementNode.children.length === 1) {
      scaledCount = 1
    } else if (elementNode.childrenTotal < maxCount) {
      scaledCount = child.count
    } else {
      scaledCount = Math.round((child.count * maxCount) / elementNode.childrenTotal)
    }
    return scaledCount
  }

  private static removeCountKey(element: any, key: string) {
    const atKey = element[key]
    if (undefined !== atKey) {
      delete atKey[ModelKeys.Count]
    }
  }
}
