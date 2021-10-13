<template>
  <div>
    <div class="header">
      <span class="title">
        <span> {{ title }}：{{ total }}</span>
      </span>
      <div class="rightOpt">
        <!-- 详情搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="name"
          :placeholder="placeholder"
          @search="searchData"
          @change="searchData"
        />
        <!-- 详情搜索 end -->

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
      class="tabCon"
      v-model:columns="columns"
      row-key="name"
      :get-list-func="api"
      :arguments="agms"
    >
      <!--  自定义slots start-->
      <template #host_count="slotProps">
        <span @click="jumpDetail(slotProps)" class="num_color">{{
          slotProps.text
        }}</span>
      </template>
      <!--    自定义slots end-->
    </slots-table>
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import { ExportOutlined, WalletOutlined } from '@ant-design/icons-vue'
import { SlotsTable } from '@/components/slots-table'
import { useRouter, useRoute } from 'vue-router'
import { useOptions } from './settings'
import { TableColumn } from '@/types/tableColumn'
// import { exportExcel } from '@/api/asset'
import { exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ExportOutlined,
    WalletOutlined,
    SlotsTable
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const currentRoute = useRoute()
    const tableRef: any = ref<HTMLElement>()
    const state = reactive<{
      columns: TableColumn[]
      placeholder: string
      title: string
      api(...rest): Promise<any>
      type: string
      total: number
    }>({
      columns: [],
      placeholder: '',
      title: '',
      api: () => ({} as Promise<any>),
      type: '',
      total: 0
    })

    //state  hook
    useOptions(state, currentRoute.meta.type as string, t)
    watch(
      () => currentRoute.meta.type,
      (type) => {
        if (!type) return
        useOptions(state, type as string, t)
      }
    )
    //table arguments
    const agms = reactive<Arguments>({
      name: ''
    })

    //switchView
    const switchView = () => {
      router.push({ name: 'assets-' + state.type + '-viewIp' })
    }

    //go to detail page
    const jumpDetail = ({ record, text }, key) => {
      router.push({
        name: 'assets-' + state.type + '-detail',
        query: {
          title: record.name,
          type: state.type,
          view: 'Pro'
        }
      })
    }

    //search events
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
      exportExcel('/api/export/' + state.type + '_asset', {
        filter: agms as any
      })
    }
    return {
      ...toRefs(agms),
      ...toRefs(state),
      tableRef,
      agms,
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
