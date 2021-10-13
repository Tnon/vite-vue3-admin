/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-08-19 14:24:59
 */
export interface InjectCfg {
    modname: string
    modparams: any
    modcfgid?: number
    flag?: boolean
}
export interface AddDomainPara {
    name: string
    desc: string,
    id?: string,
    object: {
        switch: number
        ip_json: string[]
        switch_acc: number
        ip_json_acc: string[]
        id?: number
    }
}
export interface Md5Sha1FormModal {
    md5: string
    methods: string
    name: string
    osver: string
    remark: string
    sha1: string
    type: string
}
