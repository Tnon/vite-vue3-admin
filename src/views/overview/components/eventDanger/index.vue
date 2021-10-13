<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-10 10:30:58
-->
<template>
  <a-row :gutter="16">
    <a-col span="15">
      <last-event class="box" />
    </a-col>
    <a-col span="9">
      <danger-top class="box" />
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Col, Row } from 'ant-design-vue'
import dangerTop from './cmts/danger'
import lastEvent from './cmts/event'
export default defineComponent({
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    lastEvent,
    dangerTop
  },
  setup() {}
})
</script>
<style lang="less" scoped>
.box {
  height: 400px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 16px;
}
</style>
