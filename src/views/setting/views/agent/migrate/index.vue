<template>
  <div class="transfer">
    <div class="header">
      <a-button type="primary" @click="startMigrate">
        {{ t('setting.startMig') }}
      </a-button>
      <span class="tip">
        {{ t('setting.migTips') }}
      </span>
    </div>
    <slots-table
      ref="tableRef"
      class="dataTable"
      v-model:columns="columns"
      row-key="id"
      :get-list-func="getMigrateList"
    >
      <template #customTitle>
        {{ t('setting.noMig') }}
        <a-tooltip placement="bottom" theme="light" color="#fff">
          <template #title>
            <span style="color: #000">
              {{ t('setting.noMigTip') }}
            </span>
          </template>
          <custom-icon type="#ax-tips" />
        </a-tooltip>
      </template>
    </slots-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { getMigrateList, MigrateGroup } from '@/api/setting/agent'
import { useColumns } from './index'
import { useModal } from '@/hooks/use-modal'
import addModel from './cmts/addModel'
import { Tooltip } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsTable,
    addModel,
    [Tooltip.name]: Tooltip
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    //表格
    const tableRef = ref<any>(null)

    // 开始迁移按钮
    const startMigrate = () => {
      useModal(
        {
          title: t('setting.startMig'),
          handleOk: async (modelRef) => {
            await modelRef.validate()
            await MigrateGroup(modelRef.fields as any)
            tableRef.value.refreshTableData()
          }
        },
        addModel
      )
    }
    return {
      tableRef,
      getMigrateList,
      columns,
      startMigrate,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.transfer {
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-left: 16px;
  .header {
    padding: 16px 24px;
    .tip {
      color: #f8a04c;
      font-size: 14px;
      margin-left: 16px;
    }
  }
}
.dataTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 153px);
  }
}
</style>
