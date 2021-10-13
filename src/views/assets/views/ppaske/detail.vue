<template>
  <div>
    <div class="header">
      <span class="title" @click="goBack">
        <customIcon type="#ax-arrow-left" size="24" />
        <customIcon
          class="cusicon"
          v-if="view === 'Ip'"
          :type="logoType"
          size="24"
        />
        <span class="titmsg"> {{ title }}</span>
      </span>
      <div class="rightOpt">
        <!-- 资产视图搜索 start -->
        <a-input-search
          class="search"
          v-if="view === 'Pro'"
          v-model:value.trim="ip"
          :placeholder="t('common.pIptHostIp')"
          @search="searchData"
          @change="searchData"
        />
        <!-- 资产视图搜索 end -->

        <!-- 主机视图搜索 start -->
        <a-input-search
          v-else
          class="search"
          v-model:value.trim="name"
          :placeholder="
            t('asset.pInput', [t('asset.' + ASSETSTITLE[`${type}_title`])])
          "
          @search="searchData"
          @change="searchData"
        />
        <!-- 主机视图搜索 end -->

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
      class="tabCon"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="api"
      :arguments="agms"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { ExportOutlined, LeftOutlined } from '@ant-design/icons-vue'
import { SlotsTable } from '@/components/slots-table'
import { useRouter, useRoute } from 'vue-router'
import { getapi_columnsDetail } from './detailCol'
import detailApi from '@/api/asset'
import { TableColumn } from '@/types/tableColumn'
import { exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
import { ASSETSTITLE } from '@/enums/assetsType'
export default defineComponent({
  components: {
    ExportOutlined,
    LeftOutlined,
    SlotsTable
  },
  setup() {
    const { t } = useI18n()
    //路由相关
    const router = useRouter()
    const currentRoute = useRoute()
    //table
    const tableRef: any = ref<HTMLElement>()
    //hostIP / assetsName  id  type:{process,kernel....}  view:{Pro,Ip}
    const { title, host_id, type, view, logoType } = currentRoute.query
    const columns: TableColumn[] = getapi_columnsDetail('' + type + view, t)
    //table Api
    const api =
      view === 'Pro'
        ? detailApi[`api_${type}`]['getAssetViewDetail']
        : detailApi[`api_${type}`]['getHostViewDetail']

    //table Arguments
    let agms: any
    if (view === 'Ip') {
      agms = reactive<Arguments>({
        name: '',
        host_id: host_id as string
      })
    } else {
      agms = reactive<Arguments>({
        ip: '',
        name: title as string
      })
    }

    //go Pro or Ip
    const goBack = () => {
      router.go(-1)
    }
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
      const api =
        view === 'Ip'
          ? '/api/export/' + type + '_host_detail'
          : '/api/export/' + type + '_asset_detail'
      exportExcel(api, { filter: agms })
    }
    return {
      ...toRefs(agms),
      goBack,
      tableRef,
      agms,
      searchData,
      columns,
      title,
      api,
      view,
      logoType,
      exportFile,
      ASSETSTITLE,
      type,
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
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    .cusicon {
      margin: 0 4px;
    }
    .titmsg {
      transition: all 0.3s;
      margin-left: 0px;
      font-weight: 600;
      font-size: 15px;
    }
    &:hover {
      .titmsg {
        margin-left: 4px;
      }
    }
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
}

.tabCon {
  margin: 0 24px;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.04);
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 169px);
  }
}
</style>
