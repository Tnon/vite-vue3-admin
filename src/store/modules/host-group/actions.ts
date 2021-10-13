/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-15 11:23:43
 */
import { ActionContext } from 'vuex'
import { IHostGroup, ResponseType } from './state'
import { IStore } from '@/store/types'
import { getHostGroups } from '@/api/asset/host'
export const actions = {
    // 获取主机组 主机数量 未分组数量
    async getHostGroups({ commit }: ActionContext<IHostGroup, IStore>) {
        const GroupsAndCount: ResponseType = await getHostGroups();
        if (GroupsAndCount) {
            commit('SetHostGroup', GroupsAndCount)
            // return Promise.resolve(GroupsAndCount)
        }
        // return Promise.resolve('')
    }
}
