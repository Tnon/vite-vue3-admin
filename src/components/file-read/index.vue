<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 17:14:58
-->
<template>
  <a-upload :beforeUpload="beforeUpload" action="/" accept=".txt">
    <slot />
  </a-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { message, Upload } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Upload.name]: Upload
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    // 读取文件
    ;(FileReader.prototype as any).reading = function ({ encode }) {
      let bytes = new Uint8Array(this.result) //无符号整型数组
      let text = new TextDecoder(encode || 'UTF-8').decode(bytes)
      return text
    }
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function (f) {
      if (!this.onload)
        //如果this未重写onload函数，则创建一个公共处理方式
        this.onload = (e) => {
          //在this.onload函数中，完成公共处理
          let rs = (this as any).reading()
        }
      this.readAsArrayBuffer(f) //内部会回调this.onload方法
    }
    const readFile = (f) => {
      let rd: any = new FileReader()
      rd.onload = (e) => {
        //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        let cont = rd.reading({ encode: 'GBK' })
        // this.formCustom.zdata = cont;
        emit('readTxt', cont)
      }
      rd.readAsBinaryString(f)
    }
    const beforeUpload = (file) => {
      if (file.name.endsWith('.txt')) {
        readFile(file)
      } else {
        message.error(t('strategy.texfileFmt'))
      }
      // 读取数据
      return Promise.reject('')
    }
    return {
      beforeUpload
    }
  }
})
</script>
<style lang="less" scoped></style>
