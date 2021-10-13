<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 18:43:46
-->
<template>
  <div class="page-container">
    <div>
      <h1>405</h1>
      <h1>{{ t('common.noPer405') }}</h1>
      <a-button type="link" @click="goBack">
        {{ t('common.backPrev') }}
      </a-button>
    </div>
    <img src="../../../assets/404.gif" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '405',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }
    return {
      t,
      goBack
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
