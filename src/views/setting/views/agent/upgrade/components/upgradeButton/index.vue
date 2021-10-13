<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-31 20:15:12
 * @LastEditTime: 2021-09-08 22:08:14
-->
<template>
  <a-button type="dashed" v-if="!enable_upgrade" :disabled="true">
    {{ t('setting.upgradeBtn') }}
  </a-button>
  <a-popconfirm
    v-else
    :title="t('setting.sureUpg')"
    placement="left"
    :ok-text="t('common.confirm')"
    :cancel-text="t('common.cancle')"
    @confirm="upgradeRow"
  >
    <a-button type="dashed" :disabled="!enable_upgrade">
      {{ t('setting.upgradeBtn') }}
    </a-button>
  </a-popconfirm>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Popconfirm } from 'ant-design-vue'
import {
  upgradeAgentSingle,
  batchUpgradeDriver,
  upgradeHostSingle
} from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Popconfirm.name]: Popconfirm
  },
  props: {
    enable_upgrade: Boolean,
    callback: Function,
    id: String,
    type: String,
    record: Object
  },
  setup(props) {
    const { t } = useI18n()
    const upgradeRow = async () => {
      if (props.type === 'agent') {
        //升级单台agent
        await upgradeAgentSingle({ id: props.id! })
      } else if (props.type === 'driver') {
        //升级单台驱动
        await batchUpgradeDriver({ include: props.id! } as any)
      } else {
        //升级单台主机
        await upgradeHostSingle({ filter: { host_id: props.id! } })
      }
      props.callback!(true)
    }
    return {
      t,
      upgradeRow
    }
  }
})
</script>
