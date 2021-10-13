import { IGlobalModal } from './state'

export const mutations = {
    SetGlobalModal: (state: IGlobalModal, value: any) => {
        state.modalValue = value
    },
}