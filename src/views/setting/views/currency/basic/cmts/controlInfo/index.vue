<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-09 17:26:49
-->
<template>
  <div class="contrInfo">
    <div class="title">{{ t('setting.conMsg') }}</div>
    <a-row class="infoItem">
      <template v-for="(item, key) in contrInfo" :key="key">
        <a-col :span="6">
          <div class="infoTitle">{{ item.title }}</div>
          <div class="infoValue">{{ item.value }}</div>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { useContrInfo } from './index'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const { t } = useI18n()
    const contrInfo = useContrInfo(t)
    return {
      contrInfo,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.contrInfo {
  width: 100%;
  height: 214px;
  padding: 16px 24px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin: 16px 0;
  .infoItem {
    padding: 0 24px;
  }
  .infoTitle,
  .infoValue {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
    margin: 8px 0;
  }
  .infoValue {
    color: rgba(0, 0, 0, 0.85);
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    margin-bottom: 40px;
  }
}
</style>
