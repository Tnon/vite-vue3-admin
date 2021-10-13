<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-21 11:29:14
 * @LastEditTime: 2021-09-29 20:50:06
-->
<template>
  <div>
    <config-provider :locale="localLang === Language.EN ? enUS : zhCN">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
        <!-- 弹框统一组件 start -->
        <component :is="modelVisible" />
        <!-- 弹框统一组件 end -->
      </router-view>
    </config-provider>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  watchEffect,
  unref,
  ComputedRef
} from 'vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import { ConfigProvider } from 'ant-design-vue'
import { Language, CustomTheme } from '@/enums/language'
import store from '@/store'
export default defineComponent({
  components: { ConfigProvider },
  setup() {
    moment.locale(Language.ZH)
    //主题色
    const THEME: ComputedRef<CustomTheme> = computed(
      () => store.state.langTheme.theme
    )
    watchEffect(() => {
      const METHODS = unref(THEME) === CustomTheme.DARK ? 'add' : 'remove'
      document.getElementsByTagName('html')[0].classList[METHODS]('darkTheme')
    })
    //全局弹框
    const modelVisible = computed(() => store.state.globalModal.modalValue)
    //国际化
    const localLang = computed(() => store.state.langTheme.language)
    moment.locale(localLang.value)
    watch(localLang, (val) => {
      //国际化设置
      moment.locale(val)
    })

    return {
      enUS,
      zhCN,
      modelVisible,
      localLang,
      Language
    }
  }
})
</script>

<style lang="less">
@import 'styles/global.less';
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s ease-in;
}

.slide-up-enter-form,
.slide-up-leave-to {
  transform: translateY(-100%);
}
</style>
