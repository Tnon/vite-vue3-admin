/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-10-12 17:27:48
 */

import { message as Message } from "ant-design-vue";
import { Logout } from '@/utils/tools'
import { useI18n } from '@/plugins/setupGlobalLocalLang';
const T = useI18n()
const error = Message.error!;
export function checkStatus(status: number, msg: string): void {
    error(msg || T('common.serverError'));
    switch (status) {
        //授权到期/异地登录
        case 40001:
            Logout()
            break;
        default:
            break;
    }
}
