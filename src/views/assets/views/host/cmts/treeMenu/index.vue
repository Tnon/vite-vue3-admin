<template>
  <div>
    <!-- 全部主机 start -->
    <div
      class="allGroup allnode"
      @click="selectGroupAll"
      :class="{ active: selectedKeys[0] === GROUPENUM.ALL }"
    >
      <span class="title">{{ t('common.allHost') }}</span>
      <span class="value" :title="totalCount">{{ totalCount }}</span>
    </div>
    <!-- 全部主机 end -->

    <!-- 分割线 start -->
    <div class="line"></div>
    <!-- 分割线 end -->

    <!-- 自定义分组 start -->
    <div class="addSelf">
      <span class="label">{{ t('asset.customGroup') }}</span>
      <PlusOutlined class="iconadd" @click="addNewGroup" />
    </div>
    <!-- 自定义分组 end -->

    <!-- 分组树 start -->
    <a-tree
      blockNode
      draggable
      :replaceFields="replaceFields"
      :tree-data="treeData"
      :selectedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys"
      class="treeContainer"
      @select="selectGroup"
      @drop="onDrop"
      @dragenter="onDragEnter"
    >
      <!-- 自定义图标 start -->
      <template #switcherIcon>
        <DownOutlined class="arrowicon" />
      </template>
      <!-- 自定义图标 end -->

      <!-- 组信息 start -->
      <template #title="{ name, host_count, id, kv_path }">
        <div class="node">
          <span class="title" :title="name">{{ name }}</span>
          <span class="initValue value" :title="host_count">
            {{ host_count }}
          </span>
          <span class="btn">
            <popover-list
              :id="id"
              :name="name"
              :kv_path="kv_path"
              @on-refreshTable="refreshTable"
              v-model:selectedKeys="selectedKeys"
              v-model:gTitle="selectedName"
            />
          </span>
        </div>
      </template>
      <!-- 组信息 end -->
    </a-tree>
    <!-- 分组树 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, reactive, unref } from 'vue'
import { Tree } from 'ant-design-vue'
import { replaceFields } from './index'
import addModal from '../addModal'
import { useModal } from '@/hooks'
import store from '@/store'
import { TreeDragEvent, DropEvent } from 'ant-design-vue/es/tree/Tree'
import { DownOutlined, PlusOutlined } from '@ant-design/icons-vue'
import PopoverList from './popList'
import { moveGroup, addGroup } from '@/api/asset/host'
import { MoveEnum, GROUPENUM } from '@/enums/moveGroup'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    group_id: {
      type: Number as PropType<number>
    },
    expId: {
      type: Array as PropType<number[]>
    },
    gTitle: String
  },
  components: {
    PopoverList,
    [Tree.name]: Tree,
    DownOutlined,
    PlusOutlined
  },
  setup(
    props: {
      group_id: number
      expId: number[]
      gTitle: string
    },
    { emit }
  ) {
    const { t } = useI18n()
    //主机树
    const treeData = computed(() => store.getters['hostGroup/hostGroupGetr'])

    //主机总数量
    const totalCount = computed(() => store.getters['hostGroup/hostCountGetr'])

    //选中的组[id]
    const selectedKeys = computed({
      get: () => [props.group_id],
      set: (val: number[]) => emit('update:group_id', val[0])
    })
    //展开的组[ids]
    const expandedKeys = computed({
      get: () => props.expId,
      set: (val: number[]) => emit('update:expId', val)
    })
    //选中的组名字 string
    const selectedName = computed({
      get: () => props.gTitle,
      set: (val: string) => emit('update:gTitle', val)
    })

    //新增分组
    const addNewGroup = () => {
      useModal(
        {
          title: t('asset.newGroup'),
          contentProps: {
            fields: reactive({})
          },
          handleOk: async (conRef) => {
            await unref(conRef.formRef).validate()
            const { id: resId } = await addGroup({
              parentId: GROUPENUM.ALL,
              name: unref(conRef).fields.groupName
            })
            if (resId) {
              getGroupTree()
            }
          }
        },
        addModal
      )
    }

    //选择全部主机
    const selectGroupAll = (): void => {
      selectedKeys.value = [GROUPENUM.ALL]
      selectedName.value = t('common.allHost')
    }
    //选择树节点

    const selectGroup = (group_id: number[], { selectedNodes }): void => {
      const { length } = selectedNodes
      if (!length) {
        return
      } else {
        selectedKeys.value = group_id
      }
      const {
        props: {
          dataRef: { name }
        }
      } = selectedNodes[0]
      // emit('update:gTitle', name)
      selectedName.value = name
    }
    //获取分组树
    async function getGroupTree() {
      store.dispatch('hostGroup/getHostGroups')
    }
    getGroupTree()

    //拖拽节点，主动展开，可以有，可以不要
    const onDragEnter = (info: TreeDragEvent) => {
      if (info.node.dragOver) {
        expandedKeys.value = info.expandedKeys as number[]
      }
    }
    //刷新表格
    const refreshTable = () => {
      emit('refreshTable')
    }
    //拖拽
    const onDrop = async (info: DropEvent) => {
      const { eventKey: target_group_id } = info.node
      const { eventKey: group_id } = info.dragNode
      const dropPos = info.node.pos.split('-')
      //-1  target前 0 target 1 target 下
      const flag: MoveEnum =
        info.dropPosition - Number(dropPos[dropPos.length - 1])
      //移动未分组
      if (group_id === GROUPENUM.UNGROUP) {
        return false
      }
      //移动到未分组上或中或下
      if (target_group_id === GROUPENUM.UNGROUP) {
        return false
      }
      //其他移动
      await moveGroup({
        group_id,
        target_group_id,
        flag
      })
      await getGroupTree()
      //派发一个刷新表格的事件
      // if (group_id === unref(selectedKeys)[0]) {
      refreshTable()
      // }
    }
    return {
      selectedName,
      onDrop,
      GROUPENUM,
      onDragEnter,
      selectedKeys,
      expandedKeys,
      treeData,
      totalCount,
      selectGroupAll,
      selectGroup,
      addNewGroup,
      replaceFields,
      refreshTable,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
