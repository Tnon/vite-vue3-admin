<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-22 14:32:04
-->
<template>
  <a-row :gutter="16">
    <template v-for="(value, item) in types">
      <a-col class="ncol" :span="8">
        <div class="node">
          <div
            class="content"
            @click="jumpToPtModal(item, 0)"
            :class="judgeClass(item, value)"
          >
            <div class="leftOption">
              <dync-atk-risk-img :imgType="item" :danger="!!value.num" />
              <span class="title">{{ value.title }}</span>
            </div>

            <div class="nodes" v-if="value.num >= 0">
              <div class="number">
                {{ value.num }}
              </div>
              <div class="msg">
                {{ ~~value.num ? value.prob_msg : value.heal_msg }}
              </div>
            </div>
            <template v-else>
              <div class="righOption">
                <div class="nodes txtCenter" @click="jumpToModal('attack', 1)">
                  <div class="number">
                    {{ value.handledAttack }}
                  </div>
                  <div class="msg">{{ value.handledAmsg }}</div>
                </div>
                <div class="line"></div>
                <div class="nodes txtCenter" @click="jumpToModal('risk', 1)">
                  <div class="number">
                    {{ value.handledRisk }}
                  </div>
                  <div class="msg">{{ value.handledRmsg }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </a-col>
    </template>
  </a-row>
</template>
<script lang="ts">
import { Col, Row } from 'ant-design-vue'
import { defineComponent, reactive } from 'vue'
import { staticData } from './type'
import { dyncAtkRiskImg } from '@/components/attack-risk-cmts/'
import { getAttRiskNum } from '@/api/overview'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    dyncAtkRiskImg
  },
  setup() {
    const { t } = useI18n()
    //数据结构体
    const types = reactive<staticData>({
      attack: {
        title: t('menu.attack'),
        num: 0,
        prob_msg: t('overview.findAttack'),
        heal_msg: t('overview.handledAllAttack')
      },
      risk: {
        title: t('menu.risk'),
        num: 0,
        prob_msg: t('overview.findRisk'),
        heal_msg: t('overview.handledAllRisk')
      },
      ops: {
        title: t('overview.operation'),
        handledAttack: 0,
        handledRisk: 0,
        handledAmsg: t('overview.handledAttack'),
        handledRmsg: t('overview.handledRisk')
      }
    })
    //判断类
    const judgeClass = (key: string, item: any): string => {
      if (key == 'attack') {
        if (item.num) {
          return 'attackBG'
        } else {
          return 'healBG'
        }
      } else if (key == 'risk') {
        if (item.num) {
          return 'riskBG'
        } else {
          return 'healBG'
        }
      } else {
        return 'healBG ntrContent'
      }
    }
    //获取风险攻击数量
    const getData = async () => {
      //未处理
      const { attacknum, risknum } = await getAttRiskNum({ handle: 0 })
      types.attack.num = attacknum
      types.risk.num = risknum
      //已处理
      const { attacknum: handleanum, risknum: handlernum } =
        await getAttRiskNum({
          handle: 1
        })
      types.ops.handledAttack = handleanum
      types.ops.handledRisk = handlernum
    }
    getData()
    //跳转
    // 路由
    const router = useRouter()
    const jumpToModal = (name, handleType) => {
      router.push({ name, query: { handleType } })
    }
    const jumpToPtModal = (name, handleType) => {
      if (name !== 'ops') router.push({ name, query: { handleType } })
    }
    return {
      types,
      judgeClass,
      jumpToModal,
      jumpToPtModal
    }
  }
})
</script>
<style lang="less" scoped>
@import url('./index');
</style>
