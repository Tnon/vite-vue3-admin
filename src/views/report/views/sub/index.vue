<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-12 19:57:36
-->
<template>
  <div>
    <div class="header">
      <!-- 批量删除 start -->
      <batch-bar v-model:isCheck="isCheck" v-if="isCheck" class="batbar">
        <template #title>
          {{ t('common.batRecord', [tableRef.selectAllNumber]) }}
        </template>
        <template #button>
          <a-button
            type="primary"
            danger
            :disabled="!tableRef.selectAllNumber"
            @click="delStrategy"
          >
            {{ t('common.delete') }}
          </a-button>
        </template>
      </batch-bar>
      <!-- 批量删除 end -->
      <!-- 搜索 start -->
      <span>
        <a-input-search
          class="search"
          v-model:value.trim="search_data"
          :placeholder="t('report.pIptName')"
        />
      </span>
      <!-- 搜索 end -->

      <!-- 批量标记 start -->
      <span class="mark" @click="showCheckbox">
        <a-button type="link">
          <template #icon>
            <CarryOutOutlined />
          </template>
          {{ t('common.batchOpt') }}
        </a-button>
      </span>
      <!-- 批量标记 end-->

      <!-- 新建报告 start -->
      <a-button type="primary" @click="NewReport">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ t('report.newSub') }}
      </a-button>
      <!-- 新建报告 end -->
      <div class="line"></div>
      <!-- 导出 start -->
      <ExportOutlined @click="exportFile" class="exportIc" />
      <!-- 导出 end -->
    </div>
    <slots-table
      class="subTable"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getSubListApi"
      :isCheck="isCheck"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, unref } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { useColumns, addOrUpdate } from './index'
import {
  CarryOutOutlined,
  PlusOutlined,
  ExportOutlined
} from '@ant-design/icons-vue'
import { getSubListApi, delSubReport } from '@/api/report'
import { initRowSelection } from '@/components/slots-table/hooks'
import { batchBar } from '@/components/batch-bar'
import { exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsTable,
    CarryOutOutlined,
    PlusOutlined,
    ExportOutlined,
    batchBar
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    //表格元素
    const tableRef: any = ref<HTMLElement>()
    //表格选择
    const isCheck = ref<boolean>(false)
    const showCheckbox = () => {
      isCheck.value = !isCheck.value
    }
    //表格结构体
    const agms = reactive<{
      search_data: String
    }>({
      search_data: ''
    })
    const refreshTable = () => {
      tableRef.value.refreshTableData()
      initRowSelection()
    }
    //新建订阅
    const NewReport = () => {
      addOrUpdate(t, true, reactive({}), reactive({ emails: [] }), refreshTable)
    }
    //批量删除
    const delStrategy = async () => {
      await delSubReport({
        subidarr: tableRef.value.rowSelection.selectedRowKeys
      })
      refreshTable()
    }

    //导出
    const exportFile = () => {
      exportExcel('/api/export/sub', { filter: agms })
    }
    return {
      ...toRefs(agms),
      columns,
      tableRef,
      agms,
      getSubListApi,
      NewReport,
      showCheckbox,
      isCheck,
      delStrategy,
      exportFile,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import '../style/index.less';
</style>
