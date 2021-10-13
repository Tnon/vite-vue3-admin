import { App } from 'vue'

import { globalModal } from '@/components/global-modal'
import customIcon from '@/components/custom-icon'

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
    app.component('globalModal', globalModal)
    app.component('customIcon', customIcon)
}
