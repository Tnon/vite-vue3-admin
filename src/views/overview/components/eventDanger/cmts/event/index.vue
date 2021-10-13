<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-12 17:51:50
-->
<template>
  <div>
    <div class="header">
      <span class="title">{{ t('overview.lastEvents') }}</span>
      <switch-nodes v-model:actived="type" size="small" :types="types" />
    </div>
    <a-table
      ref="tableRef"
      :columns="columns"
      class="singleTable"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="false"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref, watchEffect } from 'vue'
import switchNodes from '@/components/switchNodes'
import { useColumns } from './columns'
import { getTableList } from '@/api/attack_risk'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    switchNodes
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    //主键
    const rowKey = ({ host_id, content_md5, dtype, create_at }) =>
      host_id + ',' + content_md5 + ',' + dtype + ',' + create_at
    //数据源
    const dataSource = ref([])
    //表格
    const tableRef = ref<any>(null)
    //默认参数
    const type = ref<string>('/10000/')
    //类型筛选
    const types: Array<{ title: string; type: string }> = [
      {
        //攻击
        title: 'menu.attack',
        type: '/10000/'
      },
      {
        //风险
        title: 'menu.risk',
        type: '/10100/'
      }
    ]
    //请求数据
    watchEffect(async () => {
      const { items } = await getTableList({
        page: { page_index: 1, page_size: 5 },
        filter: {
          handle: 0,
          riskpath: unref(type)
        }
      })
      dataSource.value = items
    })
    return {
      types,
      type,
      columns,
      tableRef,
      dataSource,
      rowKey,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 48px;
  background: #f8f8f8;
  border-radius: 8px 8px 0px 0px;
  padding: 0 16px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
}
.showInfo {
  img {
    width: 24px;
    height: 24px;
  }
}
.singleTable {
  ::v-deep(.ant-table-body) {
    height: calc(352px);
  }
}
</style>
