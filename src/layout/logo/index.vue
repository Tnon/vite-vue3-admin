<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-23 11:31:13
-->
<template>
  <div class="logo">
    <img :src="logoUrl" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from '@/store'
import { systemConfig } from '@/api/system'
export default defineComponent({
  name: 'index',
  setup() {
    const logoUrl = computed(() => store.state.productLogo.logoUrl)
    const getProLogo = async () => {
      const { centerlogo, product_version } = await systemConfig()
      store.commit('productLogo/SetProductLogo', centerlogo)
      store.commit('productLogo/SetProductVersion', product_version)
    }
    getProLogo()
    return { logoUrl }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  line-height: 76px;
  overflow: hidden;
  white-space: nowrap;
  img {
    height: 48px;
    width: 48px;
  }

  .title {
    color: white;
    margin-bottom: 0;
  }
}
</style>
