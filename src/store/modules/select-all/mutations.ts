import { IExclude } from './state'
export const mutations = {
    AddExclude: (state: IExclude, hostIds: string[]) => {
        state.exclude = state.exclude.concat(hostIds)
    },
    DelExclude: (state: IExclude, hostId: string) => {
        state.exclude.splice(state.exclude.findIndex(item => item === hostId), 1)
    },
    InitExclude: (state: IExclude) => {
        state.exclude = []
    },
    setIselectAll: (state: IExclude, type: boolean) => {
        state.isSelectAll = type
    },
    setIsCheck: (state: IExclude, type: boolean) => {
        state.isCheck = type
    }
}