<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-09-30 16:39:48
-->
<template>
  <div>
    <!-- 头部筛选 start -->
    <page-head
      v-model:value="name"
      :titleMsg="t('strategy.domain')"
      path="strategy-domain-detail"
      v-model:isCheck="isCheck"
      @refreshTable="refreshTable"
      :selected-record="selectedRecord"
      :policyType="1"
    />
    <!-- 头部筛选 end -->
    <slots-table
      :columns="columns"
      ref="tableRef"
      :arguments="state"
      :get-list-func="getDomainList"
      row-key="id"
      :isCheck="isCheck"
      class="domainTable"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, unref } from 'vue'
import { pageHead } from '../../components'
import { SlotsTable } from '@/components/slots-table'
import { useColumns } from './index'
import { getDomainList } from '@/api/strategy/domain'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsTable,
    pageHead
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    const tableRef = ref<any>('')
    const state = reactive<{
      name: string
    }>({
      name: ''
    })
    //批量管理
    const isCheck = ref<boolean>(false)
    const refreshTable = () => {
      tableRef.value.refreshTableData()
    }
    // 搜索框变化刷新表格
    function searchData(v, e) {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        refreshTable()
      }
      if (!value && !e) {
        refreshTable()
      }
    }
    //最终选择条数
    const selectedRecord = computed(() =>
      unref(tableRef).rowSelection
        ? unref(tableRef).rowSelection.selectedRowKeys
        : []
    )
    return {
      state,
      ...toRefs(state),
      columns,
      tableRef,
      getDomainList,
      searchData,
      isCheck,
      selectedRecord,
      refreshTable,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.domainTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 129px);
  }
}
</style>
