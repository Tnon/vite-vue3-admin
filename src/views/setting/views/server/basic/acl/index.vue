<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-25 20:34:23
 * @LastEditTime: 2021-10-11 11:07:00
-->
<template>
  <div class="acl">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <a-radio-group v-model:value="aclValue">
        <a-radio :value="1" class="noacl crad">
          {{ t('setting.anyIP') }}
        </a-radio>
        <a-radio :value="2" class="noacl crad">{{
          t('setting.onlyIP')
        }}</a-radio>
      </a-radio-group>
      <div v-if="aclValue === 2" class="ipAdd">
        <span>{{ t('setting.ipSeg') }}</span>
        <template v-for="(item, index) in ips" :key="item.key">
          <ip-addr ref="ip" :ipAddress="ipAddress">
            <template #last>
              <li>
                <a-input
                  ref="ipInput"
                  v-model:value.trim="state[item.key]"
                  type="text"
                  class="ipInputClass"
                  @input="checkIpVal(item['key'], state[item['key']])"
                />
                <div></div>
              </li>
            </template>
          </ip-addr>
          <MinusOutlined v-if="index < 1" class="line" />
        </template>
        <a-button type="primary" @click="addIp">{{ t('common.add') }}</a-button>
        <div class="tagBox">
          <template v-for="item in ipArr" :key="item.id">
            <a-tag class="tagSelf" closable @close="deleteIp(item.id)">
              {{ item.ipStr }}
            </a-tag>
          </template>
        </div>
      </div>
      <div style="text-align: right">
        <a-button type="primary" @click="commit">
          {{ t('common.save') }}
        </a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, unref } from 'vue'
import { ipAddr } from '@/components/ip-addr'
import { MinusOutlined } from '@ant-design/icons-vue'
import { message, Tag } from 'ant-design-vue'
import {
  addIpAddressApi,
  updateIpControlApi,
  getIpAddressApi,
  deleteIpAddressApi,
  getIpControlApi
} from '@/api/setting/server'
import { validateIp } from '@/utils/reg'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ipAddr,
    MinusOutlined,
    [Tag.name]: Tag
  },
  setup() {
    const { t } = useI18n()
    //ip地址段
    const ips = [
      {
        key: 'ippre'
      },
      {
        key: 'ipnext'
      }
    ]
    //ip值和段
    const state = reactive({
      ippre: '',
      ipnext: '',
      ipAddress: [
        {
          value: ''
        },
        {
          value: ''
        },
        {
          value: ''
        }
      ],
      ipArr: []
    })
    //acl控制方式
    const aclValue = ref<number>(1)
    // 检查ip输入为0-255
    const checkIpVal = (type, val) => {
      //确保每个值都处于0-255
      // 处理非数字
      state[type] = val.toString().replace(/[^0-9]/g, '')
      state[type] = parseInt(val, 10)
      if (isNaN(val)) {
        state[type] = ''
      } else {
        state[type] = val < 0 ? 0 : val
        state[type] = val > 255 ? 255 : val
      }
    }

    // 添加ip地址段
    const addIp = async () => {
      let ipCommon = ''
      state.ipAddress.forEach((item) => {
        ipCommon += item.value + '.'
      })
      const ip_begin = ipCommon + state.ippre
      const ip_end = ipCommon + state.ipnext
      try {
        await validateIp('', ip_begin)
        await validateIp('', ip_end)
      } catch {
        message.error(t('setting.ipSegWarn'))
        return
      }
      await addIpAddressApi({
        ip_begin,
        ip_end
      })
      getIPAddress()
    }

    // 获取ip地址段
    const getIPAddress = async () => {
      const { items } = await getIpAddressApi()
      items.forEach((ele) => {
        let ipStr = ele.ip_begin + ' - ' + ele.ip_end
        ele.ipStr = ipStr
      })
      state.ipArr = items
    }
    getIPAddress()

    // 删除ip地址段
    const deleteIp = async (id) => {
      await deleteIpAddressApi({
        id
      })
      getIPAddress()
    }

    // 获取可访问ip地址
    const getIpControl = async () => {
      const { loginauth } = await getIpControlApi()
      aclValue.value = loginauth == 'all' ? 1 : 2
    }
    getIpControl()

    // 保存可访问ip地址
    const commit = async () => {
      if (!state.ipArr.length && unref(aclValue) === 2) {
        message.error(t('setting.pAddIp'))
        return
      }
      const loginauth = unref(aclValue) === 1 ? 'all' : 'custom'
      await updateIpControlApi({
        loginauth
      })
    }

    return {
      state,
      ...toRefs(state),
      aclValue,
      ips,
      checkIpVal,
      addIp,
      commit,
      deleteIp,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.crad {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
  display: block;
}
.noacl {
  margin-bottom: 24px;
}
li {
  position: relative;
  height: 1.125rem;
  margin: 0;
  list-style-type: none;
}
.ipInputClass {
  border: none;
  width: 1.53125rem;
  height: 1.125rem;
  text-align: center;
  background: transparent;
  /*取消掉默认的input focus状态*/
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.line {
  margin: 0 10px;
  color: #ddd;
}
.ant-btn {
  height: 36px;
  margin-left: 20px;
}
.tagSelf {
  // border: none;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
  line-height: 30px;
  height: 30px;
  padding-right: 7px;
  &:hover {
    padding-right: 20px;
    ::v-deep(.anticon) {
      transform: scale(1);
    }
  }
  ::v-deep(.anticon) {
    transition: all 0.4s;
    position: absolute;
    right: 3px;
    top: 10px;
    transform: scale(0);
  }
}
</style>
