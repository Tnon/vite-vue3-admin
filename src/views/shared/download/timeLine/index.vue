<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-23 19:09:19
 * @LastEditTime: 2021-10-13 15:05:19
-->
<template>
  <div class="timeLine">
    <template v-for="(item, index) in installStep[osType]">
      <div class="titleAndStep">
        <span class="step">{{ index + 1 }}</span>
        <span class="title">{{ t('download.' + item.step) }}</span>
      </div>
      <div class="line">
        <template v-for="(ele, index) in item.children">
          <div class="lineP">
            <span class="line_subtitle" v-if="ele.label">
              {{ t('download.method', [index + 1]) }}
            </span>
            <div class="linetext" v-html="ele.value" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { installDesc as installStep } from './index'
export default defineComponent({
  props: {
    osType: String,
    downLoadUrl: String,
    ip: String,
    port: String,
    agent_filename: String
  },
  setup(props) {
    const { t } = useI18n()
    watch(
      () => props.downLoadUrl,
      (v) => {
        if (v) {
          //文件名
          installStep.Linux[0].children![0].value = t('download.linMone', [
            props.agent_filename
          ])
          //下载地址
          installStep.Linux[0].children![1].value = t('download.wget', [
            props.downLoadUrl?.replaceAll('(', '\\(').replaceAll(')', '\\)')
          ])
          //chmod ip和端口+文件名
          // installStep.Linux[1].children![0].value = `在root 帐户下执行以下命令：<br>文件执行授权 （chmod +x ${props.agent_filename}） <br> 执行安装文件（./${props.agent_filename} -r ${props.ip} -p ${props.port} -g<分组id> ）`
          installStep.Linux[1].children![0].value = t('download.cmdIns', [
            props.agent_filename,
            props.ip,
            props.port
          ])
        }
      }
    )

    return {
      installStep,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.timeLine {
  margin-top: 24px;
}
.titleAndStep {
  display: flex;
  align-items: center;
}
.step {
  display: inline-block;
  width: 32px;
  height: 32px;
  text-align: center;
  border-radius: 50%;
  line-height: 32px;
  background: #eee;
}
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  padding-left: 16px;
}
.line {
  margin: 5px 0;
  min-height: 170px;
  margin-left: 16px;
  border-left: 1px solid #aaa;
  padding-left: 35px;
  padding-bottom: 15px;
  .lineP {
    display: flex;
    margin-bottom: 16px;
  }
  .line_subtitle {
    display: inline-block;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    margin: 0 17px 0px 0;
    min-width: 80px;
  }
  .linetext {
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
    word-break: break-all;
  }
  &:last-child {
    display: none;
  }
}
</style>
