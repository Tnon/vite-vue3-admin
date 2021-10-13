<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-11 10:59:01
-->
<template>
  <div class="box">
    <!-- acl start -->
    <acl-control class="cardCon">
      <template #header>{{ t('setting.aclIp') }}</template>
    </acl-control>
    <!-- acl end -->

    <!-- pwd start -->
    <pwd-lock />
    <!-- pwd end -->
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { aclControl, pwdLock } from './index'
const { t } = useI18n()
</script>
<style lang="less" scoped>
.box {
  margin-left: 16px;
}
.cardCon {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: 16px;
  ::v-deep(.header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    padding: 0 24px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  ::v-deep(.content) {
    padding: 24px 48px;
  }
  .subTitle {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-left: 10px;
  }
}
</style>
