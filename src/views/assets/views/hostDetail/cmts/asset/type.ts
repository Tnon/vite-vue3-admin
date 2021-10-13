/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2021-10-12 17:44:29
 */
import { TableColumn } from '@/types/tableColumn'
export interface OthSta {
  actived: string
  columns: TableColumn[]
  placeHodler: string
  api: (...rest) => Promise<any>
}
export interface Agus {
  daterange: string
  name: string
  host_id: string
}
export interface Nodes {
  title?: string
  value: number | string
  columns: TableColumn[]
  place: string
  api: (...rest) => Promise<any>
}
export type Ftypes = 'process' | 'port' | 'account' | 'service' | 'kernel' | 'environment'
export type FilterColumns = Record<Ftypes, Nodes>