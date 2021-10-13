<template>
  <span :style="{ color }">{{ text }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    status: String
  },
  setup(props) {
    const { t } = useI18n()
    let text, color
    switch (String(props.status)) {
      case '0':
        text = t('common.success')
        color = 'rgba(0, 0, 0, .8)'
        break
      case '-':
        text = '-'
        // text_color = 'rgba(0, 0, 0, .8)';
        break
      case '6':
        text = t('setting.succManMig')
        color = 'rgba(0, 0, 0, .8)'
        break
      default:
        text = t('common.fail')
        color = 'rgba(248, 160, 76, 1)'
      // text_color = '#F23131';
    }
    return {
      text,
      color
    }
  }
})
</script>
