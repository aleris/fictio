export const CHAIN_KEY_PARTS = 'parts'
export const CHAIN_KEY_LENGTHS = 'lengths'
export const CHAIN_KEY_START = 'start'
export const CHAIN_KEY_TOTALS = 'totals'

export type ChainElementMap = {[key: string]: number}

export interface Chain {
  [CHAIN_KEY_PARTS]: ChainElementMap
  [CHAIN_KEY_LENGTHS]: ChainElementMap
  [CHAIN_KEY_START]: ChainElementMap
  [CHAIN_KEY_TOTALS]: ChainElementMap
  [key: string]: ChainElementMap
}
