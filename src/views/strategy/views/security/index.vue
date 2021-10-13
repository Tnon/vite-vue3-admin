<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-09-30 16:25:58
-->
<template>
  <div>
    <!-- 头部筛选 start -->
    <page-head
      v-model:value="name"
      path="strategy-security-detail"
      :titleMsg="t('strategy.security')"
      v-model:isCheck="isCheck"
      @refreshTable="refreshTable"
      :selected-record="selectedRecord"
      :policyType="0"
    />
    <!-- 头部筛选 end -->
    <slots-table
      :columns="columns"
      ref="tableRef"
      :arguments="state"
      :get-list-func="getSercuityList"
      row-key="id"
      :isCheck="isCheck"
      :allowCheckAll="false"
      class="securityTable"
      :disabledKeys="[{ key: 'id', value: 1 }]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, unref } from 'vue'
import { pageHead } from '../../components'
import { SlotsTable } from '@/components/slots-table'
import { useColumns } from './index'
import { getSercuityList } from '@/api/strategy/security'
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
    const refreshTable = () => {
      tableRef.value.refreshTableData()
    }
    //批量管理
    const isCheck = ref<boolean>(false)
    // 标题

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
      getSercuityList,
      isCheck,
      refreshTable,
      selectedRecord,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.securityTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 129px);
  }
}
</style>
