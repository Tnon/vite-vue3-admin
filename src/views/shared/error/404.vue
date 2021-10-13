<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 18:41:08
-->
<template>
  <div class="page-container">
    <div>
      <h1>404</h1>
      <h1>{{ t('common.oops') }}</h1>
      <router-link to="/" class="ant-btn ant-btn-primary">
        {{ t('common.backHome') }}
      </router-link>
    </div>
    <img src="../../../assets/404.gif" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: '404',
  setup() {
    const { t } = useI18n()
    return {
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
