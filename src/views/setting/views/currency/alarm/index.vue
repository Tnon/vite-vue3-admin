<template>
  <div class="alarm">
    <Row :gutter="16">
      <template v-for="item in types" :key="item.key">
        <Col span="12">
          <div class="bk_br_sd nodes">
            <img :src="item.key === 'email' ? EmailPng : PhonePng" />
            <div class="riop">
              <div class="htop">
                <span class="numb">
                  {{ responseState[item.key]['accept'].length }}
                </span>
                <custom-icon
                  @click="openSettings(item.key)"
                  type="#ax-ServerSetting"
                  size="18"
                />
              </div>
              <div>
                {{
                  item.key === 'email' ? t('setting.email') : t('setting.sms')
                }}
              </div>
            </div>
          </div>
        </Col>
      </template>
    </Row>
    <div
      v-for="(item, key) in responseState.switch"
      :key="key"
      class="bk_br_sd nodesSwitch"
    >
      <span>
        {{
          key === 'login_lock'
            ? t('setting.logFaiLock')
            : key === 'risk_discovery'
            ? t('menu.risk')
            : t('strategy.domain')
        }}
      </span>
      <div>
        <span class="emspan">
          <a-switch
            @change="changeSwt"
            :checkedValue="1"
            :unCheckedValue="0"
            v-model:checked="item.email"
          />
          <span class="label">{{ t('setting.email') }}</span>
        </span>
        <span class="emspan">
          <a-switch
            @change="changeSwt"
            :checkedValue="1"
            :unCheckedValue="0"
            v-model:checked="item.phone"
          />
          <span class="label">{{ t('setting.sms') }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Row, Col, message } from 'ant-design-vue'
import EmailPng from '@/assets/images/email.png'
import PhonePng from '@/assets/images/phone.png'
import { useModal } from '@/hooks'
import { configDetail } from './cmts'
import { getAlarm, setAlarm, setSwitType } from '@/api/setting/currency'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    Row,
    Col
  },
  setup() {
    const { t } = useI18n()
    //数据结构体
    const responseState = reactive({
      email: {
        //设置的邮箱
        accept: [],
        //邮箱发送次数
        freq: 1
      },
      phone: {
        //设置的手机
        accept: [],
        //短信次数
        freq: 1
      },
      switch: {
        //登录次数
        login_lock: { email: 0, phone: 0 },
        //风险
        risk_discovery: { email: 0, phone: 0 },
        //域控
        dom_ctl: { email: 0, phone: 0 }
      }
    })
    //类型
    const types = [
      {
        key: 'email',
        numKey: 'email_freq',
        acceptKey: 'accept_emails'
      },
      {
        key: 'phone',
        numKey: 'phone_freq',
        acceptKey: 'accept_phone'
      }
    ]
    //打开设置
    const openSettings = (key: 'email' | 'phone'): void => {
      useModal(
        {
          title:
            key === 'email'
              ? t('setting.AlaSet', [t('setting.email')])
              : t('setting.AlaSet', [t('setting.sms')]),
          contentProps: {
            state: responseState[key],
            setKey: key
          },
          handleOk: async (contRef) => {
            if (!contRef.responseState.freq) {
              message.error(t('setting.setLimit'))
              return Promise.reject('')
            }
            await setAlarm({
              [key]: contRef.responseState
            } as any)
            getAlarMsg()
          }
        },
        configDetail
      )
    }

    //获取告警信息
    const getAlarMsg = async () => {
      const { email, phone, switch: switchInit } = await getAlarm()
      // Object.assign(responseState, )
      responseState.email = email
      responseState.phone = phone
      for (let k in switchInit) {
        if (!switchInit[k]) {
          switchInit[k] = { email: 0, phone: 0 }
        }
      }
      responseState.switch = switchInit
    }
    getAlarMsg()
    //switch 开关
    const changeSwt = () => {
      setSwitType(responseState.switch)
    }
    return {
      types,
      EmailPng,
      PhonePng,
      responseState,
      openSettings,
      changeSwt,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.alarm {
  margin-left: 16px;
  .nodes {
    padding: 32px;
    display: flex;
    align-items: center;
    img {
      width: 64px;
      height: 64px;
      margin-right: 24px;
    }
    .riop {
      flex: 1;
    }
    .htop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      .numb {
        font-size: 32px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
}
.nodesSwitch {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 0 16px;
  .emspan {
    margin-right: 30px;
    display: inline-flex;
    align-items: center;
    .label {
      margin-left: 16px;
    }
  }
}
</style>
