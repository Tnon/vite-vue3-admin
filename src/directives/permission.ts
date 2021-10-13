/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-23 10:47:49
 */
import { ObjectDirective } from 'vue'
import { hasPermission } from '@/utils/permission/hasPermission'
import { storage } from '@/utils/Storage'
export const permission: ObjectDirective = {
    mounted(el: HTMLButtonElement, binding, vnode) {
        if (binding.value == undefined) return;
        //roles为角色的类型[]，action为采取的措施""
        const { effect, action } = binding.value
        // 如果action不传，则认为不需要授权认证
        if (effect == undefined) {
            return
        }
        //获取当前用户的角色类型
        const isEnable = 'admin'

        if (effect.indexOf(isEnable) < 0) {
            if (action == 'disabled') {
                el.disabled = true
                el.setAttribute('title', '该角色没有权限啦！')
            } else {
                el.remove()
            }
        }
        // console.log(vnode.ref.i.ctx.hasPermission(action), '虚拟')
        // if (!hasPermission(action)) {
        //     if (effect == 'disabled') {
        //         el.disabled = true
        //         el.setAttribute('title', '没有权限')
        //     } else {
        //         el.remove()
        //     }
        // }

    }
}
