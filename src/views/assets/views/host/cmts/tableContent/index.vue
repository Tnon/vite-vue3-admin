<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2021-09-26 19:39:24
-->
<template>
  <div>
    <!-- 内容头部  start-->
    <div class="header">
      <slot v-if="!boxType"></slot>
      <move-del-host
        v-else
        @refreshTable="refreshTable"
        :dataTableRef="dataTableRef"
        v-model:boxType="boxType"
        v-model:isCheck="isCheck"
        :filter="state"
      />

      <div class="roption">
        <!-- 搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="ip"
          :placeholder="t('common.hostIp')"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 搜索 end -->

        <!-- 批量管理 start -->
        <batch-manage
          v-model:boxType="boxType"
          v-model:disKey="disKey"
          v-model:isCheck="isCheck"
          @refreshTable="refreshTable"
        >
          {{ t('common.batchOpt') }}
        </batch-manage>
        <!-- 批量管理 end -->

        <!-- 高级筛选 start   这里可以直接传对象，待优化-->
        <advan-filter
          v-model:secure_status="secure_status"
          v-model:online="online"
          v-model:osver="osver"
          v-model:groups="groups"
          v-model:tags="tags"
          :group="group_id"
          v-model:update_time="update_time"
          v-model:swtchecked="swtchecked"
        >
          <span class="filter">
            {{ t('common.filter') }}
            <span class="flag" v-if="StateEffect !== String(group_id)" />
          </span>
        </advan-filter>
        <!-- 高级筛选 end -->

        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->

        <!-- 导出 start -->
        <ExportOutlined class="RIcon" @click="exportFile" />
        <!-- 导出 end -->
      </div>
    </div>
    <!-- 内容头部  end-->

    <!-- 卡片筛选 start 这里可以直接传对象，待优化-->
    <asset-filter
      v-model:secure_status="secure_status"
      v-model:online="online"
      v-model:osver="osver"
      v-show="swtchecked"
      :group_id="group_id"
      ref="assetFilterRef"
    />
    <!-- 卡片筛选 end -->

    <!-- 表格 start -->
    <data-table
      :agms="state"
      ref="dataTableRef"
      v-model:boxType="boxType"
      v-model:isCheck="isCheck"
      :disabledKeys="disKey.disabled_keys"
      @refreshFilter="refreshFilter"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  ref,
  watch,
  computed
} from 'vue'
import assetFilter from '../assetFilter'
import { ContentProps } from '../../type'
import batchManage from '../batchManage'
import advanFilter from '../advanFilter'
import dataTable from '../dataTable'
import MoveDelHost from '../MoveDelHost'
import { ExportOutlined } from '@ant-design/icons-vue'
import { HostList } from '@/api/asset/model/assetsModel'
import { useRoute } from 'vue-router'
import { exportExcel } from '@/utils/tools'
import { initRowSelection } from '@/components/slots-table/hooks'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ExportOutlined,
    assetFilter,
    batchManage,
    advanFilter,
    dataTable,
    MoveDelHost
  },
  props: {
    //选中的组ID
    group_id: {
      type: Number as PropType<number>
    }
  },
  setup(props: ContentProps) {
    const { t } = useI18n()
    //选择没选择
    const StateEffect = computed(() => {
      let flag = ''
      for (let k in state) {
        if (k !== 'ip') {
          flag += state[k]
        }
      }
      return flag
    })
    //路由 获取总览的参数
    const {
      query: { secure_status, online, osver, dataRange }
    } = useRoute()
    //table 元素父
    const dataTableRef = ref<any>(null)
    //卡片
    const assetFilterRef = ref<any>(null)
    //是否开启筛选列
    const isCheck = ref<boolean>(false)

    //禁选
    const disKey = reactive({
      disabled_keys: []
    })
    const refreshFilter = () => {
      assetFilterRef.value.getStatic({ group_id: props.group_id })
    }
    //调用子组件的刷新方法
    const refreshTable = () => {
      dataTableRef.value.refreshTable()
    }

    //卡片筛选是否显示（init:true）
    const swtchecked = ref<boolean>(true)

    //批量管理选项
    const boxType = ref<string>('')

    //选择框init
    const rowSelect = reactive({
      rowSelection: undefined
    })

    //条件的结构体
    const state = reactive<HostList>({
      secure_status: (secure_status as string) ?? '',
      online: (online as string) ?? '',
      osver: (osver as string) ?? '',
      groups: '',
      tags: '',
      update_time: (dataRange as string) ?? '',
      ip: '',
      group_id: props.group_id
    })
    //导出
    const exportFile = () => {
      exportExcel('/api/export/assets_host', { filter: state })
    }
    //这里由于reactive合并，将选中的组id直接合并到state结构体
    watch(
      () => props.group_id,
      (v) => {
        state.group_id = v
      }
    )
    // 搜索框变化刷新表格
    const onSearch = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        //初始化筛选
        initRowSelection()
        refreshTable()
      }
      if (!value && !e) {
        //初始化筛选
        initRowSelection()
        refreshTable()
      }
    }
    return {
      ...toRefs(rowSelect),
      ...toRefs(state),
      disKey,
      swtchecked,
      state,
      dataTableRef,
      boxType,
      refreshTable,
      isCheck,
      StateEffect,
      exportFile,
      onSearch,
      assetFilterRef,
      refreshFilter,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 48px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .roption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search {
      margin-right: 14px;
      width: 240px;
    }

    .line {
      width: 1px;
      height: 16px;
      background: #eeeeee;
      margin: 0 16px;
    }
    .RIcon {
      font-size: 16px;
      color: #666;
      cursor: pointer;
    }
  }
}
.filter {
  position: relative;
  .flag {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    right: -10px;
    background: #18ba79;
  }
}
</style>
