/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-20 16:53:05
 * @LastEditTime: 2021-07-23 15:10:37
 */

export type ILicense = {
    aCount: number
    lic_expired: boolean
    lic_rmday: number
    lic_status: string
    nbegintime: string
    nendtime: string
    pcCount: number
    predate: boolean
    servid: string
};
export const state: ILicense = {
    aCount: 0,
    lic_expired: false,
    lic_rmday: 0,
    lic_status: "",
    nbegintime: "",
    nendtime: "",
    pcCount: 0,
    predate: false,
    servid: "",
};
