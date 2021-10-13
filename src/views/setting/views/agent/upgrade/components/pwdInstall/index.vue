<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-21 12:03:00
 * @LastEditTime: 2021-09-09 19:51:28
-->
<template>
  <div>
    <div class="node">
      <div class="label">{{ t('common.system') }}:</div>
      <switch-node size="small" :types="FTypes" v-model:actived="activedType" />
    </div>
    <div class="node">
      <div class="label">{{ t('common.selectGroup') }}:</div>
      <select-tree
        class="selecTree"
        :dataSource="treeGroup"
        v-model:selectedKeys="grouplist"
        :placeholder="t('common.psecGrp')"
        :multiple="false"
      />
    </div>
    <div class="node">
      <div class="label">{{ t('setting.geincmd') }}:</div>
      <div>
        <a-button class="btn" type="link" @click="makeInstall">
          {{ t('setting.gencmd') }}
        </a-button>
        <a-button
          class="btn"
          :disabled="!!!commandStr.length"
          type="link"
          @click="copyCommand"
        >
          {{ t('setting.copycmd') }}
        </a-button>
        <a-textarea :rows="10" v-model:value="commandStr" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import switchNode from '@/components/switchNodes'
import { FTypes } from './index'
import { useGroupTree } from '@/hooks'
import selectTree from '@/components/selectTree'
import { Input, message } from 'ant-design-vue'
import { makeInstallCmd } from '@/api/setting/agent'
import useClipboard from 'vue-clipboard3'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    switchNode,
    [Input.TextArea.name]: Input.TextArea,
    selectTree
  },
  setup() {
    const { t } = useI18n()
    //复制
    const { toClipboard } = useClipboard()
    //命令
    const commandStr = ref<string>('')
    //获取分组
    const treeGroup = useGroupTree('all')
    //选择分组
    const grouplist = ref<number | undefined>(undefined)
    //swt
    const activedType = ref<string>('1')
    //生成命令
    const makeInstall = async () => {
      if (grouplist.value === undefined || grouplist.value === -1) {
        message.error(t('common.psecGrp'))
        return
      }
      const { command } = await makeInstallCmd({
        osver: unref(activedType),
        group_id: unref(grouplist)!
      })
      commandStr.value = command
    }
    //复制命令
    const copyCommand = async () => {
      try {
        await toClipboard(commandStr.value)
        message.success(t('setting.copClid'))
      } catch (e) {}
    }
    return {
      FTypes,
      activedType,
      treeGroup,
      grouplist,
      commandStr,
      makeInstall,
      copyCommand,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.node {
  display: flex;
  align-items: baseline;
  margin-bottom: 30px;
  .label {
    margin-right: 20px;
    position: relative;
    text-align: right;
    width: 120px;
    &::before {
      content: '*';
      color: red;
      margin-right: 10px;
    }
  }
  .btn {
    border: 1px solid #eee;
    margin-right: 16px;
    margin-bottom: 16px;
  }
}
</style>
