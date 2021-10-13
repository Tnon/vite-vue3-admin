<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 19:44:48
 * @LastEditTime: 2021-09-09 12:06:41
-->
<template>
  <div class="container">
    <!-- 搜索 start -->
    <a-input-search
      v-model:value.trim="os"
      :placeholder="t('setting.sysPlacTh')"
      class="search"
      @search="searchData"
      @change="searchData"
    />
    <!-- 搜索 end -->

    <!-- 系统类型 start -->
    <a-select
      v-model:value="osver"
      allowClear
      placeholder="系统类型"
      class="select"
    >
      <a-select-option value="1">Windows</a-select-option>
      <a-select-option value="0">Linux</a-select-option>
    </a-select>
    <!-- 系统类型 end -->

    <!-- 适配环境 start -->
    <a-select
      v-model:value="driver_version"
      placeholder="适配环境"
      class="select"
      allowClear
      v-show="actived == 'adapted'"
    >
      <!-- <a-select-option value="1">Windows</a-select-option>
      <a-select-option value="0">Linux</a-select-option> -->
    </a-select>
    <!-- 适配环境 end -->

    <!-- 表格 start -->
    <slots-table
      class="envTable"
      ref="tableRef"
      row-key="os"
      :arguments="agms"
      :getListFunc="api"
      :columns="columns"
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { tableData, StaType } from './settings'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    actived: String
  },
  components: {
    SlotsTable
  },
  setup(props: { actived: string }) {
    const { t } = useI18n()
    //表格
    const tableRef: any = ref<HTMLElement>()
    const state = reactive<StaType>({
      agms: {
        os: '',
        osver: undefined,
        driver_version: undefined
      },
      columns: tableData[props.actived].columns,
      api: tableData[props.actived].api
    })
    //init
    watch(
      () => props.actived,
      (v: string) => {
        state.agms.os = ''
        state.agms.osver = undefined
        state.agms.driver_version = undefined
        state.api = tableData[v].api
        state.columns = tableData[v].columns
      }
    )
    watch([() => state.agms.osver, () => state.agms.driver_version], () => {
      tableRef.value.refreshTableData()
    })
    // 搜索框变化刷新表格
    const searchData = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        tableRef.value.refreshTableData()
      }
      if (!value && !e) {
        tableRef.value.refreshTableData()
      }
    }
    return {
      ...toRefs(state.agms),
      ...toRefs(state),
      tableRef,
      searchData,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  margin-top: 24px;
  height: calc(100vh - 281px);
  overflow: auto;
  .search {
    width: 200px;
  }
  .select {
    width: 160px;
    margin-left: 8px;
  }
  .envTable {
    margin-top: 16px;
    ::v-deep(.ant-table-body) {
      height: calc(100vh - 386px);
    }
  }
}
</style>
