<template>
  <div>
    <!-- 卡片筛选 start -->
    <detailAssetsFilter v-model:actived="actived" :id="id" />
    <!-- 卡片筛选 end -->

    <!-- 表格 start-->
    <div class="box">
      <slots-table
        ref="tableRef"
        v-model:columns="columns"
        row-key="id"
        :get-list-func="api"
        class="hostDetailTable"
        :arguments="state"
      >
        <template #title>
          <a-input-search
            :placeholder="placeHodler"
            class="search"
            @search="onSearch"
            @change="onSearch"
            v-model:value.trim="name"
          />
          <a-range-picker
            class="datarange"
            v-if="actived == 'account'"
            v-model:value="daterange"
            show-time
            @change="ok"
            :format="dateFormat"
          />
        </template>
      </slots-table>
    </div>
    <!-- 表格 end-->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from 'vue'
import detailAssetsFilter from './cmts/detailAssetsFilter'
import { SlotsTable } from '@/components/slots-table'
import { useColumnsData } from './columns'
import { Agus, OthSta, Ftypes } from './type'
import { DatePicker } from 'ant-design-vue'
import { Moment } from 'moment'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    id: String
  },
  components: {
    detailAssetsFilter,
    [DatePicker.RangePicker.name]: DatePicker.RangePicker,
    SlotsTable
  },
  setup(props) {
    const { t } = useI18n()
    const columnsData = useColumnsData(t)
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    const tableRef = ref<any>()
    const state = reactive<Agus>({
      host_id: props.id!,
      name: '',
      daterange: ''
    })
    const othSta: any = reactive<OthSta>({
      actived: 'process',
      columns: columnsData['process'].columns,
      placeHodler: columnsData['process'].place,
      api: columnsData['process'].api
    })
    //时间范围
    const daterange = ref<Moment[]>([])
    //切换表头
    watch(
      () => othSta.actived,
      (v: Ftypes) => {
        othSta.columns = columnsData[v].columns
        othSta.api = columnsData[v].api
        state.daterange = ''
        state.name = ''
        othSta.placeHodler = columnsData[v].place
      }
    )
    const ok = (v) => {
      const [start, end] = v
      state.daterange = v.length
        ? start.format(dateFormat) + ',' + end.format(dateFormat)
        : ''
      tableRef.value.refreshTableData()
    }
    // 搜索框变化刷新表格
    const onSearch = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        tableRef.value.refreshTableData()
      }
      if (!value && !e) {
        tableRef.value.refreshTableData()
      }
    }
    return {
      ...toRefs(state),
      ...toRefs(othSta),
      state,
      dateFormat,
      ok,
      columnsData,
      tableRef,
      onSearch,
      daterange
    }
  }
})
</script>

<style lang="less" scoped>
.box {
  flex: 1;
  margin: 16px 24px;
  background: #fff;
  border-radius: 8px;
}
.search {
  width: 200px;
}
.datarange {
  width: 400px;
  margin-left: 16px;
}
.hostDetailTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 425px);
  }
}
</style>
