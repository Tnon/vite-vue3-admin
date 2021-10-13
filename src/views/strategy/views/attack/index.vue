<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-30 19:17:41
-->
<template>
  <div>
    <div class="header">
      <switch-nodes v-model:actived="black" size="small" :types="types" />
      <!-- 批量删除 start -->
      <batch-bar v-model:isCheck="isCheck" v-if="isCheck" class="batbar">
        <template #title>
          <!-- 已选{{ tableRef.selectAllNumber }}条记录 ,进行删除 -->
          {{ t('common.batRecord', [tableRef.selectAllNumber]) }}
        </template>
        <template #button>
          <a-button
            type="primary"
            :disabled="!tableRef.selectAllNumber"
            danger
            @click="delList"
          >
            {{ t('common.delete') }}
          </a-button>
        </template>
      </batch-bar>
      <!-- 批量删除 end -->

      <!-- 批量管理 start -->
      <a-button type="link" :class="{ actived: isCheck }" @click="showCheckBox">
        <CarryOutOutlined />
        {{ t('common.batchOpt') }}
      </a-button>

      <!-- 批量管理 end -->
    </div>
    <slots-table
      ref="tableRef"
      :columns="columns"
      :getListFunc="getAttackList"
      class="attackTable"
      :arguments="agms"
      :rowKey="rowKey"
      :allowCheckAll="false"
      :isCheck="isCheck"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  toRefs,
  unref,
  computed
} from 'vue'
import switchNodes from '@/components/switchNodes'
import { SlotsTable } from '@/components/slots-table'
import { types, useColumns } from './index'
import { getAttackList, delAttackList } from '@/api/strategy/attack'
import { CarryOutOutlined } from '@ant-design/icons-vue'
import { initRowSelection } from '@/components/slots-table/hooks'
import { batchBar } from '@/components/batch-bar'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    switchNodes,
    SlotsTable,
    batchBar,
    CarryOutOutlined
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    //全选
    const isCheck = ref<boolean>(false)
    //表格
    const tableRef = ref<any>('')
    //条件
    const agms = reactive({
      black: 1
    })
    //
    //获取选中行
    const selectedKeys = computed(() =>
      unref(tableRef).rowSelection
        ? unref(tableRef).rowSelection.selectedRowKeys
        : []
    )
    //黑白切换
    watch(
      () => agms.black,
      () => {
        initRowSelection()
        tableRef.value.refreshTableData()
      }
    )
    //批量管理
    const showCheckBox = () => {
      isCheck.value = !isCheck.value
    }
    //主键
    const rowKey = ({ contentmd5, dtype, osver }) =>
      contentmd5 + ',' + dtype + ',' + osver
    //批量删除
    const delList = async () => {
      const list: any = []
      unref(selectedKeys).forEach((ele) => {
        const [contentmd5, dtype, osver] = ele.split(',')
        list.push({
          contentmd5,
          dtype: ~~dtype,
          osver,
          black: agms.black
        })
      })
      await delAttackList({ list })
      initRowSelection()
      tableRef.value.refreshTableData()
    }
    return {
      ...toRefs(agms),
      rowKey,
      types,
      tableRef,
      columns,
      getAttackList,
      agms,
      showCheckBox,
      isCheck,
      delList,
      selectedKeys,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 56px;
  justify-content: space-between;
  .title {
    font-weight: 700;
    font-size: 16px;
  }
  .line {
    display: inline-block;
    width: 1px;
    height: 16px;
    background: #eee;
    margin: 0 16px;
  }
  .delBtn {
    margin-left: 16px;
  }
}
.attackTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 129px);
  }
}
.actived {
  background: #eee;
}
.batbar {
  margin: 0 16px;
}
</style>
