<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-01 10:52:46
-->
<template>
  <transition name="zoom-fade" mode="out-in" appear>
    <div class="driverManage">
      <div class="header">
        <!-- 切换tab start -->
        <switch-tab :types="types" v-model:actived="actived" />
        <!-- 切换tab end -->
      </div>
      <!-- 表格 start -->
      <driver-table :actived="actived" />
      <!-- 表格 end -->
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ExportOutlined, FunnelPlotOutlined } from '@ant-design/icons-vue'
import driverTable from './driverTable'
import { switchTab } from '@/components/switchTab'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ExportOutlined,
    FunnelPlotOutlined,
    driverTable,
    switchTab
  },
  setup() {
    const { t } = useI18n()
    const actived = ref<string>('adapted')
    const types: Items[] = [
      {
        title: t('setting.adaSys'),
        type: 'adapted'
      },
      {
        title: t('setting.unAdaSys'),
        type: 'unAdapted'
      }
    ]
    return {
      types,
      actived,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.driverManage {
  margin-top: 16px;
  padding: 16px 24px 0 24px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.node {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 7px;
  cursor: pointer;
}
.actived {
  background: #e6e6e6;
  font-weight: 600;
  color: #000000;
}
</style>
