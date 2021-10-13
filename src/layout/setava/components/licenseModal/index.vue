<template>
  <div class="box">
    <a-row>
      <a-col span="8">
        <div class="logo">
          <img src="@/assets/images/logo-mini.png" alt="" />
          <div class="name">{{ t('license.memProSys') }}</div>
          <div class="version">{{ product_version }}</div>
        </div>
      </a-col>
      <a-col span="16">
        <!-- 授权状态 start -->
        <auth-status />
        <!-- 授权状态 end -->

        <!-- 授权台数 start -->
        <auth-num />
        <!-- 授权台数 end -->

        <!-- 授权天数 start -->
        <auth-days />
        <!-- 授权天数 end -->
        <div class="fitem">
          <a-input type="text" readonly v-model:value.trim="fileName"></a-input>
        </div>
      </a-col>
    </a-row>
    <div class="btns">
      <a-button
        type="primary"
        class="ml16"
        :loading="uploading"
        @click="handleUpload"
        :disabled="!fileName"
      >
        {{ t('license.updaAuth') }}
      </a-button>

      <upload-file accept=".lic" :beforeUpload="beforeUpload">
        <a-button type="link">{{ t('license.seleFile') }}</a-button>
      </upload-file>
    </div>
    <!-- 服务ID start -->
    <server-id />
    <!-- 服务ID end -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Row, Col, Input, Button } from 'ant-design-vue'
import { authStatus, authNum, authDays, serverId } from './cmts'
import uploadFile, { FileItem } from '@/components/upload-file'
import { uoloadLicense } from '@/api/system'
import store from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Button.name]: Button,
    authStatus,
    authNum,
    authDays,
    serverId,
    uploadFile
  },
  setup() {
    const { t } = useI18n()
    //上传状态
    const uploading = ref<boolean>(false)
    //获取上传文件名
    const fileName = ref<string>('')
    //存储上传的文件
    const licenseFile = ref<FileItem>()
    //上传前的钩子
    const beforeUpload = (file): boolean | Promise<any> => {
      licenseFile.value = file
      fileName.value = file.name
      return false
    }
    //版本
    const product_version = computed(
      () => store.state.productLogo.productVersion
    )
    //上传
    const handleUpload = async () => {
      const formData = new FormData()
      uploading.value = true
      formData.append('file', licenseFile.value as any)
      await uoloadLicense(formData)
      uploading.value = false
      //获取license
      await store.dispatch('license/getLicense')
    }
    return {
      beforeUpload,
      fileName,
      handleUpload,
      uploading,
      product_version,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
