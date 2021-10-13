<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-09-30 18:53:30
-->
<template>
  <div>
    <div class="header">
      <div class="pth">
        <span class="tag">{{ t('strategy.pthPro') }}</span>
        <a-switch
          :checkedValue="1"
          :unCheckedValue="0"
          v-model:checked="pthModel.switch"
        />
      </div>
    </div>

    <template v-for="item in ruls" :key="item.key">
      <rule-card
        :option="item"
        :type="item.key"
        v-model:pth="pthModel.switch"
        v-model:checkValue="pthModel[item.key]"
        v-model:valueList="pthModel[item.key + 'List']"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Switch } from 'ant-design-vue'
import { getRuls, ruleCard } from './index'
import { CardState } from '../../detail/type'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Switch.name]: Switch,
    ruleCard
  },
  props: {
    pthModel: Object as PropType<CardState>
  },
  setup() {
    const { t } = useI18n()
    const ruls = getRuls(t)
    return {
      ruls,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  background: #fff;
  .pth {
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    .tag {
      padding: 4px 12px;
      background: #eee;
      border-radius: 8px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
    }
  }
}
</style>
