<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-22 14:50:13
-->
<template>
  <div class="box">
    <a-row>
      <a-col :span="6" class="harRbo">
        <div class="header">
          {{
            LType == 1 ? t('overview.attackDistrib') : t('overview.riskDistrib')
          }}
        </div>
        <ul class="list">
          <template v-for="item in allType[LType]" :key="item.id">
            <li class="listLi" @click="jumpToAtkRik(item.path, item.name)">
              <span class="badTitle">
                <a-badge
                  :status="item.num ? 'processing' : 'default'"
                  :color="
                    !item.num ? '#ccc' : LType === 1 ? '#F05064' : '#F8A454'
                  "
                  class="badg"
                />
                {{ item.name }}
              </span>
              <span
                class="number"
                :class="[
                  !item.num ? 'safNum' : LType === 1 ? 'atkNum' : 'riskNum'
                ]"
                >{{ item.num }}</span
              >
            </li>
          </template>
        </ul>
      </a-col>
      <a-col :span="18" class="righOP">
        <line-echarts v-bind="{ ...$props }"></line-echarts>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, unref, watchEffect } from 'vue'
import { Props } from './type'
import { Row, Col, Badge } from 'ant-design-vue'
import lineEcharts from '../lineEcharts'
import { getTreeDataApi } from '@/api/attack_risk'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Badge.name]: Badge,
    lineEcharts
  },
  props: {
    RType: {
      type: Number,
      default: 1
    },
    LType: {
      type: Number,
      default: 1
    }
  },
  setup(props: Props) {
    const { t } = useI18n()
    const router = useRouter()
    const allType = ref({})
    //获取攻击/风险分布
    const getAttackRisk = async (type) => {
      const [{ items }] = await getTreeDataApi({
        handle: 0,
        type,
        deep: 2
      })
      unref(allType)[type] = items
    }
    watchEffect(() => {
      getAttackRisk(props.LType)
    })
    const jumpToAtkRik = (path, title) => {
      router.push({
        name: props.LType === 1 ? 'attack' : 'risk',
        query: {
          path,
          title
        }
      })
    }
    return {
      allType,
      jumpToAtkRik,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
