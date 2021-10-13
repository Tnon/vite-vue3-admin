/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-16 09:29:49
 * @LastEditTime: 2021-08-18 14:14:23
 */
import { createVNode } from 'vue'
import { globalModal } from '@/components/global-modal'
import store from '@/store'
export interface Option {
    title: string
    handleOk?: (...rest: any) => void,
    contentProps?: object,
    footer?: boolean
    subtitle?: string
    width?: number
    wrapClassName?: string
    maskClosable?: boolean
}
/**
 * @name: 通用的生成弹框的方法
 * @param {Option} options 接受的属性 
 * {
 *      title:弹框的标题
 *      handleOk：点击确定的回调函数
 *      contentProps：需要传给content的属性，单项传递，！！！在组件用modalValue定义 
 * 
 * }
 * @param {any} content 内容区域  组件
 */
export const useModal = (options: Option, content: any) => {
    const remove = () => {
        store.commit('globalModal/SetGlobalModal', null)
    }
    const instance = createVNode(globalModal, { remove, ...options, content })

    store.commit('globalModal/SetGlobalModal', instance)


    // let _instance: any = null
    // const container = document.createElement('div')
    // // 移除组件
    // const remove = () => {
    //     render(null, container)
    //     _instance = null
    //     container.remove()
    // }

    // _instance = createVNode(globalModal, { ...options, remove, content })
    // _instance.appContext = app._instance?.appContext
    // render(_instance, container)
}