/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-08-09 21:11:34
 */
import { createStorage } from '@/utils/Storage'
import { ACCESS_TOKEN } from "@/store/mutation-types";
import type { User_Info } from './types'
const Storage = createStorage({ storage: localStorage })
export type IUserState = {
    token: string;
    user_info: User_Info;
    isLogin: boolean;
};

export const state: IUserState = {
    token: Storage.get(ACCESS_TOKEN, ''),
    user_info: {
        id: 0,
        name: '',
        email: '',
        head_image: '',
        telephone: '',
        mobile: '',
        roles: '',
        last_logout_at: '',
        created_at: '',
        u_type: 1
    },
    isLogin: false
};
