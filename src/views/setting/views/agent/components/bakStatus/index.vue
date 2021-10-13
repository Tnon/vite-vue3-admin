<template>
  <div :style="{ color }">
    {{ text }}
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    status: Number
  },
  setup(props) {
    const { t } = useI18n()
    const state = reactive({
      color: 'rgba(0, 0, 0, 0.85)',
      text: ''
    })
    watchEffect(() => {
      switch (props.status) {
        case 1:
          state.text = t('setting.baking')
          break
        case 2:
          state.text = t('setting.bakSuc')
          state.color = 'rgba(24, 182, 102, 1)'
          break
        case 3:
          state.text = t('setting.bakFail')
          state.color = 'rgba(246, 84, 86, 1)'
          break
        case 4:
          state.text = t('setting.Importing')
          break
        case 5:
          state.text = t('setting.iptSucc')
          state.color = 'rgba(24, 182, 102, 1)'
          break
        case 6:
          state.text = t('setting.iptFail')
          state.color = 'rgba(246, 84, 86, 1)'
          break
      }
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
