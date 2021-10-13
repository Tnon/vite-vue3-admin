/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2021-07-15 14:51:24
 */
import AssetsTree from './index.vue'
import { OptionEnum } from '@/enums/moveGroup'
// import store from '@/store'
// import { computed } from 'vue'
interface Tools {
    class: string
    title?: string
    key: OptionEnum
}
export const replaceFields = {
    children: 'items',
    title: 'name',
    key: 'id',
    value: 'name'
}
export const toolBars: Tools[] = [
    {
        //添加子分组
        class: 'toolnode',
        title: 'asset.addSubGrp',
        key: OptionEnum.ADD
    },
    {
        //移至其他分组
        class: 'toolnode',
        title: 'asset.moveOtherG',
        key: OptionEnum.MOVE
    },
    {
        class: 'toolline',
        key: OptionEnum.LINE
    },
    {
        //重命名
        class: 'toolnode',
        title: 'asset.reName',
        key: OptionEnum.RENAME
    },
    {
        //删除
        class: 'toolnode',
        title: 'common.delete',
        key: OptionEnum.DELETE
    }
]
export interface groupItem {
    name: string
    id: number
    value: string
    host_count: number
    items?: groupItem[],
}
// export const treeData = computed(() => store.getters['hostGroup/hostGroupGetr'])
export default AssetsTree
