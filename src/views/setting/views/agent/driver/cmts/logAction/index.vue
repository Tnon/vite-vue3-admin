<template>
  <a-popover
    v-if="online"
    placement="leftTop"
    trigger="click"
    overlayClassName="popNoPad"
    destroyTooltipOnHide
    :getPopupContainer="getPopupContainer"
    @visibleChange="popVisibleChange"
    :visible="popVisible"
  >
    <template #content>
      <div class="recontainer" v-for="item in logActionData" :key="item.model">
        <div class="shadow" v-if="item.disabled"></div>
        <a-popconfirm
          placement="leftTop"
          overlayClassName="popHasPad"
          :getPopupContainer="getPopupContainer"
          @confirm="pop_Confirm(item.model, item.url)"
        >
          <template v-slot:title> {{ t('setting.cfmColD') }} </template>
          <a-button
            :disabled="item.disabled"
            :class="{
              error: item.status === 'failed',
              disC: item.status === 'applying'
            }"
            class="noradiuBtn"
            type="link"
          >
            <span>
              {{
                item.status === 'apply'
                  ? t('setting.colct')
                  : item.status === 'applying'
                  ? t('setting.colting')
                  : item.status === 'down'
                  ? t('common.download')
                  : t('setting.reCol')
              }}
            </span>
            <span v-if="item.status === 'applying'">{{ item.progress }}</span>
            <span>{{ item.label }}</span>
          </a-button>
        </a-popconfirm>
      </div>
    </template>
    <a-button type="link" :disabled="!online">
      <EllipsisOutlined />
    </a-button>
  </a-popover>
  <a-button v-else type="link" disabled>
    <EllipsisOutlined />
  </a-button>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { Popover, Popconfirm } from 'ant-design-vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { collectLogApi, collectLogProcessApi } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    [Popover.name]: Popover,
    [Popconfirm.name]: Popconfirm,
    EllipsisOutlined
  },
  props: {
    online: {
      type: Boolean
    },
    host_id: {
      type: String
    }
  },
  setup(props) {
    const { t } = useI18n()
    //pop visible
    const popVisible = ref<boolean>(false)
    // pop container
    const getPopupContainer = (e) => e.parentNode
    //初始状态
    const logActionData = ref([
      {
        label: t('setting.sysDumpLog'),
        model: 'sysdump',
        disabled: true,
        progress: '',
        status: 'apply',
        url: ''
      },
      {
        label: t('setting.agtDumpLog'),
        model: 'appdump',
        disabled: false,
        progress: '',
        status: 'apply',
        url: ''
      },
      {
        label: t('setting.sysEveLog'),
        model: 'syslog',
        disabled: false,
        progress: '',
        status: 'apply',
        url: ''
      },
      {
        label: t('setting.agtRunLog'),
        model: 'applog',
        disabled: false,
        progress: '',
        status: 'apply',
        url: ''
      }
    ])
    //初始化状态
    const initState = () => {
      unref(logActionData).forEach((ele) => {
        ele.disabled = false
        ele.progress = '0%'
        ele.status = 'apply'
        ele.url = ''
      })
    }
    // 收集/下载/重新收集
    const pop_Confirm = async (model, url) => {
      popVisible.value = false
      if (url) {
        const a = document.createElement('a')
        a.href = url
        a.click()
      } else {
        await collectLogApi({
          host_id: props.host_id!,
          model
        })
      }
    }
    //获取收集的状态
    const popVisibleChange = async (v) => {
      if (v) {
        //初始化state
        initState()
        //获取状态
        const { progress, status, model, url } = await collectLogProcessApi({
          host_id: props.host_id!
        })
        // 赋值
        unref(logActionData).forEach((ele) => {
          ele.disabled = status === 'applying'
          if (ele.model === model) {
            ele.status = status
            ele.progress = status === 'applying' ? progress : ''
            ele.url = status === 'down' ? url : ''
          }
        })
      }
      popVisible.value = v
    }

    return {
      getPopupContainer,
      logActionData,
      pop_Confirm,
      popVisibleChange,
      popVisible,
      t
    }
  }
})
</script>

<style lang="less" scoped>
::v-deep(.collect) {
  .ant-btn {
    color: '#ff0000';
  }
}
.error {
  color: red;
}
.disC {
  color: #000;
  &:hover {
    color: #000;
  }
}
.noradiuBtn {
  width: 100%;
  text-align: center;
}
.recontainer {
  position: relative;
  .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
