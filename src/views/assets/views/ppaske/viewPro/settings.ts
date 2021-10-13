/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-08 11:00:58
 * @LastEditTime: 2021-09-30 15:37:14
 */
import api from '@/api/asset'
import { ASSETSTITLE, ASSETSNUMBER } from '@/enums/assetsType'
export const useOptions = (state: any, type: string, t: any): void => {

    state.columns = [
        {
            title: t('asset.' + ASSETSTITLE[`${type}_title`]),
            dataIndex: 'name',
        },
        {
            title: t('asset.hostNum'),
            dataIndex: 'host_count',
            slots: {
                customRender: 'host_count'
            }
        }
    ]
    state.placeholder = t('asset.pInput', [t('asset.' + ASSETSTITLE[`${type}_title`])])
    state.title = t('asset.' + ASSETSNUMBER[`${type}_number`])
    state.api = api['api_' + type]['getAssetView']
    state.type = type
}