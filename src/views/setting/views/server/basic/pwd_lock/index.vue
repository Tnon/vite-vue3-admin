<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-11 11:16:47
-->
<template>
  <div class="bk_br_sd">
    <swt-card
      v-bind="options"
      v-model:isOpen="isOpenPwd"
      @confirm="confirm"
      @switchChange="switchChange"
    >
      <a-input-number
        class="iptNum"
        v-model:value="valueCount"
        :min="3"
        :max="10"
        :placeholder="t('common.range', ['3-10'])"
      />
    </swt-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { swtCard } from '@/views/setting/components/swt-card'
import {
  updateLoginAuthApi,
  getLoginAuthApi,
  controlLoginAuthApi
} from '@/api/setting/server'
import { message, InputNumber } from 'ant-design-vue'
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
      title: 'setting.lockTitle',
      subtitle: t('setting.lockTime'),
      label: t('setting.maxErrLa')
    }
    //是否开启
    const isOpenPwd = ref<boolean>(false)
    //错误次数
    const valueCount = ref<number>(3)
    //保存
    const confirm = async () => {
      // 更新登录鉴别次数
      if (unref(valueCount)) {
        await updateLoginAuthApi({ pwdfail_time: unref(valueCount) })
      } else {
        message.error(t('setting.psetMax'))
      }
    }

    // 获取登录鉴别次数
    const getLoginAuth = async () => {
      const { pwdfail_time } = await getLoginAuthApi()
      valueCount.value = pwdfail_time
      isOpenPwd.value = !!unref(valueCount)
    }
    getLoginAuth()

    // 控制登录鉴别次数
    const switchChange = async () => {
      //恢复默认值
      valueCount.value = 3
      //关闭发送0
      await controlLoginAuthApi({
        pwdfail_time: unref(isOpenPwd) ? 3 : 0
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
.iptNum {
  border-radius: 8px;
  margin-left: 8px;
  width: 120px;
}
</style>
