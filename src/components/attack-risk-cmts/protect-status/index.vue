<template>
  <div class="tag" :class="{ unhandle: ~~$props.type === 0 }">
    {{ t(`arcomn.${text}`) }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { Pstatus } from '@/enums/pstatus'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    type: [String, Number]
  },
  setup(props) {
    const { t } = useI18n()
    let text = ref<string>('')
    watchEffect(() => {
      switch (props.type) {
        case 0:
          text.value = Pstatus['UNHANDLE']
          break
        case 1:
          text.value = Pstatus['WHITE']
          break
        case 2:
          text.value = Pstatus['BLACK']
          break
        case 3:
          text.value = Pstatus['LANJIE']
          break
        case 5:
          text.value = Pstatus['SBAO']
          break
        default:
          text.value = Pstatus['CLEAR']
          break
      }
    })

    return {
      text,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  padding: 2px 8px;
  background: #18ba79;
  border-radius: 2px;
}
.unhandle {
  background: #f05064;
}
</style>
