/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-12 11:41:12
 */
import { ILicense } from './state';
import { AUTHSTATUS, AUTHDAYSSTATUS } from '@/enums/authStatus';
import { datedifference } from '@/utils/tools'
const dateFormat = (value) => value.slice(0, 4) + "." + value.slice(4, 6) + "." + value.slice(6)
export const getters = {
    //授权状态
    authStatus: (state: ILicense) => {
        let status = '',
            flag = ''
        if (state.lic_status === 'valid') {
            //未生效
            if (state.predate) {
                status = AUTHSTATUS.Notinforce
                flag = 'Notinforce'
            }
            //已过期
            else if (state.lic_expired) {
                status = AUTHSTATUS.Expired
                flag = 'Expired'
            }
            //已授权
            else {
                status = AUTHSTATUS.Authorized
                flag = 'Authorized'
            }
        } else {
            //未授权
            status = AUTHSTATUS.Unauthorized
            flag = 'Unauthorized'
        }
        return { status, flag }

    },
    //授权终端数量
    authNum: (state: ILicense) => state.pcCount ?? 0,
    //授权终端剩余数量
    numbSurplus: (state: ILicense) => (state.pcCount - state.aCount) || 0,
    //授权期限
    authDays: (state: ILicense) => {
        let numberdays: number = datedifference(state.nbegintime, state.nendtime);
        if (numberdays > 36000) {
            return AUTHDAYSSTATUS.Forever
        }
        return numberdays
    },
    //授权剩余期限/授权时间段
    daysSurplus: (state: ILicense) => {
        if (state.lic_expired) {
            return AUTHSTATUS.Expired
        }
        if (state.lic_status === "invalid") {
            return AUTHSTATUS.Unauthorized
        }
        // return state.lic_rmday ?? 0 + '天'
        return '(' + dateFormat(state.nbegintime) + '-' + dateFormat(state.nendtime) + ')'
    },
};
