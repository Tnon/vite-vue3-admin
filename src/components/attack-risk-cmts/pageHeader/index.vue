<template>
  <div class="header">
    <slot name="title"></slot>
    <div class="righOp">
      <!-- 搜索 start -->
      <slot name="search"></slot>
      <!-- 搜索 end -->

      <!-- 批量标记 start -->
      <slot name="mark"></slot>
      <!-- 批量标记 end -->

      <!-- 高级筛选 start -->
      <advanSearch :modelType="modelType" @confirm="confirmBtn" />
      <!-- 高级筛选 end -->

      <!-- 导出 start -->
      <div class="line"></div>
      <slot name="export"></slot>
      <!-- 导出 end -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import advanSearch from '../advanSearch/index.vue'
export default defineComponent({
  props: {
    modelType: Number
  },
  components: {
    advanSearch
  },
  setup(_, { emit }) {
    const confirmBtn = (v) => {
      emit('confirm', v)
    }

    return {
      confirmBtn
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .righOp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .line {
      width: 1px;
      height: 16px;
      background: #e1e1e1;
      margin: 0 8px;
    }
    .filter {
      width: 78px;
      margin: 0 8px;
      cursor: pointer;
    }
  }
}
</style>
