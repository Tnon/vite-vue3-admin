/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-15 18:25:28
 * @LastEditTime: 2021-09-15 21:45:34
 */
export const getLanguage = (language: 'zh_CN' | 'en_US'): { [key: string]: string } => {
    const languagePkg: { [key: string]: string } = {}
    const modules = language === 'zh_CN' ? import.meta.globEager('./lang/**/zh_CN.ts') : import.meta.globEager('./lang/**/en_US.ts')

    Object.keys(modules).forEach(ele => {
        const fileName = ele.split('/')[2]
        Object.assign(languagePkg, { [fileName]: modules[ele].default })
        // Object.assign(languagePkg, { ...modules[ele].default })
    })
    return languagePkg
}
