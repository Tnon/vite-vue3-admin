<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-20 11:42:52
 * @LastEditTime: 2021-08-20 11:44:23
-->
<template>
  <slots-table
    class="recordsTable"
    :columns="columns"
    :getListFunc="getUploadRecords"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { getUploadRecords } from '@/api/setting/agent'
import { useColumns } from './index'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsTable
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    return {
      getUploadRecords,
      columns
    }
  }
})
</script>
<style lang="less" scoped>
.recordsTable {
  ::v-deep(.ant-table-body) {
    height: 400px;
  }
}
</style>
