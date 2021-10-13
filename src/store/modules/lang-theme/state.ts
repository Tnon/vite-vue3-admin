/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-29 20:46:08
 */
import { createStorage } from '@/utils/Storage'
import { LOCAL_LANG, THEME_COLOR } from "@/store/mutation-types";
import { Language, CustomTheme } from '@/enums/language'
const Storage = createStorage({ storage: localStorage })
export type ILangThemeState = {
    language: string
    theme: CustomTheme
};
export const state: ILangThemeState = {
    language: Storage.get(LOCAL_LANG, Language.ZH),
    theme: Storage.get(THEME_COLOR, CustomTheme.LIGHT),
};