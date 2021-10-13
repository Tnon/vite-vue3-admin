<template>
  <div class="box">
    <!-- 邮件服务配置 start -->
    <email-service />
    <!-- 邮件服务配置 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { emailService } from './cmts/email-service'
export default defineComponent({
  components: {
    emailService
  },
  setup() {}
})
</script>
<style lang="less" scoped>
.box {
  margin-left: 16px;
}
</style>
