<template>
  <div class="SysLog bk_br_sd">
    <!-- 总开关 start -->
    <div class="logSwitch">
      <a-switch v-model:checked="logSwitch" />
    </div>
    <!-- 总开关 end -->

    <!-- 参数配置 start -->
    <div class="flex">
      <div class="title">{{ t('setting.paraCfg') }}</div>
      <slots-form
        ref="slotsForm"
        :colsMap="formItems"
        class="loginForm"
        :fields="fields"
        :disabled="!logSwitch"
      />
    </div>
    <!-- 参数配置 end -->

    <!-- 数据类别 start -->
    <div>
      <div class="title">{{ t('setting.dateCat') }}</div>
      <div class="dataType">
        <template v-for="item in dataType" :key="item.dataIndex">
          <span class="label">{{ item.title }}</span>
          <a-switch
            v-model:checked="agms[item.dataIndex]"
            :disabled="!logSwitch"
          />
        </template>
      </div>
    </div>
    <!-- 数据类别 end -->

    <!-- 同步配置 start -->
    <div v-show="assets">
      <div class="title">{{ t('setting.syncCfg') }}</div>
      <sync-config :agms="agms" :disabled="logSwitch">
        <!-- 时间选择 -->
        <template #timeSelect>
          <div class="syncConfig" v-if="assets_option != '2'">
            <span class="subTitle">{{ t('setting.timeSec') }}</span>
            <a-time-picker
              v-model:value="timeDate"
              :disabled="!logSwitch"
              format="HH:mm"
              @change="changeTime"
            />
          </div>
        </template>
      </sync-config>
    </div>
    <!-- 同步配置 end -->

    <!-- 保存 start -->
    <div class="btn">
      <a-button type="primary" @click="submit" :loading="saveloading">
        {{ t('common.save') }}
      </a-button>
    </div>
    <!-- 保存 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref, watch } from 'vue'
import slotsForm from '@/components/slots-form'
import { useFormItems, useDataType } from './index'
import { TimePicker } from 'ant-design-vue'
import moment from 'moment'
import SyncConfig from './syncConfig/index.vue'
import { getSyslogApi, updateSyslogApi } from '@/api/setting/currency'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    slotsForm,
    [TimePicker.name]: TimePicker,
    SyncConfig
  },
  setup() {
    const { t } = useI18n()
    const formItems = useFormItems(t)
    const dataType = useDataType(t)
    //交互
    const saveloading = ref<boolean>(false)
    //表单元素
    const slotsForm = ref<any>()

    //参数配置表单
    const fields = reactive({
      ip: '',
      port: '',
      network: undefined
    })
    // 数据类别结构体
    const agms = reactive({
      logSwitch: false,
      attack: false,
      risk: false,
      bha_log: false,
      assets: false,
      assets_option: '0',
      assets_hour: '00',
      assets_minute: '00',
      weeks: []
    })
    //时间选择
    const timeDate = ref(
      moment(agms.assets_hour + ':' + agms.assets_minute, 'HH:mm')
    )
    //时间选择事件
    const changeTime = (v) => {
      let timeSelect = v ? unref(v).format('HH:mm') : ''
      agms.assets_hour = timeSelect.substr(0, 2)
      agms.assets_minute = timeSelect.substr(timeSelect.length - 2)
    }
    //保存按钮
    const submit = async () => {
      try {
        if (agms.logSwitch) {
          await unref(slotsForm).validate()
        }
      } catch {
        return
      }
      saveloading.value = true
      await updateSyslogApi(Object.assign({}, agms, fields) as any)
      saveloading.value = false
    }

    // 获取syslog信息
    const getSyslog = async () => {
      const { cfg_value } = await getSyslogApi()
      for (const key in agms) {
        agms[key] = JSON.parse(cfg_value)[key]
      }
      for (const key in fields) {
        fields[key] = JSON.parse(cfg_value)[key]
      }
      timeDate.value = moment(
        agms.assets_hour + ':' + agms.assets_minute,
        'HH:mm'
      )
    }
    getSyslog()

    // 监听总开关变化，如果关闭则重置表单
    watch(
      () => agms.logSwitch,
      (v) => {
        if (!v) {
          unref(slotsForm).resetFields()
          agms.attack = false
          agms.risk = false
          agms.bha_log = false
          agms.assets = false
          agms.assets_option = '0'
          agms.assets_hour = '00'
          agms.assets_minute = '00'
          agms.weeks = []
        }
      }
    )

    return {
      ...toRefs(agms),
      fields,
      agms,
      submit,
      formItems,
      dataType,
      changeTime,
      timeDate,
      slotsForm,
      saveloading,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.SysLog {
  margin-left: 16px;
  position: relative;
  .logSwitch {
    position: absolute;
    top: 16px;
    right: 24px;
  }
  .flex {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .title {
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .loginForm {
    ::v-deep(.ant-input, .ant-select) {
      width: 316px;
      border-radius: 8px;
    }
  }
  .dataType {
    .label {
      display: inline-block;
      width: 120px;
      text-align: right;
      padding-right: 12px;
      margin-bottom: 24px;
    }
  }
  .syncConfig {
    margin-bottom: 30px;
    .subTitle {
      display: inline-block;
      text-align: right;
      width: 120px;
      margin-right: 16px;
    }
  }
  .btn {
    padding: 16px 24px;
    text-align: right;
  }
}
::v-deep(.ant-time-picker) {
  width: 350px;
}
</style>
