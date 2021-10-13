<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-23 11:15:17
-->
<template>
  <div>
    <div class="header">
      <span class="title">{{ t('overview.dangerHost5') }}</span>
      <switch-nodes v-model:actived="type" size="small" :types="types" />
    </div>
    <a-table
      ref="tableRef"
      :columns="columns"
      rowKey="host_id"
      class="singleTable"
      :dataSource="dataSource"
      :pagination="false"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref, watchEffect } from 'vue'
import switchNodes from '@/components/switchNodes'
import { dangerHostTopN } from '@/api/overview'
import { TableColumn } from '@/types/tableColumn'
import hostIp from '@/components/host-ip'
import { createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    switchNodes
  },
  setup() {
    const { t } = useI18n()
    //类型
    const types: Array<{ title: string; type: number }> = [
      {
        //攻击
        title: 'menu.attack',
        type: 1
      },
      {
        //风险
        title: 'menu.risk',
        type: 2
      }
    ]
    const router = useRouter()
    //表格数据源
    const dataSource = ref([])
    //表格元素
    const tableRef = ref<any>(null)
    //当前选择
    const type = ref<number>(1)
    //刷新
    watchEffect(async () => {
      const items = await dangerHostTopN({
        count: 5,
        type: unref(type)
      })
      dataSource.value = items
    })
    //表格列
    const columns: TableColumn[] = [
      {
        title: t('common.hostIp'),
        dataIndex: 'ip',
        width: 400,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online
          })
      },
      {
        title: t('common.number'),
        dataIndex: 'num',
        width: 200,
        customRender: ({ text, record }) => {
          return createVNode(
            'span',
            {
              style: { cursor: 'pointer' },
              onClick: () => {
                router.push({
                  name: unref(type) === 1 ? 'attack' : 'risk',
                  query: {
                    ip: record.ip
                  }
                })
              }
            },
            text
          )
        }
      }
    ]
    return {
      types,
      type,
      columns,
      tableRef,
      dataSource,
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
