<template>
  <a-upload :showUploadList="false" :headers="headers">
    <slot></slot>
  </a-upload>
</template>
<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import { Upload } from 'ant-design-vue'
import store from '@/store'
export default defineComponent({
  components: {
    [Upload.name]: Upload
  },
  setup() {
    const token = computed(() => store.state.user.token)
    const headers = {
      Authorization: `Bearer ${unref(token)}`
    }

    return {
      headers
    }
  }
})
</script>
