/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-28 13:51:14
 */
interface userInfo {
    id: number
    name: string
    email: string
    head_image: string
    telephone: string
    mobile: string
    roles: string
    last_logout_at: string
    created_at: string
    u_type: number
}
export interface loginResult {
    token: {
        token: string
    }
}
export type User_Info = Partial<userInfo>