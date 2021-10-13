import { state } from './state';
import { mutations } from './mutations'
export type { IGlobalModal } from './state'
export default {
    namespaced: true,
    state,
    mutations,
};
