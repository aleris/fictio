import * as fs from 'fs'

/**
 * Loads tokens data from files.
 */
export class DataFileLoader {
  /**
   * Loads a list of tokens from the specified file in the 'data' folder inside the project.
   * The file consists of lines, each line is a token that can consist of multiple words.
   * Lines that begin with # or that are blank are ignored.
   * @param fileName the file name including extension to load
   * @returns an array of strings
   */
  load(fileName: string): string[] {
    return fs.readFileSync(`./data/${fileName}`)
      .toString()
      .split('\n')
      .filter(line => !this.isBlankLine(line) && !this.isCommentLine(line))
  }

  private isBlankLine(s: string) {
    return s === '' || /\s+/.test(s)
  }

  private isCommentLine(s: string) {
    return s.startsWith('#')
  }
}
