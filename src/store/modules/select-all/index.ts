import { state } from './state';
import { mutations } from './mutations'
export type { IExclude } from './state'
export default {
    namespaced: true,
    state,
    mutations,
};
