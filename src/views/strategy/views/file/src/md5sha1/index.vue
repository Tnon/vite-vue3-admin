<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-12 16:59:21
-->
<template>
  <div class="container">
    <div class="header">
      <!-- 批量删除 start -->
      <batch-bar v-model:isCheck="isCheck" v-if="isCheck" class="batbar">
        <template #title>
          <!-- 已选{{ tableRef.selectAllNumber }}条策略 ,进行删除 -->
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
          placeholder="MD5/SHA1"
          @search="onSearch"
          @change="onSearch"
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

      <!-- 添加策略 start -->
      <a-button type="primary" @click="addStrategy">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ t('strategy.addStra') }}
      </a-button>
      <!-- 添加策略 end -->
    </div>
    <slots-table
      class="md5Table"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :allowCheckAll="false"
      :get-list-func="getMd5Sha1List"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { getMd5Sha1List, addMd5Sha1, delMd5Sha1 } from '@/api/strategy/file'
import { useColumns } from './index'
import { useModal } from '@/hooks'
import { PlusOutlined, CarryOutOutlined } from '@ant-design/icons-vue'
import addStrategyForm from './form/index.vue'
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
    CarryOutOutlined,
    batchBar
  },
  setup(props) {
    const { t } = useI18n()
    const columns = useColumns(t)
    //表格元素
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
    //添加策略
    const addStrategy = () => {
      useModal(
        {
          title:
            props.listType === 1
              ? t('strategy.addBlackFile')
              : t('strategy.addWhiteFile'),
          contentProps: {
            fields: reactive({
              name: '',
              osver: '',
              remarks: '',
              md5: '',
              sha1: '',
              mdOrShatype: []
            })
          },
          handleOk: async (contentRef) => {
            try {
              await contentRef.validate()
            } catch {
              return Promise.reject('')
            }
            await addMd5Sha1(
              Object.assign({}, contentRef.fields, {
                type: props.listType + '',
                methods: 'add'
              })
            )
            tableRef.value.refreshTableData()
          }
        },
        addStrategyForm
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
      await delMd5Sha1({ ids: tableRef.value.rowSelection.selectedRowKeys })
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
      getMd5Sha1List,
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
.batbar {
  margin-left: 220px;
}
.md5Table {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 179px);
  }
}
</style>
