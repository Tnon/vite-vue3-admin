/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-07-19 11:32:46
 */
export interface Type {
  title: string,
  type: string
}
export const types: Type[] = [
  {
    title: 'report.manage',
    type: 'manage'
  },
  {
    title: 'report.sub',
    type: 'sub'
  }
]