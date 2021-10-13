<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-31 09:34:49
 * @LastEditTime: 2021-09-17 16:54:31
-->
<template>
  <div>
    <a-popover
      v-if="!disabled"
      placement="leftTop"
      trigger="click"
      overlayClassName="popNoPad"
      destroyTooltipOnHide
      :getPopupContainer="getPopupContainer"
    >
      <template #content>
        <a-popconfirm
          placement="leftTop"
          overlayClassName="popHasPad"
          :getPopupContainer="getPopupContainer"
          @confirm="resetAgent"
        >
          <template v-slot:title> {{ t('setting.resTAgt') }} </template>
          <a-button class="noradiuBtn" type="link">
            {{ t('setting.resABtn') }}
          </a-button>
        </a-popconfirm>
      </template>
      <a-button type="link">
        <EllipsisOutlined />
      </a-button>
    </a-popover>
    <a-button type="link" v-else disabled>
      <EllipsisOutlined />
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Popover, Popconfirm } from 'ant-design-vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { resetAgentApi } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Popover.name]: Popover,
    [Popconfirm.name]: Popconfirm,
    EllipsisOutlined
  },
  props: {
    driverStatus: {
      type: Number
    },
    online: {
      type: Boolean
    },
    host_id: {
      type: String
    }
  },
  setup(props) {
    const { t } = useI18n()
    //pop 容器
    const getPopupContainer = (e) => e.parentNode
    //是否可重启
    const disabled = !(props.driverStatus === 0 && props.online)

    // 重启agent按钮
    const resetAgent = async () => {
      await resetAgentApi({
        host_id: props.host_id!
      })
    }
    return {
      getPopupContainer,
      disabled,
      resetAgent,
      t
    }
  }
})
</script>

<style lang="less" scoped></style>
