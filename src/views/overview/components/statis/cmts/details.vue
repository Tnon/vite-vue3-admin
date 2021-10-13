<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-12 17:53:37
-->
<template>
  <a-table
    ref="tableRef"
    class="staticTable"
    :dataSource="dataSource"
    :columns="columns"
    :bordered="false"
    :pagination="false"
    rowKey="day"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useColumns } from './columns'
import { getPeriodStatistics } from '@/api/overview'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'UserListPage',
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    const dataSource = ref([])
    //获取期间统计数据
    const getDataSource = async () => {
      const res = await getPeriodStatistics({ days: '1|7|30' })
      dataSource.value = res
    }
    getDataSource()
    return {
      columns,
      dataSource
    }
  }
})
</script>

<style lang="less" scoped>
.staticTable {
  ::v-deep(th) {
    border: none;
    background: none;
  }
  // ::v-deep(tr) {
  //   border-collapse: collapse / separate;
  //   border-spacing: 10px 10px;
  // }
  ::v-deep(td) {
    border-bottom: 8px solid #fff;
    padding: 9px 24px !important;
    background: #f8f8f8;
    margin: 8px 0;
  }
  padding: 0 24px 24px;
}
</style>
