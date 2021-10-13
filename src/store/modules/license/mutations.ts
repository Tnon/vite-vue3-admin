import { ILicense } from './state'

export const mutations = {
    SetLicense: (state: ILicense, res: ILicense) => {
        // state.aCount = 0
        // state.lic_expired = false
        // state.lic_rmday = 0
        // state.lic_status = ""
        // state.nbegintime = ""
        // state.nendtime = ""
        // state.pcCount = 0
        // state.predate = false
        // state.servid = ""
        for (let k in state) {
            state[k] = res[k]
        }
    },
}