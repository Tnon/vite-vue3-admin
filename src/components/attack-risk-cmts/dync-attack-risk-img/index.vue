<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-18 20:07:36
 * @LastEditTime: 2021-09-02 11:36:46
-->
<template>
  <div class="ImgCon" :class="[size === 'large' ? 'large' : 'small']">
    <template v-if="imgType === 'attack'">
      <template v-if="danger">
        <svg-icon class="content" name="ax-attck-rad" />
        <svg-icon class="cycle" name="ax-cycle-rad" />
      </template>
      <template v-else>
        <svg-icon class="content" name="ax-attck-green" />
        <svg-icon class="cycle" name="ax-cycle-green" />
      </template>
    </template>
    <template v-else-if="imgType === 'risk'">
      <template v-if="danger">
        <svg-icon class="content" name="ax-risk-orange" />
        <svg-icon class="cycle" name="ax-cycle-orange" />
      </template>
      <template v-else>
        <svg-icon class="content" name="ax-risk-green" />
        <svg-icon class="cycle" name="/ax-cycle-green" />
      </template>
    </template>
    <template v-else>
      <svg-icon class="content" name="ax-operation-green" />
      <svg-icon class="cycle" name="ax-cycle-green" />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import svgIcon from '@/components/svg-icon/index.vue'
export default defineComponent({
  props: {
    imgType: String,
    danger: Boolean,
    size: {
      type: String,
      default: 'large'
    }
  },
  components: {
    svgIcon
  }
})
</script>
<style lang="less" scoped>
.large {
  margin-right: 16px;
  width: 48px;
  height: 48px;
  .content {
    width: 44px;
    height: 44px;
  }
}
.small {
  margin-right: 10px;
  width: 32px;
  height: 32px;
  .content {
    width: 28px;
    height: 28px;
  }
}
.ImgCon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .cycle {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    animation: rotate 2s linear infinite;
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
