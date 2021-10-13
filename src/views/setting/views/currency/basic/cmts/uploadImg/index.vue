<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-20 11:21:53
 * @LastEditTime: 2021-10-12 17:10:06
-->
<template>
  <div class="uploadImg">
    <img :src="logoUrl" alt="" class="img" />
    <upload-file
      action="api/upload/logo"
      accept=".png"
      :beforeUpload="beforeUpload"
      @change="handleChange"
    >
      <a-button class="btn">
        <span>{{ t('setting.uploadImg') }}</span>
      </a-button>
    </upload-file>
    <span class="format">{{ t('setting.upFmt') }}</span>
    <span class="size">{{ t('setting.upFSize') }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import uploadFile, { FileItem, FileInfo } from '@/components/upload-file'
import { isPng } from '@/utils/is'
import { message } from 'ant-design-vue'
import store from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    uploadFile
  },
  setup() {
    const { t } = useI18n()
    const logoUrl = computed(() => store.state.productLogo.logoUrl)
    const fileList = ref([])
    const imageUrl = ref<string>('')
    //上传之前校验
    const beforeUpload = (file: FileItem) => {
      if (isPng(file.name!)) {
        Promise.resolve(file)
      } else {
        message.error(t('setting.upLpng'))
        return false
      }
    }
    //上传完成
    const handleChange = (info: FileInfo) => {
      if (info.file.status === 'error') {
        message.error(t('setting.uploadError'))
      }
      if (info.file.status === 'done') {
        message.success(t('setting.uploadSuc'))
        const { url: centerlogo } = info.file.response as any
        store.commit('productLogo/SetProductLogo', centerlogo)
      }
    }
    return {
      fileList,
      imageUrl,
      beforeUpload,
      handleChange,
      logoUrl,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.uploadImg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 80px;
  margin-top: 40px;
  img {
    width: 64px;
    height: 64px;
    border: 1px #aaaaaa dashed;
    border-radius: 8px;
  }
  .format,
  .size {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 18px;
  }
  .btn {
    margin: 16px 0 12px 0;
    background: #18ba79;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
  }
}
</style>
