<template>
  <!-- <div> -->
  <!-- {{ rowSelection }} -->
  <!-- {{ disabledKeys }} -->
  <div class="tableContent">
    <a-table
      :columns="columns"
      :loading="loading"
      :customRow="customRowInit"
      :rowKey="rowKey"
      size="middle"
      :data-source="dataSource"
      :pagination="pageOption"
      @change="paginationChange"
      :rowSelection="rowSelection"
      v-bind="{ ...$props, ...$attrs }"
    >
      <!--  v-bind="{ ...$props, ...$attrs }" -->

      <!--  自定义slots start-->
      <template v-for="(value, key) in $slots" v-slot:[key]="slotProps">
        <slot :name="key" v-bind="slotProps"></slot>
      </template>
      <!--    自定义slots end-->

      <!--    是否有自定义显示slots start-->
      <template
        v-for="slotItem in columns.filter((item) => item.slots)"
        :key="slotItem.dataIndex || slotItem.slots.customRender"
        v-slot:[slotItem.slots.customRender]="slotProps"
      >
        <!--        自定义渲染start-->
        <slot
          v-if="$slots[slotItem.slots.customRender]"
          :name="slotItem.slots.customRender"
          v-bind="slotProps"
        />
        <!--        自定义渲染end-->

        <!--     非自定义渲染start -->
        <template v-else>
          <!--        非操作 start-->
          <template v-if="slotItem.slots.customRender.indexOf('action') < 0">
            <!--        使用自定义组件格式化显示start-->
            <template v-if="slotItem.slotsType == 'component'">
              <component
                :is="
                  slotItem.slotsFunc(slotProps.record, refreshTablAndCunstom)
                "
              />
            </template>
            <!--        使用自定义组件格式化显示end-->
          </template>
          <!--      非操作 end-->

          <!--        操作start-->
          <div
            v-if="slotItem.slots.customRender.indexOf('action') > -1"
            :key="slotItem.slots.customRender"
            class="actions"
          >
            <!--        对表格的操作动作start-->
            <template v-for="(action, index) in slotItem.actions">
              <!--            按钮-->
              <template v-if="action.type == 'button'">
                <a-button
                  v-permission="action.permission"
                  v-bind="{ ...buttonProps, ...action.props }"
                  @click="actionEvent(slotProps.record, action.func)"
                  :key="index"
                >
                  {{ action.text }}
                </a-button>
              </template>
              <!--            switch-->
              <template v-if="action.type == 'switch'">
                <a-switch
                  :checked="slotProps.record[slotItem.dataIndex] === 'T'"
                  v-bind="action.props"
                  @click="
                    toogleEnable(
                      $event,
                      slotItem.dataIndex,
                      slotProps.record,
                      action.func
                    )
                  "
                />
              </template>
              <!--            自定义按钮-->
              <template v-if="action.type == 'icon'">
                <a-popover
                  v-if="!(action.disabled && action.disabled(slotProps.record))"
                  placement="leftTop"
                  trigger="click"
                  overlayClassName="popNoPad"
                  destroyTooltipOnHide
                  :getPopupContainer="getPopupContainer"
                >
                  <template #content>
                    <div v-for="item in action.actionList">
                      <a-popconfirm
                        v-if="item.type === 'popconfirm'"
                        placement="leftTop"
                        overlayClassName="popHasPad"
                        :getPopupContainer="getPopupContainer"
                        @confirm="
                          actionEvent(slotProps.record, item.func, 'del')
                        "
                      >
                        <template v-slot:title>
                          {{ t('common.confirmDel') }}
                        </template>
                        <!-- 批量删除时候，不让删除   全局默认策略不让删除 -->
                        <a-button
                          v-if="
                            !isCheck &&
                            !(item.disabled && item.disabled(slotProps.record))
                          "
                          class="noradiuBtn"
                          type="link"
                        >
                          {{ item.text }}
                        </a-button>
                      </a-popconfirm>
                      <a-button
                        v-else
                        class="noradiuBtn"
                        type="link"
                        @click="actionEvent(slotProps.record, item.func)"
                      >
                        {{ item.text }}
                      </a-button>
                    </div>
                  </template>
                  <a-button type="link" class="iconBtn">
                    <EllipsisOutlined />
                  </a-button>
                </a-popover>
                <a-button type="link" v-else disabled class="iconBtn">
                  <EllipsisOutlined />
                </a-button>
              </template>
              <!--            删除按钮 气泡确认框-->
              <template v-if="action.type == 'popconfirm'">
                <a-popconfirm
                  :key="index"
                  placement="leftTop"
                  @confirm="actionEvent(slotProps.record, action.func, 'del')"
                >
                  <template v-slot:title>
                    {{ t('common.confirmDel') }}
                  </template>
                  <a-button v-bind="{ ...buttonProps, ...action.props }">
                    {{ action.text }}
                  </a-button>
                </a-popconfirm>
              </template>
            </template>
            <!--        对表格的操作动作end-->
          </div>
          <!--      操作end-->
        </template>
        <!--      非自定义渲染end-->
      </template>
      <!--    是否有自定义显示slots end-->
    </a-table>
    <!-- 全选 start -->
    <div class="selectAllTools" v-if="rowSelection && allowCheckAll">
      <a-button
        type="link"
        @click="selectAllRows(true)"
        class="checkAll btnBorder"
        :class="{ actived: isSelectAll }"
      >
        {{ t('common.selectAll') }}
      </a-button>
      <a-button
        type="link"
        @click="selectAllRows(false)"
        class="uncheckAll btnBorder"
      >
        {{ t('common.cancle') }}
      </a-button>
    </div>
    <!-- 全选 end -->
  </div>

  <!-- </div> -->
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  PropType,
  toRefs,
  computed,
  watch,
  unref,
  ref,
  onUnmounted
} from 'vue'
import {
  Select,
  Table,
  Popconfirm,
  Popover,
  Button,
  Switch
} from 'ant-design-vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { TableProps } from 'ant-design-vue/lib/table/interface'
import { usePages } from '@/hooks'
import { useRowSelection, initRowSelection } from './hooks'
import {
  Columns,
  pageOption,
  Props,
  ExtraFunc,
  DisbKeys,
  TableRowSelection
} from './types'
import store from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'slots-table',
  props: {
    columns: {
      type: Object as PropType<Columns[]>,
      default: () => []
    },
    customRow: {
      type: Function
    },
    getListFunc: {
      // 获取列表数据函数API
      type: Function
    },
    getCanSelectFunc: {
      // 获取可选数量
      type: Function
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    allowCheckAll: {
      type: Boolean,
      default: true
    },
    rowKey: {
      // 表格唯一字段
      type: [String, Function] as PropType<string | ((record: any) => string)>
    },
    pageOption: {
      // 分页参数
      type: Object as PropType<pageOption>,
      default: () => ({})
    },
    arguments: {
      type: Object as PropType<Arguments>
    },
    extraFunc: {
      type: Object as PropType<ExtraFunc>,
      default: () => ({
        sortVsb: false,
        dragRow: false,
        dragCol: false
      })
    },
    totalNum: {
      type: Number,
      default: 0
    },
    disabledKeys: {
      type: Array as PropType<DisbKeys[]>,
      default: () => []
    },
    //自定义刷新项
    customReload: {
      type: Function,
      default: () => ({})
    }
  },
  components: {
    [Table.name]: Table,
    [Select.name]: Select,
    [Popconfirm.name]: Popconfirm,
    Option: Select.Option,
    [Popover.name]: Popover,
    [Button.name]: Button,
    [Switch.name]: Switch,
    EllipsisOutlined
  },
  setup(props: Props, { emit }) {
    const { t } = useI18n()

    const getPopupContainer = (e) => e.parentNode

    //开启分页
    const pageOption = usePages()

    // 开启表格列排序和显示隐藏
    // const changeColumns = useDragOrder(props, emit)

    // 开启表格伸缩列
    // if (props.extraFunc.dragCol) {
    //   useDragCol(props.columns)
    // }

    //表格动态选择列，初始化
    let dynaRowSelection = reactive<TableRowSelection>({
      rowSelection: undefined
    })
    // 主机总数
    const totalCount = ref<number>(0)

    //表格数据源，行事件，分页，加载
    const state = reactive({
      dataSource: [], // 表格数据
      customRowInit: () =>
        Object.assign({}, props.customRow) as TableProps['customRow'],
      pageOption: Object.assign(pageOption.value, props.pageOption), // 表格分页
      loading: false // 表格加载
    })

    //表格刷新初始化
    const initTableData = () => {
      state.dataSource = []
      emit('update:totalNum', undefined)
      state.pageOption.total = 0
      state.pageOption.current = 1
      state.pageOption.pageSize = 10
    }

    //动态组件监听api变化，重绘表格
    watch(
      () => props.getListFunc,
      () => {
        initTableData()
        refreshTableData()
      }
    )

    //获取全局是否全选
    const isSelectAll = computed(() => store.state['selectAll'].isSelectAll)
    //其他刷新和表格一起刷新
    const refreshTablAndCunstom = (keepPage?: boolean) => {
      refreshTableData(keepPage)
      props.customReload!()
    }
    // 获取表格数据
    const refreshTableData = async (keepPage?: boolean, aru = {}) => {
      if (!keepPage) {
        //初始化页数和当前页数量
        state.pageOption.current = 1
        state.pageOption.pageSize = 10
      }
      //表格入参
      let params: tableParams<any> = {
        page: {
          page_index: state.pageOption.current,
          page_size: state.pageOption.pageSize
        },
        filter: {
          ...props.arguments,
          ...aru
        }
      }
      //有选择框&&全选清空 当前选项
      if (props.isCheck && unref(isSelectAll)) {
        if (dynaRowSelection.rowSelection) {
          dynaRowSelection.rowSelection!.selectedRowKeys = []
        }
      }
      //表格loading
      state.loading = true
      //请求表格数据
      let { items, page_index, page_size, total } = await props
        .getListFunc(params)
        .finally((e) => {
          state.loading = false
        })
      //更新分页
      Object.assign(state.pageOption, {
        current: ~~page_index,
        // pageSize: ~~page_size,
        total: ~~total
      })
      //赋值
      state.dataSource = items || []

      // if (props.extraFunc.dragRow) {
      //   state.customRowInit = Object.assign(
      //     useDraggable<any>(state.dataSource)!,
      //     props.customRow
      //   )
      // }
      //
      //获取可选择总数
      if (
        props.isCheck &&
        props.allowCheckAll &&
        props.disabledKeys.length &&
        unref(isSelectAll)
      ) {
        const { count } = await props.getCanSelectFunc(props.arguments)
        totalCount.value = count ?? 0
      } else {
        totalCount.value = total
      }
      //有的表格需要条数总量，抛出总量
      if (props.totalNum !== undefined) {
        emit('update:totalNum', total)
      }
      //刷新树或其他
      // props.customReload && props.customReload()
    }
    //请求表格数据
    refreshTableData()

    // 操作事件
    const actionEvent = async (record, func, actionType) => {
      // 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
      await func({ record, props }, refreshTableData)
      // 如果为删除操作,并且删除成功，当前的表格数据条数小于2条,则当前页数减一,即请求前一页
      if (actionType == 'del') {
        // ;(document.getElementsByClassName('iconBtn')[0] as any).click()
        // state.pageOption.current = Math.max(1, state.pageOption.current - 1)
      }
    }
    // 分页，排序，筛选
    const paginationChange = (pagination, filters, sorter) => {
      let { field, order } = sorter
      field = order ? field : undefined
      order = order === 'ascend' ? 1 : order === 'descend' ? 0 : undefined
      state.pageOption = {
        ...state.pageOption,
        ...pagination
      }
      refreshTableData(true, {
        ...filters,
        field,
        order
      })
    }

    //监听外部传来的是否开启选择列
    watch(
      [() => props.isCheck, () => props.disabledKeys, () => props.rowKey],
      ([isCheck]) => {
        //记录开启全选
        store.commit('selectAll/setIsCheck', isCheck)

        dynaRowSelection.rowSelection = useRowSelection(
          props.rowKey,
          props.isCheck,
          props.disabledKeys
        )
      }
    )

    //全选和取消全选
    const selectAllRows = (type) => {
      //更新仓库是否全选
      store.commit('selectAll/setIselectAll', type)

      //取消全选 初始化未选的  和  已选的
      // if (!type) {
      store.commit('selectAll/InitExclude')
      dynaRowSelection.rowSelection!.selectedRowKeys = []
      // }

      //重绘表格，getcheckprops重绘
      refreshTableData()
    }
    //选择的最终数量

    //获取取消选择的ids
    const excludeHostIds: any = computed(() => store.state['selectAll'].exclude)
    //最终选择条数（全选）
    const selectAllNumber = computed(() => {
      if (unref(isSelectAll)) {
        return unref(totalCount) - unref(excludeHostIds).length
      } else {
        if (props.isCheck) {
          if (dynaRowSelection.rowSelection) {
            return dynaRowSelection.rowSelection!.selectedRowKeys.length
          }
          return 0
        }
        return 0
      }
    })

    //行内按钮属性
    const buttonProps = {
      size: 'small'
    }
    //处理switch的逻辑
    const toogleEnable = (event, dataindex, record, func) => {
      // record[dataindex] = event ? 'T' : 'F'
      func({ record, event }, refreshTableData)
    }

    onUnmounted(() => {
      initRowSelection()
    })
    return {
      ...toRefs(state),
      ...toRefs(dynaRowSelection),
      buttonProps,
      actionEvent,
      refreshTableData,
      paginationChange,
      toogleEnable,
      selectAllRows,
      selectAllNumber,
      isSelectAll,
      excludeHostIds,
      refreshTablAndCunstom,
      getPopupContainer,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.ant-table .ant-table-title) {
  display: flex;

  .ant-btn {
    margin-right: 10px;
  }
}
// ::v-deep(.ant-table-footer) {
//   position: absolute;
// }
.actived {
  background: #18ba79;
  color: #fff !important;
  &:hover {
    color: #fff !important;
  }
}
.btnBorder {
  border: 1px solid #eee;
  margin-right: 15px;
}
.tableContent {
  position: relative;
  .selectAllTools {
    position: absolute;
    bottom: 10px;
    left: 16px;
  }
}
</style>
