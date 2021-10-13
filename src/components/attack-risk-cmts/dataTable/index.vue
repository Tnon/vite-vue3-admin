<template>
  <div class="content">
    <!-- 页头 start -->
    <page-header
      class="pageHeader"
      @confirm="btnConfirm"
      :modelType="modelType"
    >
      <template #title>
        <div v-if="!isCheck" class="title">{{ selectedTitle }}</div>
        <div v-else class="selectBar">
          <span>
            {{ t('common.markHandle', [tableRef.selectAllNumber]) }}
          </span>
          <div>
            <a-button class="btn" type="link" @click="showCheckbox">
              {{ t('common.cancle') }}
            </a-button>
            <a-button
              class="btn"
              type="primary"
              :disabled="!tableRef.selectAllNumber"
              @click="batchHandle"
            >
              {{ t('common.confirm') }}
            </a-button>
          </div>
        </div>
      </template>
      <template #search>
        <a-input-search
          v-model:value.trim="searchdata"
          :placeholder="
            modelType === 1 ? t('attack.attPlace') : t('risk.riskPlace')
          "
          class="searchIn"
          @search="onSearch"
          @change="onSearch"
        />
      </template>
      <template #mark>
        <a-button type="link" v-if="!handleType" @click="showCheckbox">
          <template #icon>
            <CarryOutOutlined />
          </template>
          {{ t('common.batchHandle') }}
        </a-button>
      </template>
      <template #export>
        <ExportOutlined @click="exportFile" class="exportIc" />
      </template>
    </page-header>
    <!-- 页头 end -->
    <!-- 数据表 start -->
    <slots-table
      :class="{ showHandle: handleType }"
      class="dataTable"
      ref="tableRef"
      :columns="columns"
      :row-key="rowKey"
      :get-list-func="getTableList"
      :arguments="agms"
      :customRow="customRow"
      :isCheck="isCheck"
      :customReload="reloadTree"
    />
    <!-- 数据表 end -->
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  toRefs,
  watch,
  unref,
  computed
} from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { pageHeader, drawDetail } from '@/components/attack-risk-cmts'
import { Input } from 'ant-design-vue'
import { ExportOutlined, CarryOutOutlined } from '@ant-design/icons-vue'
import { getTableList } from '@/api/attack_risk'
import { useClickRow } from '@/hooks'
import { initRowSelection } from '@/components/slots-table/hooks'
import { MODELTYPE } from '@/enums/attack_risk'
import { batchHandleRecord, useColumns } from './index'
import store from '@/store'
import { getQueryValue, exportExcel } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    pageHeader,
    SlotsTable,
    ExportOutlined,
    CarryOutOutlined,
    [Input.Search.name]: Input.Search
  },
  props: {
    handleType: Number,
    selectedKeys: String as PropType<string>,
    selectedTitle: String,
    reloadTree: Function,
    modelType: Number
  },
  setup(props) {
    const { t } = useI18n()
    //工厂函数getColumns
    const columns = useColumns(props.modelType!)
    //刷新表格的方法
    const refreshTable = () => {
      tableRef.value.refreshTableData()
    }
    //刷新表格和树
    const reload = (): void => {
      props.reloadTree!()
      refreshTable()
    }

    const rowKey = ({ host_id, content_md5, dtype, create_at }) =>
      host_id + ',' + content_md5 + ',' + dtype + ',' + create_at

    const isCheck = ref<boolean>(false)
    const tableRef = ref<any>(null)
    //单机行的事件
    const customRow = useClickRow(drawDetail, {
      reload,
      modelType: props.modelType!
    })

    //表格筛选条件
    const agms = reactive({
      searchdata: getQueryValue('ip') ?? '',
      handle: props.handleType,
      riskpath: props.selectedKeys
    })
    //监听入参
    watch(
      () => [props.handleType, props.selectedKeys],
      ([newH, newA]) => {
        if (newH) {
          isCheck.value = false
        }
        agms.handle = newH as number
        agms.riskpath = newA! as string
        refreshTable()
      }
    )
    watch(
      () => agms,
      () => {
        initRowSelection()
      },
      {
        deep: true
      }
    )
    //不改变数据源的情况下，会缓存选中的数据，如果换了数据源，这里会有问题。
    const showCheckbox = () => {
      isCheck.value = !isCheck.value
    }

    //筛选条件确定
    const btnConfirm = (v) => {
      Object.assign(agms, { ...v })
      refreshTable()
    }

    // 搜索框变化刷新表格
    const onSearch = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        refreshTable()
      }
      if (!value && !e) {
        refreshTable()
      }
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
      await batchHandleRecord(agms, unref(isSelectAll), sendKesArr, reload)
      // 初始化多选
      initRowSelection()
    }

    //导出
    const exportFile = () => {
      // exportFileExcel({ filter: agms as any })
      exportExcel('/api/export/riskinfo', { filter: agms })
    }
    return {
      ...toRefs(agms),
      rowKey,
      isSelectAll,
      excludeRowKeys,
      agms,
      onSearch,
      columns,
      getTableList,
      showCheckbox,
      btnConfirm,
      tableRef,
      customRow,
      isCheck,
      refreshTable,
      batchHandle,
      MODELTYPE,
      exportFile,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import url('@/components/attack-risk-cmts/style/index.less');
</style>
