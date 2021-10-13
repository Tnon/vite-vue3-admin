<template>
  <div class="comlevel">
    <a-badge :color="color" />
    <span :style="{ color }">{{ t(text) }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Alevel, Rlevel } from '@/enums/pstatus'
import { Badge } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Badge.name]: Badge
  },
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
        color = '#F0DA5A'
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
        color = '#F0DA5A'
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
.comlevel {
  display: inline-block;
}
</style>
