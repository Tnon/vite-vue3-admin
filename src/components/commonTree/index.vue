<template>
  <div>
    <div @click="selectAll">
      <slot name="header"></slot>
    </div>
    <div class="line"></div>
    <!-- 分组树 start -->
    <a-tree
      blockNode
      class=""
      :replaceFields="replaceFields"
      :tree-data="treeData"
      v-model:selectedKeys="selectedKeysCmp"
      autoExpandParent
      @select="selectType"
    >
      <!-- 自定义图标 start -->
      <template #switcherIcon>
        <DownOutlined class="arrowicon" />
      </template>
      <!-- 自定义图标 end -->
      <!-- 组信息 start -->
      <template #title="{ name, num }">
        <div
          class="node"
          :class="{
            danger: !!num && !$props.handleType,
            health: !!num && $props.handleType
          }"
        >
          <span class="label">{{ name }}</span>
          <span class="number" v-if="num">{{ num }}</span>
        </div>
      </template>
      <!-- 组信息 end -->
    </a-tree>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { replaceFields } from './index'
import { Tree } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { MODELTYPE } from '@/enums/attack_risk'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Tree.name]: Tree,
    DownOutlined
  },
  props: {
    handleType: Number,
    //后期改
    treeData: Array as PropType<any>,
    selectedKeys: String as PropType<string>,
    selectedTitle: String,
    modelType: Number
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    //选择树的节点
    const selectedKeysCmp = computed({
      get: () => [props.selectedKeys],
      set: (val) => {
        if (!val.length) {
          return
        }
        emit('update:selectedKeys', val[0])
      }
    })
    //选择全部
    const selectAll = () => {
      emit(
        'update:selectedTitle',
        props.modelType === MODELTYPE.ATTACK
          ? t('attack.allAttack')
          : t('risk.allRisk')
      )
      selectedKeysCmp.value =
        props.modelType === MODELTYPE.ATTACK
          ? [MODELTYPE.ATTACKPATH as string]
          : [MODELTYPE.RISKPATH as string]
    }
    //选择树的节点
    const selectType = (_, { selectedNodes }) => {
      if (!selectedNodes.length) {
        return
      }
      const {
        props: {
          dataRef: { name }
        }
      } = selectedNodes[0]
      emit('update:selectedTitle', name)
    }

    return {
      replaceFields,
      selectedKeysCmp,
      selectAll,
      selectType
    }
  }
})
</script>
<style lang="less" scoped>
.line {
  margin: 16px 0;
  height: 1px;
  background: #eeeeee;
}
.node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  .label,
  .number {
    height: 40px;
    flex: 1;
    line-height: 40px;
  }
  .label {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    padding-left: 10px;
  }
  .number {
    text-align: right;
    padding-right: 16px;
  }
}
</style>
