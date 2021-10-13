<template>
  <div>
    <div class="header">{{ t('strategy.account') }}</div>
    <div class="bk_br_sd">
      <div class="title">{{ t('strategy.fileName') }}</div>
      <div class="content">
        <div class="tools">
          <div class="msg">
            {{ t('strategy.dicTitle') }}
          </div>
          <div class="btns">
            <a-button class="btn" type="link" @click="resetData">
              {{ t('strategy.tidyUp') }}
            </a-button>
            <file-read @readTxt="readTxt">
              <a-button class="btn" type="link">
                {{ t('strategy.impFile') }}
              </a-button>
            </file-read>
            <a-button class="btn" type="link" @click="exportTxt">
              {{ t('strategy.expFile') }}
            </a-button>
          </div>
        </div>
        <a-textarea
          v-model:value="textAreaValue"
          :placeholder="t('strategy.accPlace') + '\nabcd \nabc\@abc.com'"
          :rows="8"
        >
        </a-textarea>
        <div class="confirm">
          <span>{{ rows }}/3000</span>
          <a-button class="btn" type="primary" @click="saveWeakP">
            {{ t('common.save') }}
          </a-button>
        </div>
      </div>
    </div>
    <div class="bk_br_sd mt">
      <div class="title">{{ t('strategy.ipAutoS') }}</div>
      <div class="content">
        <div>
          <span class="label">{{ t('strategy.timeUp') }}</span>
          <a-input-number
            :placeholder="t('common.range', ['3-20'])"
            v-model:value="logotTimes"
            class="iptNum"
            :min="3"
            :max="20"
          />
        </div>
        <div class="confirm">
          <a-button class="btn" type="primary" @click="saveLogot">
            {{ t('common.save') }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Input, InputNumber, message } from 'ant-design-vue'
import { preendTrim } from '@/utils/tools'
import { fileRead } from '@/components/file-read'
import {
  saveWeakPwds,
  getWeakPwds,
  getIpTimes,
  setIpTimes
} from '@/api/strategy/account'
import { fakeClick } from './index'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Input.TextArea.name]: Input.TextArea,
    [InputNumber.name]: InputNumber,
    fileRead
  },
  setup() {
    const { t } = useI18n()
    //登录次数
    const logotTimes = ref<number | undefined>(undefined)
    //文本域
    const textAreaValue = ref<string>('')
    //行数
    const rows = computed(
      () => preendTrim(textAreaValue.value.split('\n')).length
    )
    //整理
    const resetData = () => {
      textAreaValue.value = preendTrim(textAreaValue.value.split('\n')).join(
        '\n'
      )
    }
    //emit 读取文本内容
    const readTxt = (txt) => {
      const resetData = preendTrim(txt.split('\n')).join('\n')
      if (!resetData) {
        message.error(t('strategy.notEmpty'))
        return false
      }
      textAreaValue.value = txt
    }
    // txt文件导出
    const exportTxt = () => {
      resetData()
      const allStr = preendTrim(textAreaValue.value.split('\n')).join('\n')

      if (!allStr) {
        message.error(t('strategy.dicEmp'))
        return false
      }
      var export_blob = new Blob([allStr])
      var save_link = document.createElement('a')
      save_link.href = window.URL.createObjectURL(export_blob)
      save_link.download = t('strategy.fileName') + '.txt'
      fakeClick(save_link)
    }

    //弱密码保存
    const saveWeakP = async () => {
      if (preendTrim(textAreaValue.value.split('\n')).length > 3000) {
        message.error(t('common.noMoreThan', [3000]))
        return false
      }
      await saveWeakPwds({
        weakpwds: preendTrim(textAreaValue.value.split('\n'))
      })
    }
    //登录次数保存
    const saveLogot = async () => {
      if (!logotTimes.value) {
        message.error(t('strategy.setTimes'))
        return
      }
      await setIpTimes({
        freq: logotTimes.value!
      })
    }
    //获取弱密码
    const getWeakPWD = async () => {
      const { weakpwds } = await getWeakPwds()
      textAreaValue.value = weakpwds.join('\n')
    }
    getWeakPWD()
    //获取登录次数
    const getIploks = async () => {
      const { logoktimes } = await getIpTimes()
      logotTimes.value = logoktimes
    }
    getIploks()
    return {
      textAreaValue,
      resetData,
      rows,
      readTxt,
      exportTxt,
      saveWeakP,
      saveLogot,
      logotTimes,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 56px;
  line-height: 56px;
  font-weight: 700;
  font-size: 16px;
}
.title {
  height: 56px;
  line-height: 56px;
  padding: 0px 16px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}
.content {
  padding: 0 24px 24px 24px;
  .tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    .msg {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
    .btns {
      display: flex;
      .btn {
        border: 1px solid #eee;
        margin-right: 16px;
      }
    }
  }
  .confirm {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
}
.mt {
  margin-top: 16px;
  .content {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .label {
    margin-right: 16px;
  }
  .iptNum {
    width: 120px;
  }
}
</style>
