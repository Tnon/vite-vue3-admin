<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 14:18:14
 * @LastEditTime: 2021-07-06 17:35:10
-->
<template>
  <div class="container">
    <a-table
      :pagination="false"
      :columns="columns"
      row-key="id"
      ref="tableRef"
      :dataSource="dataSource"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Table } from 'ant-design-vue'
import { useColumns } from './index'
import { useRoute } from 'vue-router'
import { getHostPolicy } from '@/api/asset/host'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Table.name]: Table
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    const currentRoute = useRoute()
    const tableRef: any = ref<HTMLElement>()
    const dataSource = ref<any>([])
    const getTableData = async () => {
      dataSource.value = await getHostPolicy({
        host_id: currentRoute.query.id as string
      })
    }
    getTableData()
    return {
      columns,
      tableRef,
      dataSource
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  margin: 16px 24px;
  background: #ffffff;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px 8px 0px 0px;
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 232px);
  }
}
.search {
  width: 240px;
  margin-left: 16px;
}
.selectEff {
  width: 128px;
  margin: 0 8px;
}
</style>
