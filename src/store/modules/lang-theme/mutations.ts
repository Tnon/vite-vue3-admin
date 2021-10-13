/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-29 20:46:46
 */
import { ILangThemeState } from './state'
import { storage } from '@/utils/Storage'
import { THEME_COLOR, LOCAL_LANG } from "@/store/mutation-types";
import { CustomTheme } from '@/enums/language'
export const mutations = {
    SetLocalLang: (state: ILangThemeState, lang: string) => {
        storage.set(LOCAL_LANG, lang)
        state.language = lang
    },
    SetTheme: (state: ILangThemeState, color: CustomTheme) => {
        storage.set(THEME_COLOR, color)
        state.theme = color
    },
}