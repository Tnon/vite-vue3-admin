/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-09 17:28:47
 */
import controlInfo from './index.vue'
interface contrType {
    title: string,
    value: string
}
// type controlTypes = 'control' | 'time' | 'com' | 'telc'
type controlTypes = 'control' | 'telc'
export const useContrInfo = (t): Record<controlTypes, contrType> => {
    return {
        control: {
            title: t('setting.conMsg'),
            value: 'v3.0.1209'
        },
        // time: {
        //     title: '接入时间',
        //     value: '-'
        // },
        // com: {
        //     title: '授权客户',
        //     value: '-'
        // },
        telc: {
            title: t('setting.tecSerPro'),
            value: t('setting.anxinSec')
        }
    }
}
export { controlInfo }