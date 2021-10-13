<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-08 16:22:44
 * @LastEditTime: 2021-10-12 11:14:24
-->
<template>
  <div
    class="licen"
    @click="openLicense"
    :class="[flag === 'Authorized' ? 'suc' : 'err']"
  >
    <custom-icon
      :type="flag === 'Authorized' ? '#ax-authorize' : '#ax-unauthorized'"
      size="18"
      class="skicon"
    />
    <span class="sket">{{ t('license.' + status) }}</span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import store from '@/store'
import { useModal } from '@/hooks'
import { licenseModal } from '../licenseModal'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup(_, { emit }) {
    const { t } = useI18n()
    const authStatus = computed(() => store.getters['license/authStatus'])
    const { status, flag } = authStatus.value

    const openLicense = () => {
      emit('closePop')
      useModal(
        {
          title: t('license.authInfo'),
          subtitle: t('license.axAuth'),
          footer: false,
          width: 680
        },
        licenseModal
      )
    }
    return {
      status,
      flag,
      openLicense,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.licen {
  height: 40px;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  cursor: pointer;

  .skicon {
    margin-right: 8px;
  }
  .sket {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
}
.suc {
  color: #18ba79;
}
.err {
  color: #f05064;
}
</style>
