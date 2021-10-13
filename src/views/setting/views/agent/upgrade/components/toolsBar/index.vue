<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-20 11:44:38
-->
<template>
  <div class="tools">
    <a-button class="node" type="link" @click="pwdInstall">
      <ContainerOutlined />
      {{ t('setting.insByCmd') }}
    </a-button>
    <a-button class="node" type="link" @click="copy">
      <DatabaseOutlined />
      {{ t('setting.downUrl') }}
    </a-button>
    <a-popover
      destroyTooltipOnHide
      placement="bottom"
      @visibleChange="upgradeTypePopVisible"
      trigger="click"
    >
      <template #content>
        <div class="content">
          <a-radio-group v-model:value="upgradeType">
            <a-radio :value="1">http</a-radio>
            <a-radio :value="2">socket</a-radio>
          </a-radio-group>
          <div class="saveCls">
            <a-button type="primary" @click="saveUpgradeType">{{
              t('common.save')
            }}</a-button>
          </div>
        </div>
      </template>
      <a-button class="node" type="link">
        <DesktopOutlined />
        {{ t('setting.upgMode') }}
      </a-button>
    </a-popover>
    <a-button class="node" type="link" @click="uploadRecord">
      <ExceptionOutlined />
      {{ t('setting.upgRed') }}
    </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Popover } from 'ant-design-vue'
import {
  ContainerOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  ExceptionOutlined
} from '@ant-design/icons-vue'
import { recordModal, pwdInstallModal } from '../index'
import { useModal } from '@/hooks'
import useClipboard from 'vue-clipboard3'
import { useRouter } from 'vue-router'
import { getUpGradeType, setUpGradeType } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ContainerOutlined,
    DatabaseOutlined,
    DesktopOutlined,
    ExceptionOutlined,
    [Popover.name]: Popover
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    //口令安装
    const pwdInstall = () => {
      useModal(
        {
          title: t('setting.insByCmd'),
          width: 600
        },
        pwdInstallModal
      )
    }
    //复制
    const { toClipboard } = useClipboard()
    const copy = async () => {
      // try {
      //   await toClipboard('复制的内容')
      //   message.success('已复制到剪贴板')
      // } catch (e) {
      //   console.error(e)
      // }
      router.push({
        name: 'download'
      })
    }
    //升级方式
    const upgradeType = ref<number>(1)
    //获取升级方式
    const upgradeTypePopVisible = (v) => {
      v && getUpGType()
    }
    const getUpGType = async () => {
      const { way } = await getUpGradeType()
      upgradeType.value = way
    }
    //设置升级方式
    const saveUpgradeType = () => {
      setUpGradeType({ way: upgradeType.value })
    }
    //上传记录
    const uploadRecord = () => {
      useModal(
        {
          title: t('setting.upgRed'),
          width: 800,
          wrapClassName: 'modalBodyNopad'
        },
        recordModal
      )
    }
    return {
      uploadRecord,
      upgradeType,
      copy,
      pwdInstall,
      saveUpgradeType,
      upgradeTypePopVisible,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.tools {
  .node {
    display: inline-block;
    padding: 6px 16px;
    margin: 0 8px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
  }
}
.content {
  .saveCls {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
