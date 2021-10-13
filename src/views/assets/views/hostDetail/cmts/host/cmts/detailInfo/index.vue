<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-12 16:01:07
-->
<template>
  <div class="detailInfo">
    <!-- 基础信息 start -->
    <div class="basicInfo" v-for="(item, index) in infoData" :key="item.key">
      <!-- 标题 start-->
      <h3>{{ item.title }}</h3>
      <!-- 标题 send-->
      <template v-for="child in item.children" :key="item.key">
        <div
          class="infoItem"
          :class="{ ifAcc: child.key === 'logon_username' }"
        >
          <div class="title">{{ child.label }}</div>
          <!-- 账号 start -->
          <div class="value" v-if="child.key === 'logon_username'">
            <template v-if="baseInfo.logon_username === '-'">
              {{ baseInfo.logon_username }}
            </template>
            <template v-else>
              <span
                v-for="item in baseInfo.logon_username.split(',')"
                :key="item"
                class="accountNode"
              >
                {{ item }}
                <span
                  class="domain"
                  v-if="!baseInfo.accounts.split(',').includes(item)"
                >
                  域
                </span>
              </span>
            </template>
          </div>
          <!-- 账号 end -->
          <div class="value" v-else>
            {{ $props[item.key][child.key] ?? '-' }}
          </div>
        </div>
      </template>

      <div class="line" v-if="index < 3"></div>
    </div>
    <!-- 基础信息 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useInfoData } from './index'
import { isArray } from '@/utils/is'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    baseInfo: Object,
    hostManage: Object,
    agent: Object
  },
  setup() {
    const { t } = useI18n()
    const infoData = useInfoData(t)
    return {
      isArray,
      infoData
    }
  }
})
</script>

<style lang="less" scoped>
.detailInfo {
  flex: 1;
  padding: 24px;
  margin: 24px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  .basicInfo {
    h3 {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      margin-bottom: 24px;
    }

    .infoItem {
      width: 25%;
      display: inline-block;
      margin-bottom: 24px;
      .title {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
        line-height: 20px;
        margin-bottom: 5px;
      }
      .value {
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
        min-height: 20px;
      }
    }
    .ifAcc {
      width: 100%;
      margin-bottom: 20px;
      .title {
        margin-bottom: 10px;
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #eeeeee;
    border-radius: 8px;
    margin-bottom: 24px;
  }
}
.accountNode {
  display: inline-block;
  padding: 5px;
  margin: 0 16px 24px 0;
  background: #eee;
  border-radius: 8px;
  min-width: 120px;
  text-align: center;
  position: relative;
}
.domain {
  position: absolute;
  transform: translateX(50%);
  top: -10px;
  right: 5px;
  height: 20px;
  border-radius: 10px;
  min-width: 20px;
  background: #19be6b;
  border: 1px solid transparent;
  color: #fff;
  line-height: 18px;
  text-align: center;
  padding: 0 6px;
  font-size: 12px;
  white-space: nowrap;
}
</style>
