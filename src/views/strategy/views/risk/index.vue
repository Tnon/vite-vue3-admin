<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-14 17:00:36
-->
<template>
  <div>
    <div class="header">
      <div>
        <switch-nodes v-model:actived="black" size="small" :types="types" />
        <a-button
          v-if="isCheck"
          type="primary"
          class="delBtn"
          @click="delList"
          danger
        >
          删除
        </a-button>
      </div>

      <!-- 批量管理 start -->
      <a-button type="link" :class="{ actived: isCheck }" @click="showCheckBox">
        <CarryOutOutlined />
        批量管理
      </a-button>

      <!-- 批量管理 end -->
    </div>
    <slots-table
      ref="slotsRef"
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
import { types, columns } from './index'
import { getAttackList, delAttackList } from '@/api/strategy/attack'
import { CarryOutOutlined } from '@ant-design/icons-vue'
import { initRowSelection } from '@/components/slots-table/hooks'
export default defineComponent({
  components: {
    switchNodes,
    SlotsTable,
    CarryOutOutlined
  },
  setup() {
    //全选
    const isCheck = ref<boolean>(false)
    //表格
    const slotsRef = ref<any>('')
    //条件
    const agms = reactive({
      black: 1
    })
    //
    //获取选中行
    const selectedKeys = computed(() =>
      unref(slotsRef).rowSelection
        ? unref(slotsRef).rowSelection.selectedRowKeys
        : []
    )
    //黑白切换
    watch(
      () => agms.black,
      () => {
        initRowSelection()
        slotsRef.value.refreshTableData()
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
      slotsRef.value.refreshTableData()
    }
    return {
      ...toRefs(agms),
      rowKey,
      types,
      slotsRef,
      columns,
      getAttackList,
      agms,
      showCheckBox,
      isCheck,
      delList,
      selectedKeys
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
</style>
