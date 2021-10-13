/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-30 19:02:58
 */
import ruleCard from './ruleCard.vue'
export interface CardRuls {
    title: string,
    subTitle?: string
    key: string
    areaPlace: string
    groups: {
        key: string,
        children: { title: string, value: number }[]
    }
}
export const getRuls = (t: any): CardRuls[] => [
    {
        title: t('strategy.domIpMsg'),
        subTitle: t('strategy.up1000Ip'),
        key: 'ip',
        areaPlace: t('strategy.addIpPlac'),
        groups: {
            key: 'ip',
            children: [
                {
                    title: t('strategy.noIpCa'),
                    value: 2
                },
                {
                    title: t('strategy.allowSome'),
                    value: 1
                }
            ]
        }
    },
    {
        title: t('strategy.domAccVali'),
        key: 'account',
        areaPlace: t('strategy.addDomPlac'),
        groups: {
            key: 'account',
            children: [
                {
                    title: t('strategy.noDomCa'),
                    value: 2
                },
                {
                    title: t('strategy.noSomeDot'),
                    value: 1
                }
            ]
        }
    }
]
export { ruleCard }