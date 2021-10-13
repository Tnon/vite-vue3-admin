/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-15 14:23:51
 * @LastEditTime: 2021-07-15 15:06:15
 */
import store from '@/store'
import { computed } from 'vue'
export const useGroupTree = (type = 'custom') => {
    store.dispatch('hostGroup/getHostGroups')
    if (type === 'custom') {
        return computed(() => store.getters['hostGroup/hostGroupCuctomGetr'])
    }
    return computed(() => store.getters['hostGroup/hostGroupGetr'])
}