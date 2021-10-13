/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-08-18 18:32:11
 */
import { IUserState } from '@/store/modules/user/state';
import { ILangThemeState } from '@/store/modules/lang-theme';
import { IHostGroup } from '@/store/modules/host-group';
import { IExclude } from '@/store/modules/select-all';
import { ILicense } from '@/store/modules/license';
import { IGlobalModal } from '@/store/modules/globalModal';
import { IProductLogo } from '@/store/modules/product-logo'
export interface IStore {
    user: IUserState
    langTheme: ILangThemeState
    hostGroup: IHostGroup
    selectAll: IExclude
    license: ILicense
    globalModal: IGlobalModal
    productLogo: IProductLogo
}