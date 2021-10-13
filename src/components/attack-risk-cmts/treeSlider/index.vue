<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-18 12:19:10
 * @LastEditTime: 2021-09-23 15:34:28
-->
<template>
  <div>
    <switch-nodes
      class="header"
      v-model:actived="handleTypeCmp"
      size="small"
      :types="types"
    />
    <a-spin :spinning="loading">
      <common-tree
        class="AttackRisktreeCon"
        :class="[modelType === MODELTYPE.ATTACK ? 'attackTree' : 'riskTree']"
        :modelType="modelType"
        :handleType="handleTypeCmp"
        :tree-data="treeData"
        v-model:selectedKeys="selectedKeysCmp"
        v-model:selectedTitle="selectedTitleCmp"
      >
        <template #header>
          <div
            class="treeHead"
            :class="[
              handleTypeCmp ? 'health' : 'danger',
              selectedKeysCmp === MODELTYPE.ATTACKPATH ||
              selectedKeysCmp === MODELTYPE.RISKPATH
                ? 'actived'
                : ''
            ]"
          >
            <!-- <img src="@/assets/images/logo-mini.png" alt="" /> -->
            <dync-atk-risk-img
              :imgType="modelType === MODELTYPE.ATTACK ? 'attack' : 'risk'"
              size="small"
              :danger="!!totalNum && !handleTypeCmp"
            />
            <span class="label">
              {{
                modelType === MODELTYPE.ATTACK
                  ? t('attack.allAttack')
                  : t('risk.allRisk')
              }}
            </span>

            <span class="number">{{ totalNum }}</span>
          </div>
        </template>
      </common-tree>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, watch, computed, ref } from 'vue'
import { Spin } from 'ant-design-vue'
import switchNodes from '@/components/switchNodes'
import commonTree from '@/components/commonTree'
import { getTreeDataApi } from '@/api/attack_risk'
import { MODELTYPE } from '@/enums/attack_risk'
import { dyncAtkRiskImg } from '@/components/attack-risk-cmts'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    dyncAtkRiskImg,
    switchNodes,
    [Spin.name]: Spin,
    commonTree
  },
  props: {
    handleType: {
      type: Number as PropType<number>
    },
    selectedKeys: {
      type: String as PropType<string>
    },
    selectedTitle: String,
    //攻击还是风险
    modelType: Number
  },
  emits: ['update:handleType', 'update:selectedKeys', 'update:selectedTitle'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const loading = ref<boolean>(false)
    //全部攻击
    const totalNum = ref<number>(0)
    //树
    const treeData = ref<any>([])
    //计算属性来get / set (层级太多，有点傻X)
    const handleTypeCmp = computed({
      get: () => props.handleType,
      set: (val) => emit('update:handleType', val)
    })
    //计算属性来get / set (层级太多，有点傻X)
    const selectedKeysCmp = computed({
      get: () => props.selectedKeys,
      set: (val) => emit('update:selectedKeys', val)
    })

    //计算属性来get / set (层级太多，有点傻X)
    const selectedTitleCmp = computed({
      get: () => props.selectedTitle,
      set: (val) => emit('update:selectedTitle', val)
    })
    watch(handleTypeCmp, async () => {
      loading.value = true
      await getTreeData()
      loading.value = false
    })
    //获取树
    const getTreeData = async () => {
      loading.value = true
      const [treeArr] = await getTreeDataApi({
        type: props.modelType!,
        handle: props.handleType!,
        deep: 3
      }).finally(() => {
        loading.value = false
      })
      totalNum.value = treeArr.num
      treeData.value = treeArr.items
    }
    getTreeData()
    //tabs
    const types: Items[] = [
      //未处理
      {
        title: 'common.attrisUnhandle',
        type: 0
      },

      //已处理
      {
        title: 'common.attrisHandled',
        type: 1
      }
    ]
    return {
      types,
      treeData,
      totalNum,
      handleTypeCmp,
      selectedKeysCmp,
      selectedTitleCmp,
      loading,
      getTreeData,
      MODELTYPE,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
