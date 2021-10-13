<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-08 17:37:13
-->
<template>
  <span>
    <a-popover placement="right" v-if="status && status.stoptime">
      <template #content>
        {{ t('setting.drvStoTi') }}{{ status.stoptime }}
      </template>
      <CloseOutlined class="closeout" />
    </a-popover>
    <CheckOutlined class="checkout" v-else-if="status === true" />
    <CloseOutlined v-else class="closeout" />
  </span>
</template>
<script lang="ts">
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { Popover } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    status: [Boolean, Object]
  },
  components: {
    CheckOutlined,
    CloseOutlined,
    [Popover.name]: Popover
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
<style lang="less" scoped>
.checkout {
  color: rgb(24, 182, 102);
}
.closeout {
  color: rgb(248, 160, 76);
}
</style>
