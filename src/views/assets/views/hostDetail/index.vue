<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-23 16:22:13
-->
<template>
  <div>
    <!-- 头部区域 start -->
    <detail-header
      :id="id"
      v-model:host_ip="host_ip"
      @refreshContent="refresh"
    />
    <!-- 头部区域  end -->

    <!-- 内容区域 start -->
    <router-view v-slot="{ Component }" v-if="toogleShow">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="Component" :id="id" :host_ip="host_ip" />
      </transition>
    </router-view>
    <!-- 内容区域 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import detailHeader from './cmts/head'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    detailHeader
  },
  setup() {
    const host_ip = ref<string>('')
    const route = useRoute()
    const id = route.query.id ?? ''
    const toogleShow = ref<boolean>(true)
    const refresh = () => {
      toogleShow.value = false
      nextTick(() => {
        toogleShow.value = true
      })
    }

    return {
      id,
      host_ip,
      refresh,
      toogleShow
    }
  }
})
</script>
