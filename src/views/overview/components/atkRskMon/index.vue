<template>
  <div class="monitor">
    <div class="filter">
      <div class="leftOpt">
        <template v-for="item in types" :key="item.type">
          <span
            class="optype"
            :class="item.type === LType ? 'actived' : ''"
            @click="SelectType(item.type, 'LType')"
          >
            {{ item.title }}
          </span>
        </template>
      </div>
      <div class="rightOpt">
        <switch-nodes
          v-model:actived="RType"
          size="small"
          :types="ranges"
          @update:actived="SelectType($event, 'RType')"
        />
      </div>
    </div>
    <disb-chart v-bind="{ ...typeAll }"></disb-chart>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Options, Nodes } from './type'
import disbChart from './cmts/disbChart'
import switchNodes from '@/components/switchNodes'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    disbChart,
    switchNodes
  },
  setup() {
    const { t } = useI18n()
    const typeAll = reactive<Options>({
      LType: 1,
      RType: 1
    })
    //攻击风险监控
    const types: Nodes[] = [
      {
        title: t('overview.attackMonitor'),
        type: 1
      },
      {
        title: t('overview.riskMonitor'),
        type: 2
      }
    ]
    //周期
    const ranges: Nodes[] = [
      {
        //近24小时
        title: 'overview.day',
        type: 1
      },
      {
        //近7天
        title: 'overview.week',
        type: 7
      },
      {
        //近30天
        title: 'overview.month',
        type: 30
      }
    ]
    const SelectType = (val: string, type: string): void => {
      typeAll[type] = val
    }

    return {
      ...toRefs(typeAll),
      typeAll,
      types,
      ranges,
      SelectType
    }
  }
})
</script>
<style lang="less" scoped>
.monitor {
  height: 451px;
  background: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 16px;
  .filter {
    height: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid #eee;
    .optype {
      padding: 6px 16px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .actived {
      background: #eeeeee;
      border-radius: 8px;
      font-weight: 600;
      color: #000000;
    }
  }
}
</style>
