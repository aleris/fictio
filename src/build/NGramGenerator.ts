export class NGramGenerator {
  static generate(text: string, n: number): string[][] {
    const result = new Array<string[]>()
    const allLetters = Array.from(text)
    if (text.length <= n) {
      result.push(allLetters)
    } else {
      for (let i = 0; i < allLetters.length - n + 1; i++) {
        result.push(allLetters.slice(i, i + n))
      }
    }
    return result
  }
}
