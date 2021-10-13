<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-12 19:12:43
-->
<template>
  <div class="container">
    <div class="header">
      <!-- 批量删除 start -->
      <batch-bar v-model:isCheck="isCheck" v-if="isCheck" class="batbar">
        <template #title>
          {{ t('strategy.delPol', [tableRef.selectAllNumber]) }}
        </template>
        <template #button>
          <a-button
            type="primary"
            :disabled="!tableRef.selectAllNumber"
            danger
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
          @search="onSearch"
          @change="onSearch"
          :placeholder="t('asset.digiSign') + '/' + t('strategy.cerfing')"
        />
      </span>
      <!-- 搜索 end -->

      <!-- 批量标记 start -->
      <span class="mark" @click="showCheckbox">
        <a-button type="link">
          <template #icon>
            <ExportOutlined class="RIcon" />
          </template>
          {{ t('common.batchHandle') }}
        </a-button>
      </span>
      <!-- 批量标记 end-->

      <!-- 添加策略 start -->
      <a-button type="primary" @click="addStrategy">
        <template #icon>
          <PlusOutlined class="RIcon" />
        </template>
        {{ t('strategy.addStra') }}
      </a-button>
      <!-- 添加策略 end -->
    </div>
    <slots-table
      class="signTable"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      :arguments="agms"
      row-key="id"
      :get-list-func="getSignList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { getSignList, addSign, delSignList } from '@/api/strategy/file'
import { useColumns } from './index'
import { useModal } from '@/hooks'
import { PlusOutlined, ExportOutlined } from '@ant-design/icons-vue'
import slotsForm from '@/components/slots-form'
import { batchBar } from '@/components/batch-bar'
import { initRowSelection } from '@/components/slots-table/hooks'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    listType: Number
  },
  components: {
    SlotsTable,
    PlusOutlined,
    ExportOutlined,
    batchBar
  },
  setup(props) {
    const { t } = useI18n()
    const columns = useColumns(t)
    const tableRef: any = ref<HTMLElement>()
    //数据结构体
    const agms = reactive({
      type: props.listType!,
      search_data: ''
    })

    //不改变数据源的情况下，会缓存选中的数据，如果换了数据源，这里会有问题。
    const isCheck = ref<boolean>(false)
    const showCheckbox = () => {
      isCheck.value = !isCheck.value
    }

    const addStrategy = () => {
      useModal(
        {
          width: 600,
          title:
            props.listType === 1
              ? t('strategy.addBSign')
              : t('strategy.addWSign'),
          handleOk: async (contRef) => {
            await contRef.validate()
            await addSign(
              Object.assign({}, contRef.fields, {
                type: props.listType,
                methods: 'add'
              })
            )
            tableRef.value.refreshTableData()
          },
          contentProps: {
            colsMap: columns,
            fields: reactive({ signature: '', certificate: '' })
          }
        },
        slotsForm
      )
    }
    //黑白切换 刷新表格
    watch(
      () => props.listType!,
      (v) => {
        agms.type = v!
        tableRef.value.refreshTableData()
      }
    )
    //批量删除
    const delStrategy = async () => {
      await delSignList({ ids: tableRef.value.rowSelection.selectedRowKeys })
      await tableRef.value.refreshTableData()
      initRowSelection()
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
      ...toRefs(agms),
      agms,
      columns,
      tableRef,
      getSignList,
      addStrategy,
      showCheckbox,
      isCheck,
      delStrategy,
      onSearch,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.container {
  margin-top: -50px;
}
.header {
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: flex-end;
  right: 0;
  z-index: 1;
  top: 0;
  .mark {
    margin: 0 16px;
  }
}
.signTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 163px);
  }
}
.batbar {
  margin-left: 220px;
}
</style>
