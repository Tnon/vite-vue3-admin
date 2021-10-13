/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-09-15 20:41:09
 */
import { App, computed, unref } from 'vue'
import { languagePkg } from '@/i18n'
import { createI18n, I18nOptions } from 'vue-i18n'
import { Language } from '@/enums/language'
import { storage } from '@/utils/Storage'
import { LOCAL_LANG } from "@/store/mutation-types";
type i18n = ReturnType<typeof createI18n>;
//获取语言
const localLang = computed(() => storage.get(LOCAL_LANG))
//配置项
const options: I18nOptions = {
    // legacy: false,
    locale: unref(localLang) || Language.ZH,
    fallbackLocale: Language.EN,
    messages: languagePkg,
}
//创建实例
export const i18nInstance: i18n = createI18n(options)

export function GlobalI18n(app: App) {
    app.use(i18nInstance)
}
//切换语言函数
export const toogleLang = (lang) => {
    i18nInstance.global.locale = lang
}
//非 setup的T
export const useI18n = () => {
    return i18nInstance.global.t
}