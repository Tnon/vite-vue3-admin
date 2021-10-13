<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2021-10-12 17:39:31
-->
<template>
  <div class="confitBar">
    <div class="leftOP">
      <span class="label">
        <!-- 已选{{ dataTableRef.tableRef.selectAllNumber }}台主机 -->
        {{ t('asset.selectedHost', [dataTableRef.tableRef.selectAllNumber]) }}
      </span>
      <div v-if="boxType == 'move'" class="leftOP">
        <span class="label rlabel">{{ t('asset.moveGroupMsg') }}</span>
        <span class="selectTree">
          <select-tree
            :dataSource="treeData"
            v-model:selectedKeys="groups"
            :placeholder="t('asset.selectMG')"
          />
        </span>
      </div>
      <div v-else>
        <span class="label">{{ t('asset.delGMsg') }}</span>
      </div>
    </div>
    <div>
      <a-button type="link" @click="hideBar">{{ t('common.cancle') }}</a-button>
      <a-button
        @click="confirmMoveDel"
        type="primary"
        :danger="boxType !== 'move'"
        :disabled="!dataTableRef.tableRef.selectAllNumber"
      >
        {{ t('common.confirm') }}
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  PropType,
  computed,
  unref
} from 'vue'
import selectTree from '@/components/selectTree'
import { useGroupTree, useModal } from '@/hooks'
import { move_Group, del_Group } from '@/api/asset/host'
import { HostList } from '@/api/asset/model/assetsModel'
import store from '@/store'
import { initRowSelection } from '@/components/slots-table/hooks'
import { message } from 'ant-design-vue'
import { pwdConfirm } from '../pwdConfirm'
import { pCompile } from '@/utils/urlUtils'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    selectTree
  },
  props: {
    //全选时候带的条件结构体
    filter: {
      type: Object as PropType<HostList>
    },
    //删除 还是 移动
    boxType: {
      type: String
    },
    //表格开启check
    isCheck: Boolean,
    //表格父的ref,获取内容
    dataTableRef: Object
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    //获取选中行
    const selectedIds = computed(() =>
      props.dataTableRef!.tableRef.rowSelection
        ? props.dataTableRef!.tableRef.rowSelection.selectedRowKeys
        : []
    )
    //调用dispath请求到新的组树
    const treeData = useGroupTree('all')

    //获取全局是否全选
    const isSelectAll = computed(() => store.state['selectAll'].isSelectAll)

    //获取取消选择的ids
    const excludeHostIds: any = computed(() => store.state['selectAll'].exclude)

    //移入的目标组的id as [number]
    const state = reactive<{ groups: number }>({
      groups: -1
    })

    //初始化init
    const hideBar = () => {
      emit('update:boxType', '')
      emit('update:isCheck', false)
    }

    //移入分组和删除主机 确定按钮
    const confirmMoveDel = async () => {
      //没选分组
      if (state.groups === -1 && props.boxType === 'move') {
        message.error(t('asset.selectGroup'))
        return false
      }
      //移入分组和删除主机 接口
      let sendObj
      if (unref(isSelectAll)) {
        sendObj = {
          filter: props.filter,
          group_id: state.groups,
          exclude: unref(excludeHostIds).join(',')
        }
        // if (!sendObj.exclude.length) {
        //   message.error('请选择要移动的主机！')
        //   return false
        // }
      } else {
        sendObj = {
          group_id: state.groups,
          host_id_array: unref(selectedIds).join(',')
        }
        if (!sendObj.host_id_array.length) {
          message.error(
            props.boxType === 'move'
              ? t('asset.selectHost')
              : t('asset.seleDelHs')
          )
          return false
        }
      }

      //移动
      if (props.boxType === 'move') {
        await move_Group(sendObj)
      } else {
        useModal(
          {
            title: t('asset.surDelHs'),
            handleOk: async (contRef) => {
              //验证密码

              //删除
              delete sendObj['group_id']
              const { code } = await del_Group(
                Object.assign({}, sendObj, {
                  password: pCompile(contRef.pwdValue)
                })
              )
              //刷新下
              !code && refreshTreeAndTable()
            }
          },
          pwdConfirm
        )
        return
      }
      //刷新下
      refreshTreeAndTable()
    }
    const refreshTreeAndTable = async () => {
      //派发刷新表格的事件
      await emit('refreshTable')
      await store.dispatch('hostGroup/getHostGroups')
      //初始化
      initRowSelection()
    }
    return {
      ...toRefs(state),
      // isSelectAll,
      // selectAllNumber,
      treeData,
      hideBar,
      confirmMoveDel,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.confitBar {
  .leftOP {
    display: flex;
    align-items: center;
    .label {
      font-size: 14px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
    }

    .rlabel {
      margin-right: 16px;
    }
    .selectTree {
      width: 200px;
    }
  }
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 0 16px;
  margin-right: 16px;
  background: rgba(24, 186, 121, 0.1);
  border-radius: 8px;
}
</style>
