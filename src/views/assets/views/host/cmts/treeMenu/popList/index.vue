<template>
  <a-popover
    trigger="click"
    placement="rightTop"
    overlayClassName="treeNode"
    destroyTooltipOnHide
  >
    <!-- v-if="item.key === OptionEnum.MOVE || id" -->
    <template #content>
      <template v-for="item in toolBars" :key="item.key">
        <div
          :class="item.class"
          v-if="item.key === OptionEnum.MOVE || id"
          @click="barEvent(item.key)"
        >
          <span v-if="item.class === 'toolnode'">
            {{
              item.key === OptionEnum.MOVE && !id
                ? t('asset.moveHostG')
                : t(item.title)
            }}
          </span>
        </div>
      </template>
    </template>
    <EllipsisOutlined class="elIcon" @click="(e) => e.stopPropagation()" />
  </a-popover>
</template>
<script lang="ts">
import { Popover } from 'ant-design-vue'
import { defineComponent, PropType, unref, reactive } from 'vue'
import { useModal } from '@/hooks'
import { toolBars } from '../index'
import addModal from '../../addModal'
import { delModal } from '../../delModal'
import selectTreeVnode from '@/components/selectTreeVnode'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import {
  deleteGroup,
  moveGroup,
  addGroup,
  renameGroup,
  move_Group
} from '@/api/asset/host'
import { OptionEnum } from '@/enums/moveGroup'
import store from '@/store'
import { MoveEnum, GROUPENUM } from '@/enums/moveGroup'
import { PopProType } from './type'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    EllipsisOutlined,
    [Popover.name]: Popover
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String
    },
    selectedKeys: {
      type: Array as PropType<number[]>
    },
    gTitle: String,
    kv_path: String
  },
  // emits: ['update:selectedKeys', 'update:gTitle', 'onRefreshTable'],
  setup(props: PopProType, { emit }) {
    const { t } = useI18n()
    const barEvent = (key: string) => {
      switch (key) {
        /* 新建分组 start */
        case OptionEnum.ADD:
          useModal(
            {
              //新建自定义分组
              title: t('asset.newGroup'),
              contentProps: {
                fields: reactive({})
              },
              handleOk: async (conRef) => {
                await unref(conRef.formRef).validate()
                const { id: resId } = await addGroup({
                  parentId: props.id,
                  name: unref(conRef).fields.groupName
                })
                if (resId) {
                  refreshTree(false)
                }
              }
            },
            addModal
          )
          break
        /* 新建分组 end */

        /* 移动分组 start */
        case OptionEnum.MOVE:
          useModal(
            {
              contentProps: {
                target_group_idState: reactive({ target_group_id: undefined }),
                id: props.id,
                placeholder: t('asset.selectGroup')
              },

              title: t('asset.moveGroupTitle'),
              handleOk: async (conRef) => {
                await unref(conRef).validate()
                const {
                  target_group_idState: { target_group_id }
                } = conRef
                //非未分组
                if (props.id) {
                  await moveGroup({
                    group_id: props.id,
                    target_group_id,
                    flag: MoveEnum.MID
                  })
                } else {
                  // 未分组
                  await move_Group(
                    {
                      group_id: target_group_id,
                      exclude: '',
                      filter: {
                        group_id: 0
                      }
                    },
                    true
                  )
                }

                refreshTree()
              }
            },
            selectTreeVnode
          )
          break
        /* 移动分组 end */

        /* 重命名分组 start */
        case OptionEnum.RENAME:
          useModal(
            {
              contentProps: {
                fields: reactive({ groupName: props.name })
              },
              title: t('asset.reName') + ' ' + t('common.group'),
              handleOk: async (conRef) => {
                await unref(conRef.formRef).validate()
                // 选中的分组和重命名一致时候 更新title
                if (props.id === unref(props.selectedKeys)[0]) {
                  emit('update:gTitle', unref(conRef).fields.groupName)
                }
                await renameGroup({
                  group_id: props.id,
                  new_name: unref(conRef).fields.groupName
                })
                refreshTree()
              }
            },
            addModal
          )
          break
        /* 重命名分组 end */

        /* 删除分组 start */
        case OptionEnum.DELETE:
          useModal(
            {
              title: t('asset.delGroup'),
              subtitle: t('asset.moveHostTo'),
              contentProps: {
                target_group_idState: reactive({ target_group_id: undefined }),
                id: props.id
              },
              handleOk: async (conRef) => {
                let move_to: number
                //自定义时候
                if (conRef.moveId === 1) {
                  await unref(conRef.selectTree).validate()
                  move_to = conRef.target_group_idState.target_group_id
                } else {
                  move_to = conRef.moveId
                }
                // 选中的分组和删除分组 一致时候 自动选中移入的分组
                if (props.id === unref(props.selectedKeys)[0]) {
                  if (conRef.moveId === 1) {
                    //自定义
                    emit('update:selectedKeys', [move_to])
                    emit('update:gTitle', unref(conRef.selectTree).selectedName)
                  } else if (conRef.moveId === -1) {
                    //移动上一级分组(砍掉)
                    const jpkv_path = JSON.parse(props.kv_path)
                    //有上级
                    if (jpkv_path.length > 1) {
                      const { id, name } = jpkv_path[jpkv_path.length - 2]
                      emit('update:selectedKeys', [id])
                      emit('update:gTitle', name)
                    } else {
                      emit('update:selectedKeys', [GROUPENUM.UNGROUP])
                      //选中未分组
                      emit('update:gTitle', t('asset.Ungrouped'))
                    }
                  } else {
                    //移动未分组
                    emit('update:selectedKeys', [GROUPENUM.UNGROUP])
                    //选中未分组
                    emit('update:gTitle', t('asset.Ungrouped'))
                  }
                }
                await deleteGroup({ id: props.id, move_to })
                refreshTree()
              }
            },
            delModal
          )

          break
        /* 删除分组 end */
        default:
          break
      }
    }
    //刷新树和表格
    async function refreshTree(refTable = true) {
      await store.dispatch('hostGroup/getHostGroups')
      refTable && emit('onRefreshTable')
    }
    return {
      OptionEnum,
      // getPopupContainer,
      toolBars,
      barEvent,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.toolnode {
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;

  &:hover {
    background: #eee;
  }
}

.toolline {
  // width: 200px;
  height: 1px;
  background: #eeeeee;
  margin: 8px 0;
}
.elIcon {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 8px;
  top: 10px;
  line-height: 28px;
  background: #eee;
  border-radius: 8px;
}
</style>
