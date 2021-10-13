<template>
  <div>
    <span class="circle" :style="{ background: color }">{{ t(text) }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Alevel, Rlevel } from '@/enums/pstatus'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    type: String,
    level: [String, Number]
  },
  setup(props) {
    const { t } = useI18n()
    let Pstatus = props.type === 'attack' ? Alevel : Rlevel
    let text: Alevel | Rlevel | string = '',
      color: string = ''
    switch (~~props.level!) {
      case 0:
        text = Pstatus['LOW']
        color = '#f0da5a'
        break
      case 3:
        text = Pstatus['HIGH']
        color = '#F05064'
        break
      case 2:
        text = Pstatus['MID']
        color = '#F8A454'
        break
      case 1:
        text = Pstatus['LOW']
        color = '#f0da5a'
        break
      default:
        text = Pstatus['HIGH']
        color = '#F05064'
        break
    }
    return {
      text,
      color,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.circle {
  height: 56px;
  width: 56px;
  text-align: center;
  line-height: 56px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  display: inline-block;
  border-radius: 50%;
  margin-right: 24px;
}
</style>
