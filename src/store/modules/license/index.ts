import { state } from './state';
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
export type { ILicense } from './state'
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
