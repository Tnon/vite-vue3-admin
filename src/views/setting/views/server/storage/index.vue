<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-11 14:41:11
-->
<template>
  <div class="bk_br_sd box">
    <swt-card
      v-bind="options"
      v-model:isOpen="isOpenPwd"
      @confirm="confirm"
      @switchChange="switchChange"
    >
      <a-input-number
        class="iptNum"
        v-model:value="valueCount"
        :placeholder="t('common.range', ['6-36'])"
        :min="6"
        :max="36"
      />
    </swt-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref, watch } from 'vue'
import { swtCard } from '@/views/setting/components/swt-card'
import { message, InputNumber } from 'ant-design-vue'
import {
  updateLogStorageApi,
  getLogStorageApi,
  controlLogStorageApi
} from '@/api/setting/server'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    swtCard,
    [InputNumber.name]: InputNumber
  },
  setup() {
    const { t } = useI18n()
    //选项
    const options = {
      title: 'setting.logPerd',
      subtitle: t('setting.logSubt'),
      label: t('setting.stoMon')
    }
    //是否开启控制
    const isOpenPwd = ref<boolean>(false)
    //默认12个月
    const valueCount = ref<number>(12)
    //确定按钮
    const confirm = async () => {
      // 更新日志存储限制
      if (unref(valueCount)) {
        await updateLogStorageApi({
          log_expire: unref(valueCount)
        })
      } else {
        message.error(t('setting.pSetLog'))
      }
    }

    // 获取日志存储限制
    const getLogStorage = async () => {
      const { log_expire } = await getLogStorageApi()
      valueCount.value = log_expire
      isOpenPwd.value = !!unref(valueCount)
    }
    getLogStorage()

    // 控制日志存储限制
    const switchChange = async () => {
      valueCount.value = 12
      await controlLogStorageApi({
        log_expire: unref(isOpenPwd) ? 12 : 0
      })
      unref(isOpenPwd)
        ? message.success(t('setting.enaSuc'))
        : message.success(t('setting.delSuc'))
    }

    return {
      isOpenPwd,
      valueCount,
      options,
      confirm,
      switchChange,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  margin-left: 16px;
}
.iptNum {
  border-radius: 8px;
  margin-left: 8px;
  width: 120px;
}
</style>
