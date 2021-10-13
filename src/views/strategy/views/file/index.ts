/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-30 09:35:17
 * @LastEditTime: 2021-09-30 19:32:31
 */
import cmt_md5 from './src/md5sha1/index.vue'
import cmt_sign from './src/signature/index.vue'
export { cmt_md5, cmt_sign }
export const types: Items[] = [
  {
    title: 'common.blackList',
    type: 1
  },
  {
    title: 'common.whiteList',
    type: 0
  }
]
export const cmytypes: Items[] = [
  {
    title: 'strategy.md5Sha1',
    type: 'cmt_md5'
  },
  {
    title: 'asset.digiSign',
    type: 'cmt_sign'
  }
]

