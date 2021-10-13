/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-26 20:42:01
 * @LastEditTime: 2021-09-01 11:59:27
 */
import { reactive, unref, computed } from 'vue'
import store from '@/store'
import { isString } from '@/utils/is'
import { DisbKeys, TableRowSelection } from '../types'
const isSelectAll = computed(() => store.state['selectAll'].isSelectAll)
//获取取消选择的ids
const excludeHostIds: any = computed(() => store.state['selectAll'].exclude)
const state = reactive<TableRowSelection>({
    rowSelection: undefined
})
export const useRowSelection = (rowkey: string | ((record: any) => string), isCheck: boolean, disabledKeys: DisbKeys[]): any => {
    //先初始化 防止自己选完，再全选时候 重复存储
    store.commit('selectAll/InitExclude')
    store.commit('selectAll/setIselectAll', false)
    if (state.rowSelection && !isCheck) {
        state.rowSelection.selectedRowKeys = []
    }
    if (isCheck) {
        state.rowSelection = {
            selectedRowKeys: [],
            onChange: (selectedRowKeys) => {
                state.rowSelection!.selectedRowKeys = selectedRowKeys
            },
            onSelect: (record, selected) => {
                if (unref(isSelectAll)) {
                    let key = isString(rowkey) ? record[rowkey] : rowkey(record)
                    if (selected) {
                        store.commit('selectAll/DelExclude', key)
                    } else {
                        store.commit('selectAll/AddExclude', [key])
                    }
                }
            },
            onSelectAll: (selected, _, changeRows) => {
                if (unref(isSelectAll)) {
                    let hostIds: any;
                    if (isString(rowkey)) {
                        hostIds = changeRows.map(item => item[rowkey])
                    } else {
                        hostIds = changeRows.map(item => rowkey(item))
                    }
                    if (selected) {
                        hostIds.forEach(ele => {
                            store.commit('selectAll/DelExclude', ele)
                        })
                    } else {
                        store.commit('selectAll/AddExclude', hostIds)
                    }
                }

            },
            getCheckboxProps: (record): any => {
                const key = isString(rowkey) ? record[rowkey] : rowkey(record)
                // key: string
                // value: any
                let disabled: boolean = false
                disabledKeys.forEach(ele => {
                    if (record[ele.key] !== undefined && record[ele.key] === ele.value) {
                        disabled = true
                    }
                })
                if (unref(isSelectAll)) {
                    if (
                        unref(excludeHostIds).indexOf(key) < 0 && !disabled
                    ) {
                        state.rowSelection!.selectedRowKeys.push(
                            key
                        )
                    }
                }
                return { disabled }

            }
        }
    } else {
        state.rowSelection = undefined
    }

    return state.rowSelection
}

export const initRowSelection = () => {
    store.commit('selectAll/setIsCheck', false)
    store.commit('selectAll/setIselectAll', false)
    store.commit('selectAll/InitExclude')
    if (state.rowSelection) {
        state.rowSelection!.selectedRowKeys = []
    }
}