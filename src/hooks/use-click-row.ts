/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-23 19:41:54
 * @LastEditTime: 2021-09-28 09:51:16
 */
import { createVNode } from 'vue'
import store from '@/store'
import HookDraw from '@/components/attrisk-draw'
import type { TableProps } from 'ant-design-vue/lib/table/interface'
import { useI18n } from '@/plugins/setupGlobalLocalLang'
interface RowOptions {
    reload: () => void
    modelType: number
}

/**
 * 表格行单击
 * @param fn 单击的方法
 * @returns customRow 行属性方法
 */
export function useClickRow(content: any, options: RowOptions): TableProps['customRow'] {
    const T = useI18n()
    const customRow = (record) => {
        return {
            onclick(e) {
                e.target.tagName.toUpperCase() === 'TD' && useCreatDraw({
                    title: options.modelType === 1 ? T('attack.detailTitle') : T('risk.detailTitle'),
                    contentProps: { ...options, record },

                }, content)
            }
        };
    };
    return customRow
}


/**
 * 侧边抽屉
 * @param record 行数据
 * @param options 自定义属性 可选
 * @returns void
 */
interface Options {
    title?: string
    contentProps: any
}
const useCreatDraw = (options: Options, content: any): void => {
    const remove = () => {
        store.commit('globalModal/SetGlobalModal', null)
    }
    const instance = createVNode(HookDraw, { ...options, remove, content })
    store.commit('globalModal/SetGlobalModal', instance)
}
export default useCreatDraw
