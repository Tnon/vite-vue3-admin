<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-23 10:34:19
 * @LastEditTime: 2021-10-12 18:37:43
-->
<template>
  <div class="box">
    <div class="bk_br_sd header">
      <div class="content">
        <switch-tab :types="types" v-model:actived="activedType" />
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, unref } from 'vue'
import { switchTab } from '@/components/switchTab'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    switchTab
  },
  setup() {
    const { t } = useI18n()
    const types: Items[] = [
      {
        title: t('setting.agtAndDlb'),
        type: 'agent'
      }
      // {
      //   title: '运行环境库',
      //   type: 'env'
      // },
      // {
      //   title: '行为库',
      //   type: 'behavior'
      // }
    ]
    const activedType = ref<string>('agent')
    const router = useRouter()
    watch(activedType, () => {
      router.push({
        name: 'adaptation-' + unref(activedType)
      })
    })
    return {
      types,
      activedType
    }
  }
})
</script>

<style lang="less" scoped>
.box {
  min-width: 1080px;
}
.header {
  height: 64px;
  .content {
    width: 1280px;
    line-height: 32px;
    padding: 16px 0;
    margin: 0 auto;
  }
}
</style>
