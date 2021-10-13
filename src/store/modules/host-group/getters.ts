/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-14 10:25:09
 * @LastEditTime: 2021-07-15 14:10:39
 */
import { IHostGroup } from './state';

export const getters = {
    hostGroupGetr: (state: IHostGroup) => state.hostGroup.groups,
    hostGroupCuctomGetr: (state: IHostGroup) => state.hostGroup.groups.slice(1),
    hostCountGetr: (state: IHostGroup) => state.hostGroup.total,
};
