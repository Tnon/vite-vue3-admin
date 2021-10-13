<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-09-17 11:59:01
-->
<template>
  <div @click="jumpHostDetail" class="hostIp">
    <custom-icon :type="logoType" size="24" />
    <span class="ip">{{ ip }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { osLogoType } from '@/utils/tools'
export default defineComponent({
  props: {
    ip: String,
    host_id: String,
    os: String,
    online: Boolean
  },
  setup(props) {
    const router = useRouter()
    //logoType
    const logoType = ref<string>('')
    logoType.value = osLogoType(
      props.os === '1' ? 'WINDOWS' : props.os === '0' ? 'LINUX' : props.os,
      props.online
    )
    const jumpHostDetail = () => {
      router.push({ path: '/assets/host/detail', query: { id: props.host_id } })
    }
    return {
      jumpHostDetail,
      logoType
    }
  }
})
</script>

<style lang="less" scoped>
.hostIp {
  display: flex;
  align-items: center;
  cursor: pointer;
  .ip {
    transition: all 0.3s;
    margin-left: 4px;
  }
  &:hover {
    .ip {
      margin-left: 8px;
    }
  }
}
</style>
