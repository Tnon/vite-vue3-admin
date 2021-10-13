/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-09-16 09:49:04
 */
import { createStore, useStore as baseUseStore, Store } from 'vuex'
// import createPersistedState from 'vuex-persistedstate';
import { App, InjectionKey } from "vue";
import modules from "@/store/modules";
import { IStore } from './types'
export const key: InjectionKey<Store<IStore>> = Symbol()
// vux持久化可以加
// plugins.push(createPersistedState({ storage: window.sessionStorage }));
const store = createStore<IStore>({
    modules
})
export function useStore() {
    // return baseUseStore(key)
    return store
}

export function setupStore(app: App) {
    app.use(store, key)
}

export default store
