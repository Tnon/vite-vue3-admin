<template>
  <div class="driverManage">
    <div class="header">
      <!-- 切换tab start -->
      <switch-tab :types="types" v-model:actived="actived" />
      <!-- 切换tab end -->

      <div class="rOption">
        <!-- 批量升级 start -->
        <!--   -->
        <a-button type="link" v-if="actived === 'adapted'">
          <template #icon>
            <FunnelPlotOutlined />
          </template>
          批量升级
        </a-button>
        <!-- 批量升级 end -->
        <div class="line" v-if="actived === 'adapted'"></div>
        <!-- 导出 start -->
        <ExportOutlined class="RIcon" />
        <!-- 导出 end -->
      </div>
    </div>

    <!-- 表格 start -->
    <driver-table :actived="actived" />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ExportOutlined, FunnelPlotOutlined } from '@ant-design/icons-vue'
import driverTable from './driverTable'
import { switchTab } from '@/components/switchTab'
export default defineComponent({
  components: {
    ExportOutlined,
    FunnelPlotOutlined,
    driverTable,
    switchTab
  },
  setup() {
    const actived = ref<string>('adapted')
    const types: Items[] = [
      {
        title: '已适配环境(111)',
        type: 'adapted'
      },
      {
        title: '未适配环境(123)',
        type: 'unAdapted'
      }
    ]
    return {
      types,
      actived
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
.rOption {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 16px;
  .line {
    width: 1px;
    height: 24px;
    background: #eeeeee;
    margin: 0 8px 0 16px;
  }
  .batchIcon {
    padding: 8px;
    cursor: pointer;
  }
  .RIcon {
    padding: 8px;
  }
}
</style>
