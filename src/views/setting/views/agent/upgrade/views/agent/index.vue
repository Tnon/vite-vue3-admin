<template>
  <transition name="zoom-fade" mode="out-in" appear>
    <div class="scrollContainer">
      <!-- 版本分布 start -->
      <version-dis :showDetail="showDetail" />
      <!-- 版本分布 end -->

      <!-- 版本管理 start -->
      <table-version />
      <!-- 版本管理 end -->
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import versionDis from './cmts/versionDis'
import tableVersion from './cmts/tableVersion'
export default defineComponent({
  components: {
    versionDis,
    tableVersion
  },
  props: {
    showDetail: Boolean
  }
})
</script>
<style lang="less" scoped>
.scrollContainer {
  height: calc(100vh - 257px);
  overflow: auto;
}
</style>
