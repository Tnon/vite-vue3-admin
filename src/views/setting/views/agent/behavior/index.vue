<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 19:31:18
 * @LastEditTime: 2021-09-14 19:58:17
-->
<template>
  <div class="uptab">
    <div class="upload">
      <div class="header">
        <span class="title">上传升级包</span>
        <a-button class="node" type="link">
          <ExceptionOutlined />
          上传记录
        </a-button>
      </div>

      <!-- 上传 start -->
      <a-row :gutter="16" class="rowpad">
        <template v-for="(item, key) in osType" :key="key">
          <a-col span="12">
            <upload-agent
              :placeHolder="`请上传行为库 for ${key}`"
              :type="key"
              :back="false"
              btnName="上传升级包"
              v-model:version="osType[key]"
            >
              <template #text>
                <div class="uptitle">安芯神甲-行为库 {{ item.name }}</div>
                <div class="upversion">
                  <span>支持：1209及以上Agent版本 </span>
                </div>
              </template>
            </upload-agent>
          </a-col>
        </template>
      </a-row>
      <!-- 上传 end -->
    </div>

    <div class="upMSg">
      <div class="header">升级说明</div>
      <div class="content">
        行为库升级包，上传成功后，将自动为所有主机进行适配，无需手动升级操作。
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Row, Col } from 'ant-design-vue'
import { uploadAgent } from '../components'
import { ExceptionOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    uploadAgent,
    ExceptionOutlined
  },
  setup() {
    const osType = reactive({
      Windows: {
        name: ''
      },
      Linux: {
        name: ''
      }
    })
    return {
      osType
    }
  }
})
</script>
<style lang="less" scoped>
.uptab {
  margin-left: 16px;
  .upload {
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    .header {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 0 24px;
      .title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
      }
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

    .uptitle {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
      margin-bottom: 4px;
    }
    .upversion {
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
    }
    .rowpad {
      padding: 8px 16px;
    }
  }
}
.upMSg {
  margin-top: 16px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  .header {
    height: 48px;
    line-height: 48px;
    padding: 0 24px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .content {
    height: 60px;
    line-height: 60px;
    padding: 0 35px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
