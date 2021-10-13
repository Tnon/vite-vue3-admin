/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 19:44:48
 * @LastEditTime: 2021-10-12 18:25:06
 */

import tableVersion from './index.vue'
export const useUpgradeStatus = (t) => [
    {
        "key": '0',
        "value": t('setting.lastVer')
    },
    {
        "key": '1',
        "value": t('setting.Upgradeable')
    },
    {
        "key": '2',
        "value": t('setting.toUpgd')
    },
    {
        "key": '3',
        "value": t('setting.Upgrading')
    },
    {
        "key": '4',
        "value": t('setting.upgraFail')
    }
]
export default tableVersion