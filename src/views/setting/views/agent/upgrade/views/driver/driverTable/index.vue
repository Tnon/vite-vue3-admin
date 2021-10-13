<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 19:44:48
 * @LastEditTime: 2021-09-30 10:48:21
-->
<template>
  <div class="container">
    <div class="toolBar">
      <div>
        <!-- 搜索 start -->
        <a-input-search
          v-model:value.trim="os"
          :placeholder="t('setting.sysPlacTh')"
          class="search"
          @search="searchData"
          @change="searchData"
        />
        <!-- 搜索 end -->

        <!-- 系统类型 start -->
        <!-- <a-select
          v-model:value="osver"
          allowClear
          placeholder="系统类型"
          class="select"
        >
          <a-select-option value="1">Windows</a-select-option>
          <a-select-option value="0">Linux</a-select-option>
        </a-select> -->
        <!-- 系统类型 end -->

        <!-- 适配环境 start -->
        <a-select
          v-model:value="driver_version"
          :placeholder="t('setting.driverVer')"
          class="select"
          allowClear
          v-show="actived == 'adapted'"
        >
          <a-select-option
            v-for="item in versOptions"
            :key="item"
            :value="item"
          >
            {{ item }}
          </a-select-option>
          <!-- <a-select-option value="0">Linux</a-select-option> -->
        </a-select>
        <!-- 适配环境 end -->
      </div>
      <!-- 批量升级 start -->
      <batch-bar
        v-if="isCheck && actived === 'adapted'"
        v-model:isCheck="isCheck"
        class="selectBar"
      >
        <template #title>
          <!-- 已选{{ tableRef.selectAllNumber }}条记录，批量升级 -->
          {{ t('setting.batUpGre', [tableRef.selectAllNumber]) }}
        </template>
        <template #button>
          <a-button
            type="primary"
            :disabled="!tableRef.selectAllNumber"
            @click="batchHandle"
          >
            {{ t('common.confirm') }}
          </a-button>
        </template>
      </batch-bar>
      <!-- 批量升级 end -->
      <div class="rOption">
        <!-- 批量升级 start -->
        <a-button
          type="link"
          @click="showCheckbox"
          v-if="actived === 'adapted'"
        >
          <template #icon>
            <FunnelPlotOutlined />
          </template>
          {{ t('setting.batUpg') }}
        </a-button>
        <div class="line" v-if="actived === 'adapted'"></div>
        <!-- 刷新 start -->
        <custom-icon
          v-if="actived === 'adapted'"
          class="RIcon"
          @click="refreshTable(true)"
          size="14"
          type="#ax-update"
        />
        <!-- 刷新 end -->
        <div class="line" v-if="actived === 'adapted'"></div>
        <!-- 导出 start -->
        <ExportOutlined class="RIcon" @click="exportFile" />
        <!-- 导出 end -->
      </div>
    </div>

    <!-- 表格 start -->
    <slots-table
      class="envTable"
      ref="tableRef"
      row-key="os"
      :arguments="agms"
      :getListFunc="api"
      :columns="columns"
      :isCheck="isCheck"
      :disabledKeys="disabledKeys"
      :get-can-select-func="getUpgradeableDriverNumber"
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  watch,
  computed,
  unref
} from 'vue'
import { batchBar } from '@/components/batch-bar'
import { SlotsTable } from '@/components/slots-table'
import { useTableData, StaType } from './settings'
import {
  getadaEnvVersion,
  getUpgradeableDriverNumber,
  batchUpgradeDriver
} from '@/api/setting/agent'
import { initRowSelection } from '@/components/slots-table/hooks'
import store from '@/store'
import { ExportOutlined, FunnelPlotOutlined } from '@ant-design/icons-vue'
import { exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    actived: {
      type: String,
      required: true
    }
  },
  components: {
    SlotsTable,
    ExportOutlined,
    batchBar,
    FunnelPlotOutlined
  },
  setup(props) {
    const { t } = useI18n()
    const tableData = useTableData(t)
    const disabledKeys = [{ key: 'enable_upgrade', value: false }]
    //全选
    const isCheck = ref<boolean>(false)
    //下拉框动态数据
    const versOptions = ref<string[]>([])
    //表格
    const tableRef: any = ref<HTMLElement>()
    //动态数据
    const state = reactive<StaType>({
      agms: {
        os: '',
        // osver: undefined,
        driver_version: undefined
      },
      columns: tableData[props.actived].columns,
      api: tableData[props.actived].api
    })
    //init
    watch(
      () => props.actived,
      (v: string) => {
        state.agms.os = ''
        // state.agms.osver = undefined
        state.agms.driver_version = undefined
        state.api = tableData[v].api
        state.columns = tableData[v].columns

        initRowSelection()
        //获取可升级数量
        if (v !== 'adapted') {
          isCheck.value = false
        }
      }
    )
    //刷新表格
    const refreshTable = (keep_page?: boolean) => {
      tableRef.value.refreshTableData(keep_page)
      initRowSelection()
    }
    //刷新表格
    // watch([() => state.agms.osver, () => state.agms.driver_version], () => {
    //   refreshTable()
    // })
    watch([() => state.agms.driver_version], () => {
      refreshTable()
    })

    //显示选择框
    const showCheckbox = () => {
      isCheck.value = !isCheck.value
    }
    //获取全局是否全选
    const isSelectAll = computed(() => store.state['selectAll'].isSelectAll)

    //获取取消选择的ids
    const excludeRowKeys: any = computed(() => store.state['selectAll'].exclude)

    //批量处理确定
    const batchHandle = async () => {
      //批量处理程序
      const sendKesArr = unref(isSelectAll)
        ? unref(excludeRowKeys)
        : unref(tableRef).rowSelection.selectedRowKeys
      let sendObj: any = {}

      if (unref(isSelectAll)) {
        sendObj.filter = state.agms
        sendObj.exclude = sendKesArr.join(',')
        sendObj.include = ''
      } else {
        sendObj.filter = {}
        sendObj.exclude = ''
        sendObj.include = sendKesArr.join(',')
      }
      await batchUpgradeDriver(sendObj)

      // 刷新
      refreshTable()
    }
    // 搜索框变化刷新表格
    const searchData = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        refreshTable()
      }
      if (!value && !e) {
        refreshTable()
      }
    }
    //获取适配环境下拉框
    const getOptions = async () => {
      const res = await getadaEnvVersion()
      versOptions.value = res
    }
    getOptions()
    //导出
    const exportFile = () => {
      if (props.actived === 'adapted') {
        exportExcel('/api/export/driverAdapted', { filter: state.agms })
      } else {
        exportExcel('/api/export/driverUnadapted', { filter: state.agms })
      }
    }
    return {
      ...toRefs(state.agms),
      ...toRefs(state),
      tableRef,
      versOptions,
      searchData,
      batchHandle,
      showCheckbox,
      isCheck,
      isSelectAll,
      disabledKeys,
      getUpgradeableDriverNumber,
      refreshTable,
      exportFile,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  margin-top: 24px;
  height: calc(100vh - 335px);
  overflow: auto;
  .toolBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      width: 200px;
    }
    .select {
      width: 160px;
      margin-left: 8px;
    }
    .rOption {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 16px;
      .line {
        width: 1px;
        height: 24px;
        background: #eeeeee;
        margin: 0 16px;
      }
      .batchIcon {
        padding: 8px;
        cursor: pointer;
      }
    }
  }

  .envTable {
    margin-top: 16px;
    ::v-deep(.ant-table-body) {
      height: calc(100vh - 440px);
    }
  }
}
.selectBar {
  margin: 0 16px;
}
</style>
