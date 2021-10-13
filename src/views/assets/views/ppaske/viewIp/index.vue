<template>
  <div>
    <div class="header">
      <span class="title">
        <span> {{ t('asset.hostNum') }}：{{ total }}</span>
      </span>
      <div class="rightOpt">
        <!-- 主机视图搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="ip"
          :placeholder="t('common.pIptHostIp')"
          @search="searchData"
          @change="searchData"
        />
        <!-- 主机视图搜索 end -->
        <!-- 操作系统 start -->
        <a-select
          class="search"
          v-model:value="osver"
          allowClear
          :placeholder="t('common.system')"
        >
          <a-select-option value="1">Windows</a-select-option>
          <a-select-option value="0">Linux</a-select-option>
        </a-select>
        <!-- 操作系统 end -->

        <!-- 分组 start -->
        <span class="search">
          <select-tree
            :dataSource="treeData"
            v-model:selectedKeys="group_id"
            :placeholder="t('common.selectGroup')"
          />
        </span>

        <!-- 分组 end -->

        <!-- 切换视图 start -->
        <a-button type="link" class="swt_view" @click="switchView">
          <template #icon><WalletOutlined /></template>
          {{ t('asset.swtView') }}
        </a-button>
        <!-- 切换视图 end -->

        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->

        <!-- 导出 start -->
        <ExportOutlined class="RIcon" @click="exportFile" />
        <!-- 导出 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      v-model:totalNum="total"
      class="tabCon show_group_path"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="api"
      :arguments="agms"
    >
      <!--  自定义slots start-->
      <template #count="slotProps">
        <span @click="jumpDetail(slotProps)" class="num_color">
          {{ slotProps.text }}
        </span>
      </template>
      <!--    自定义slots end-->
    </slots-table>
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref, unref } from 'vue'
import { ExportOutlined, WalletOutlined } from '@ant-design/icons-vue'
import { SlotsTable } from '@/components/slots-table'
import { useRouter, useRoute } from 'vue-router'
import selectTree from '@/components/selectTree'
import { useOptions } from './settings'
import { TableColumn } from '@/types/tableColumn'
import { useGroupTree } from '@/hooks'
import { osLogoType, exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ExportOutlined,
    WalletOutlined,
    SlotsTable,
    selectTree
  },
  setup() {
    const { t } = useI18n()
    const treeData = useGroupTree()
    const router = useRouter()
    const currentRoute = useRoute()
    const tableRef: any = ref<HTMLElement>()
    const { type } = currentRoute.meta
    const state = reactive<{
      columns: TableColumn[]
      api(...rest): Promise<any>
      total: number
    }>({
      columns: [],
      api: () => ({} as Promise<any>),
      total: 0
    })
    //state hook
    useOptions(state, type as string, t)

    //table arguments
    const agms = reactive<Arguments>({
      ip: '',
      osver: undefined,
      group_id: -1
    })

    //switch Views
    const switchView = () => {
      router.push({ name: 'assets-' + type + '-viewPro' })
    }

    //go to detail page
    const jumpDetail = ({ record, text }) => {
      const logoType = osLogoType(record.os, record.online)
      router.push({
        name: 'assets-' + type + '-detail',
        query: {
          host_id: record.host_id,
          title: record.ip,
          type: type as string,
          view: 'Ip',
          logoType
        }
      })
    }

    //refreshTable Data
    watch([() => agms.osver, () => agms.group_id], () => {
      tableRef.value.refreshTableData()
    })

    //search Event
    function searchData(v, e) {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        tableRef.value.refreshTableData()
      }
      if (!value && !e) {
        tableRef.value.refreshTableData()
      }
    }
    //导出
    const exportFile = () => {
      exportExcel('/api/export/' + type + '_host', {
        filter: agms as any
      })
    }
    return {
      ...toRefs(agms),
      ...toRefs(state),
      tableRef,
      agms,
      treeData,
      switchView,
      jumpDetail,
      searchData,
      exportFile,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 24px;
  .title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .rightOpt {
    display: flex;
    align-items: center;
    .line {
      width: 1px;
      height: 24px;
      background: #eeeeee;
      margin: 0 16px;
    }
  }
  .search {
    width: 240px;
    align-items: center;
    margin-right: 16px;
  }
  .swt_view {
    margin-left: 16px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}
.show_group_path {
  ::v-deep(.prevNodes) {
    display: inline-block !important;
  }
}
.tabCon {
  margin: 0 24px;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.04);
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 169px);
  }
}
.num_color {
  color: #18ba79;
  cursor: pointer;
}
</style>
