<template>
  <div class="versionM">
    <div class="header">
      <div v-if="!isCheck" class="title">{{ t('setting.verMana') }}</div>
      <!-- 批量升级 start -->
      <batch-bar v-else v-model:isCheck="isCheck">
        <template #title>
          <!-- 已选{{ tableRef.selectAllNumber }}台主机，批量升级 -->
          {{ t('setting.batOpt', [tableRef.selectAllNumber]) }}
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
        <div class="batchUpgrade" @click="showCheckbox">
          <FunnelPlotOutlined class="batchIcon" />
          {{ t('setting.batUpg') }}
        </div>
        <!-- 批量升级 end -->

        <div class="line"></div>
        <!-- 刷新 start -->
        <custom-icon
          class="RIcon"
          @click="refreshTable(true)"
          type="#ax-update"
        />
        <div class="line"></div>
        <!-- 刷新 end -->
        <!-- 导出 start -->
        <ExportOutlined class="RIcon" @click="exportFile" />
        <!-- 导出 end -->
      </div>
    </div>
    <div class="searchFil">
      <!-- 搜索 start -->
      <a-input-search
        v-model:value.trim="ip"
        :placeholder="t('common.pIptHostIp')"
        class="search"
        @search="searchData"
        @change="searchData"
      />
      <!-- 搜索 end -->

      <!-- 主机分组 start -->
      <span class="select">
        <select-tree
          :dataSource="treeData"
          v-model:selectedKeys="groups"
          :placeholder="t('common.selectGroup')"
          :multiple="true"
          :maxTagCount="2"
        />
      </span>
      <!-- 主机分组 end -->

      <!-- 升级状态 start -->
      <a-select
        v-model:value="status"
        :placeholder="t('setting.upgStau')"
        class="select"
        allowClear
      >
        <template v-for="item in upgradeStatus" :key="item.key">
          <a-select-option :value="item.key">{{ item.value }}</a-select-option>
        </template>
      </a-select>
      <!-- 升级状态 ebd -->
      <!-- 操作系统 start -->
      <a-select
        v-model:value="osver"
        :placeholder="t('common.system')"
        class="select"
        allowClear
      >
        <a-select-option value="1">Windows</a-select-option>
        <a-select-option value="0">Linux</a-select-option>
      </a-select>
      <!-- 操作系统 ebd -->

      <!-- agent版本 start -->
      <a-select
        v-model:value="agent_version"
        :placeholder="t('common.agentVersion')"
        class="select"
        allowClear
        @dropdownVisibleChange="getAgentVersions"
      >
        <template v-for="item in agentVersions" :key="item">
          <a-select-option :value="item">{{ item }}</a-select-option>
        </template>
      </a-select>
      <!-- agent版本 end -->
    </div>

    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      v-model:columns="columns"
      row-key="host_id"
      :arguments="agms"
      :get-list-func="getAgentList"
      class="agentTable"
      :isCheck="isCheck"
      :get-can-select-func="getUpgradeableNumber"
      :disabledKeys="disabledKeys"
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  watch,
  reactive,
  ref,
  computed,
  unref
} from 'vue'
import { ExportOutlined, FunnelPlotOutlined } from '@ant-design/icons-vue'
import { useColumns } from './type'
import { SlotsTable } from '@/components/slots-table'
import {
  getAgentList,
  getallvers,
  getUpgradeableNumber,
  batchUpgradeAgent
} from '@/api/setting/agent'
import { FilterState } from '@/api/setting/model'
import selectTree from '@/components/selectTree'
import { useGroupTree } from '@/hooks'
import { initRowSelection } from '@/components/slots-table/hooks'
import store from '@/store'
import { useUpgradeStatus } from './index'
import { exportExcel } from '@/utils/tools'
import { batchBar } from '@/components/batch-bar'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ExportOutlined,
    FunnelPlotOutlined,
    SlotsTable,
    selectTree,
    batchBar
  },
  setup() {
    const { t } = useI18n()
    const upgradeStatus = useUpgradeStatus(t)
    const columns = useColumns(t)
    const disabledKeys = [{ key: 'enable_upgrade', value: false }]
    //全部版本
    const agentVersions = ref<string[]>([])
    //全选
    const isCheck = ref<boolean>(false)
    //分组树
    const treeData = useGroupTree('all')
    //表格
    const tableRef: any = ref<HTMLElement>()
    //表格结构体
    const agms = reactive<FilterState>({
      ip: '',
      groups: '',
      status: undefined,
      agent_version: undefined,
      osver: undefined
    })
    //刷新表格
    const refreshTable = (keep_page?: boolean) => {
      tableRef.value.refreshTableData(keep_page)
      initRowSelection()
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
    // 监听变化刷新表格
    watch(
      [
        () => agms.groups,
        () => agms.status,
        () => agms.agent_version,
        () => agms.osver
      ],
      () => {
        //刷新表格
        refreshTable()
      }
    )
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
        sendObj.filter = agms
        sendObj.exclude = sendKesArr.join(',')
        sendObj.include = ''
      } else {
        sendObj.filter = {}
        sendObj.exclude = ''
        sendObj.include = sendKesArr.join(',')
      }
      await batchUpgradeAgent(sendObj)
      //刷新表格
      refreshTable()
    }

    //获取agent所有版本，下拉框
    const getAllVersions = async () => {
      const vers = await getallvers()
      agentVersions.value = vers
    }
    //pop显示 请求
    const getAgentVersions = (v) => {
      v && getAllVersions()
    }
    //导出
    const exportFile = () => {
      exportExcel('/api/export/agentUpgrade', { filter: agms })
    }

    return {
      agms,
      ...toRefs(agms),
      getAgentList,
      searchData,
      tableRef,
      columns,
      treeData,
      isCheck,
      showCheckbox,
      batchHandle,
      agentVersions,
      upgradeStatus,
      getUpgradeableNumber,
      disabledKeys,
      refreshTable,
      getAgentVersions,
      exportFile,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.versionM {
  // height: calc(100vh - 463px);
  // overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 16px;
  .header {
    height: 56px;
    padding-left: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
    }
    .line {
      width: 1px;
      height: 24px;
      background: #eeeeee;
      margin: 0 16px;
    }
    .rOption {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 16px;
      .batchUpgrade {
        cursor: pointer;
        .batchIcon {
          padding: 8px;
        }
      }
      .RIcon {
        cursor: pointer;
      }
    }
  }
}
.searchFil {
  padding: 0 16px;
  margin-bottom: 16px;
  display: flex;
}
.select {
  margin-left: 8px;
  min-width: 160px;
  display: inline-block;
}
.search {
  width: 200px;
}
.agentTable {
  ::v-deep(.ant-table-body) {
    min-height: calc(100vh - 624px);
  }
}
</style>
