<template>
  <div class="driver">
    <!-- 头部 start -->
    <div class="header">
      <div>
        <switch-nodes
          v-model:actived="osver"
          :types="types"
          :style="{ padding: '4px 12px' }"
        />
        <!-- 驱动状态 start -->
        <a-select
          class="select"
          v-model:value="dri_state"
          allowClear
          :placeholder="t('setting.driStu')"
        >
          <a-select-option value="1">{{ t('setting.normal') }}</a-select-option>
          <a-select-option value="0">
            {{ t('setting.abnormal') }}
          </a-select-option>
        </a-select>
        <!-- 驱动状态 end -->
        <!-- Agent自检测状态 start -->
        <a-select
          class="select"
          v-model:value="dri_agent"
          allowClear
          :placeholder="t('setting.agtSDs')"
        >
          <a-select-option value="1">{{ t('setting.normal') }}</a-select-option>
          <a-select-option value="0">
            {{ t('setting.abnormal') }}
          </a-select-option>
        </a-select>
        <!-- Agent自检测状态 end -->
        <!-- 主机分组 start -->
        <select-tree
          class="select"
          :dataSource="treeData"
          v-model:selectedKeys="group_id"
          :placeholder="t('common.selectGroup')"
        />
        <!-- 主机分组 end -->
      </div>
      <div class="ritOp">
        <!-- 主机名ip start -->
        <a-input-search
          :placeholder="t('setting.ipOrAcc')"
          class="search"
          v-model:value.trim="searchValue"
          @search="searchData"
          @change="searchData"
        />
        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->
        <!-- 主机名ip end -->
        <ExportOutlined class="expIcon" @click="exportFile" />
      </div>
    </div>
    <!-- 头部 end -->
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      class="dataTable"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="getDriverListApi"
      :arguments="state"
      bordered
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import switchNodes from '@/components/switchNodes'
import { SlotsTable } from '@/components/slots-table'
import { types, useDriverData } from './index'
import { getDriverListApi } from '@/api/setting/agent'
import { ExportOutlined } from '@ant-design/icons-vue'
import { TableColumn } from '@/types/tableColumn'
import { useGroupTree } from '@/hooks'
import selectTree from '@/components/selectTree'
import { exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    switchNodes,
    ExportOutlined,
    SlotsTable,
    selectTree
  },
  setup() {
    const { t } = useI18n()
    const driverData = useDriverData(t)
    //调用dispath请求到新的组树
    const treeData = useGroupTree('all')
    //表格元素
    const tableRef = ref<any>(null)
    //条件结构体
    const state = reactive<{
      group_id: number
      osver: string
      dri_state: string | undefined
      dri_agent: string | undefined
      searchValue: string
    }>({
      group_id: -1,
      osver: '1',
      dri_state: undefined,
      dri_agent: undefined,
      searchValue: ''
    })
    //列和接口响应式
    const othState = reactive<{
      columns: TableColumn[]
    }>({
      columns: driverData[state.osver].columns
    })
    //刷新表格
    const refreshTable = () => {
      tableRef.value.refreshTableData()
    }
    // 搜索框变化刷新表格
    const searchData = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        refreshTable()
      }
      if (!value && !e) {
        refreshTable()
      }
    }
    //系统切换，更换列
    watch(
      () => state.osver,
      (v: string) => {
        othState.columns = driverData[v].columns
      }
    )
    //条件更换 刷新表格
    watch(
      [
        () => state.osver,
        () => state.dri_state,
        () => state.dri_agent,
        () => state.group_id
      ],
      () => {
        refreshTable()
      }
    )
    //导出
    const exportFile = () => {
      exportExcel('/api/export/drivermod', { filter: state })
    }
    return {
      types,
      ...toRefs(state),
      ...toRefs(othState),
      state,
      tableRef,
      driverData,
      searchData,
      refreshTable,
      treeData,
      getDriverListApi,
      exportFile,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.driver {
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-left: 16px;
  height: 100%;
  .header {
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    ::v-deep(.select) {
      width: 160px;
      margin-left: 10px;
      display: inline-block;
    }
    .search {
      width: 240px;
      border-radius: 8px;
    }
  }
}
.ritOp {
  display: flex;
  align-items: center;
  .expIcon {
    cursor: pointer;
  }
  .line {
    width: 1px;
    height: 24px;
    background: #eeeeee;
    margin: 0 16px;
  }
}

.dataTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 158px);
  }
}
</style>
