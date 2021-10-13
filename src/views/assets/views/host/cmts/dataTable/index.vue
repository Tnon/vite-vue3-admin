<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-29 18:57:47
 * @LastEditTime: 2021-10-12 17:33:58
-->
<template>
  <div class="box">
    <slots-table
      ref="tableRef"
      v-model:columns="columns"
      row-key="host_id"
      :isCheck="isCheck"
      :get-list-func="getHostList"
      :arguments="agms"
      :disabledKeys="disabledKeys"
      class="hostTable"
      :get-can-select-func="getoffLineNumber"
      :class="{ show_group_path: group_checked }"
    >
      <template #customTitle>
        <div class="lastFiled">
          <span>{{ t('asset.lastOffLineTime') }}</span>
          <a-popover
            trigger="click"
            destroyTooltipOnHide
            placement="bottomRight"
            overlayClassName="groupCheckPop"
            :getPopupContainer="getPopupContainer"
          >
            <template #content>
              <div class="content">
                <span>{{
                  t('asset.showBasic') + ' ' + t('asset.groupPath')
                }}</span>
                <a-switch class="swtIcon" v-model:checked="group_checked" />
              </div>
            </template>
            <SettingOutlined class="ticon" />
          </a-popover>
        </div>
      </template>
    </slots-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { useColumns } from './columns'
import { getHostList, getoffLineNumber } from '@/api/asset/host'
import { SlotTableProps, SelfAgus } from './type'
import { SettingOutlined } from '@ant-design/icons-vue'
import { Popover } from 'ant-design-vue'
import { initRowSelection } from '@/components/slots-table/hooks'
import { useI18n } from 'vue-i18n'
import store from '@/store'
export default defineComponent({
  name: 'UserListPage',
  components: {
    SlotsTable,
    SettingOutlined,
    [Popover.name]: Popover
  },
  props: {
    agms: {
      type: Object as PropType<SelfAgus>
    },
    boxType: String,
    isCheck: Boolean,
    disabledKeys: Array
  },
  setup(props: SlotTableProps, { emit }) {
    const { t } = useI18n()
    const columns = useColumns(t)
    const getPopupContainer = (e) => e.parentNode
    //分组路径是否展示
    const group_checked = ref<boolean>(true)

    //获取元素
    const tableRef = ref<any>(null)

    //抛出一个刷新表格的方法
    const refreshTable = () => {
      tableRef.value.refreshTableData(false)
    }
    //监听所有的条件 刷新表格
    watch(
      [
        () => props.agms.secure_status,
        () => props.agms.online,
        () => props.agms.osver,
        () => props.agms.groups,
        () => props.agms.tags,
        () => props.agms.update_time,
        () => props.agms.group_id
      ],
      () => {
        //初始化仓库 选择
        initRowSelection()
        //重绘
        refreshTable()
        //刷新树
        store.dispatch('hostGroup/getHostGroups')
        //刷新卡片
        emit('refreshFilter')
      }
    )

    return {
      group_checked,
      tableRef,
      columns,
      getHostList,
      refreshTable,
      getPopupContainer,
      getoffLineNumber,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.show_group_path {
  ::v-deep(.prevNodes) {
    display: inline-block !important;
  }
}
.hostTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 243px);
  }
}
.box {
  margin: 8px 24px 16px;
  box-shadow: 2px 0px 16px 0px rgba(0, 0, 0, 0.04);
}
.lastFiled {
  position: relative;
  .ticon {
    position: absolute;
    right: 20px;
    cursor: pointer;
    font-size: 16px;
  }
}
.btnBorder {
  border: 1px solid #eee;
  margin-right: 15px;
}
.actived {
  background: #18ba79;
  color: #fff !important;
  &:hover {
    color: #fff !important;
  }
}
</style>
