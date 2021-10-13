<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 19:31:18
 * @LastEditTime: 2021-09-01 15:26:47
-->
<template>
  <div class="uptab">
    <div class="upload">
      <!-- header start -->
      <div class="header">
        <span class="title">上传适配包</span>
        <a-button class="node" type="link">
          <ExceptionOutlined />
          上传记录
        </a-button>
      </div>
      <!-- header end -->

      <!-- 上传 start -->
      <a-row :gutter="16" class="rowpad">
        <template v-for="(item, key) in osType" :key="key">
          <a-col span="12">
            <uploadAgent
              :placeHolder="`请上传环境库 for ${key}`"
              :type="key"
              btnName="上传适配包"
              v-model:version="osType[key]"
              :back="false"
            >
              <template #text>
                <div class="uptitle">安芯神甲-环境库 {{ item.name }}</div>
                <div class="upversion">
                  <span>支持：1209及以上Agent版本 </span>
                </div>
              </template>
            </uploadAgent>
          </a-col>
        </template>
      </a-row>
      <!-- 上传 end -->

      <!--分割线 start -->
      <div class="line" />
      <!--分割线 end -->
    </div>

    <!-- 表格 start -->
    <envTable />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Row, Col } from 'ant-design-vue'
import { uploadAgent } from '../components'
import { envTable } from './views'
import { ExceptionOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    uploadAgent,
    envTable,
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
  .line {
    height: 1px;
    background: #eeeeee;
    margin: 8px 16px 0px 16px;
  }
}
</style>
