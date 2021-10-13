<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-03 19:25:02
 * @LastEditTime: 2021-10-12 19:00:59
-->
<template>
  <slots-table
    ref="tableRef"
    :columns="columns"
    row-key="id"
    class="smallTable"
    :arguments="state"
    childrenColumnName="items"
    :get-list-func="getStategyApplyList"
  >
    <template #stategySelect="{ record }">
      <select-cus
        v-model:value="record.policy_id"
        :placehodler="t('strategy.plsPly')"
        @changeValue="changeSelect($event, record.id)"
        :options="options"
      />
    </template>
  </slots-table>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { useColumns } from './columns'
import { getStategyApplyList } from '@/api/strategy/security'
import { selectCus } from '@/components/select-custom'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    options: Object,
    policyType: Number
  },
  components: {
    SlotsTable,
    selectCus
  },
  setup(props) {
    const { t } = useI18n()
    const columns = useColumns(t)
    //表格数据体
    const state = reactive({
      policy_type: props.policyType
    })
    const tableRef = ref<any>()
    const modalValue = reactive<{
      switch: { group_id: number; policy_id: number | undefined }[]
    }>({
      switch: []
    })
    const changeSelect = (policy_id, group_id) => {
      const index = modalValue.switch.findIndex(
        (ele) => ele.group_id === group_id
      )
      if (index > -1) {
        modalValue.switch[index] = { group_id, policy_id: policy_id ?? 0 }
      } else {
        modalValue.switch.push({ group_id, policy_id: policy_id ?? 0 })
      }
    }
    return {
      getStategyApplyList,
      columns,
      changeSelect,
      modalValue,
      tableRef,
      state,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.smallTable {
  ::v-deep(td) {
    padding: 10px 24px !important;
  }
  ::v-deep(.ant-table-body) {
    height: 400px;
  }
}
</style>
