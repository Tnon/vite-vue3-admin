/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-22 10:20:43
 */
import { App } from 'vue'

import { permission } from "@/directives/permission";
import { autofocus } from "@/directives/autofocus";

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
    // 权限控制指令（演示）
    app.directive('permission', permission)
    //自动聚焦
    app.directive('focus', autofocus)
}
