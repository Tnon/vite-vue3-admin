interface option {
  rate: string,
  ratePercent: string,
  size: string,
  num: string
}
type types = 'cpu' | 'memory' | 'disk'
export type allRate = Record<types, option>