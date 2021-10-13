<template>
  <div class="container">
    <!-- 导出 start -->
    <ExportOutlined @click="exportFile" class="exportIc" />
    <!-- 导出 end -->
    <!-- 左侧筛选 start -->
    <Filter v-model:daterange="date_range">
      <template #search>
        <div class="filter">
          <span class="title">{{ t('log.hostIp') }}</span>
          <a-input-search
            :placeholder="t('log.hostIp')"
            @search="onSearch"
            @change="onSearch"
            v-model:value.trim="search_value"
          />
        </div>
      </template>

      <template #othFilter>
        <div class="filter">
          <span class="title">{{ t('log.event') }}</span>
          <a-cascader
            style="display: block"
            :placeholder="t('log.pIptEvent')"
            v-model:value="mod"
            :options="options"
          />
        </div>
      </template>
    </Filter>
    <!-- 左侧筛选 end -->
    <!-- 右侧表格 start -->
    <slots-table
      class="behTable"
      ref="tableRef"
      :columns="columns"
      row-key="name"
      :arguments="state"
      :get-list-func="getEveLogList"
    />
    <!-- 右侧表格 ebd -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import Filter from '../../components/filter.vue'
import { SlotsTable } from '@/components/slots-table'
import { useColumns, Option } from './index'
import { Cascader } from 'ant-design-vue'
import { ExportOutlined } from '@ant-design/icons-vue'
import { getEveOptions, getEveLogList } from '@/api/log'
import { exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    Filter,
    SlotsTable,
    [Cascader.name]: Cascader,
    ExportOutlined
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    const tableRef: any = ref<HTMLElement>()
    //级联选择
    const optionState = reactive<{
      options: Option[]
    }>({
      options: []
    })
    //表格数据体
    const state = reactive<{
      date_range: string
      search_value: string
      mod: string[] | undefined
    }>({
      date_range: '',
      mod: [],
      search_value: ''
    })
    //条件更换 刷新表格
    watch(
      () => [state.date_range, state.mod],
      () => {
        tableRef.value.refreshTableData()
      }
    )
    // 搜索框变化刷新表格
    const onSearch = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        tableRef.value.refreshTableData()
      }
      if (!value && !e) {
        tableRef.value.refreshTableData()
      }
    }
    //获取所有事件
    const getOptions = async () => {
      const res = await getEveOptions()
      optionState.options = res
    }
    getOptions()

    //导出
    const exportFile = () => {
      const filter = {}
      if (state.mod?.length) {
        Object.assign(filter, state, { mod: state.mod[state.mod.length - 1] })
      }
      exportExcel('/api/export/event', { filter })
    }
    return {
      ...toRefs(state),
      ...toRefs(optionState),
      state,
      columns,
      tableRef,
      getEveLogList,
      onSearch,
      exportFile,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  display: flex;
  height: calc(100vh - 64px);
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px 8px 0px 0px;
  position: relative;
  .exportIc {
    position: absolute;
    top: -30px;
    right: 0;
  }
  .behTable {
    flex: 1;
    ::v-deep(.ant-table-body) {
      height: calc(100vh - 125px);
    }
  }
  .filter {
    margin: 16px 0;
    .title {
      display: inline-block;
      margin-bottom: 8px;
    }
  }
}
</style>
