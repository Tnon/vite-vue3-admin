<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-14 20:42:01
 * @LastEditTime: 2021-08-10 15:04:57
-->
<template>
  <div class="boxconNt">
    <div class="header">
      <!-- 头部tab start -->
      <switchNodes :types="types" v-model:actived="fType" size="small" />
      <!-- 头部tab end -->
    </div>

    <!-- 内容 start -->
    <router-view v-slot="{ Component }">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- 内容 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import switchNodes from '@/components/switchNodes'
import { useRoute, useRouter } from 'vue-router'
import { types } from './type'
export default defineComponent({
  components: {
    switchNodes
  },
  setup() {
    const router = useRouter()
    const currentRoute = useRoute()
    const state = reactive<{
      fType: string
    }>({
      fType: currentRoute.meta.type as string
    })
    watch(
      () => state.fType,
      (v) => {
        router.push({ name: 'report-' + v })
      }
    )
    return {
      ...toRefs(state),
      types
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
}
</style>
