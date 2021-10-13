<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-08 14:50:36
-->
<template>
  <div>
    <div class="header">
      <!-- 批量删除 start -->
      <batch-bar v-model:isCheck="isCheck" v-if="isCheck" class="batbar">
        <template #title>
          <!-- 已选{{ tableRef.selectAllNumber }}条报表 ,进行删除 -->
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
        {{ t('report.newReport') }}
      </a-button>
      <!-- 新建报告 end -->
    </div>
    <slots-table
      class="subTable"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :allowCheckAll="false"
      :get-list-func="getReportListApi"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { useColumns, addOrUpdateReport } from './index'
import {
  PlusOutlined,
  ExportOutlined,
  CarryOutOutlined
} from '@ant-design/icons-vue'
import { getReportListApi, delManaReport } from '@/api/report'
import { batchBar } from '@/components/batch-bar'
import { initRowSelection } from '@/components/slots-table/hooks'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsTable,
    PlusOutlined,
    ExportOutlined,
    batchBar,
    CarryOutOutlined
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    //表格元素
    const tableRef: any = ref<HTMLElement>()
    //批量标记
    const isCheck = ref<boolean>(false)
    const showCheckbox = () => {
      isCheck.value = !isCheck.value
    }
    const refreshTable = () => {
      tableRef.value.refreshTableData()
      initRowSelection()
    }
    //表格结构体
    const agms = reactive<{
      search_data: String
    }>({
      search_data: ''
    })
    //新建报表
    const NewReport = () => {
      addOrUpdateReport(t, true, reactive({}), refreshTable)
    }
    //批量删除
    const delStrategy = async () => {
      await delManaReport({
        repidarr: tableRef.value.rowSelection.selectedRowKeys
      })
      refreshTable()
    }

    return {
      ...toRefs(agms),
      columns,
      tableRef,
      agms,
      NewReport,
      showCheckbox,
      isCheck,
      getReportListApi,
      delStrategy,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import '../style/index.less';
</style>
