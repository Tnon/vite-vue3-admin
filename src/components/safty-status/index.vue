<template>
  <div>
    <span class="attack" @click="jumpTo('attack')" v-if="attacked_count">
      攻击
    </span>
    <span class="risk" @click="jumpTo('risk')" v-if="risk_count"> 风险 </span>
    <span class="healty" v-if="!attacked_count && !risk_count"> 健康 </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    attacked_count: Number,
    risk_count: Number,
    ip: String
  },
  setup(props) {
    const router = useRouter()
    const jumpTo = (name) => {
      router.push({ name, query: { ip: props.ip } })
    }
    return {
      jumpTo
    }
  }
})
</script>

<style lang="less" scoped>
span {
  width: 40px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 4px;
  transition: all 0.3s;
}
.attack {
  background: #f05064;
  color: #fff;
  cursor: pointer;
  &:hover {
    width: 50px;
  }
}
.risk {
  background: #f8a454;
  color: #fff;
  cursor: pointer;
  &:hover {
    width: 50px;
  }
}
.healty {
  background: rgba(24, 186, 121, 0.15);
  color: #18ba79;
}
</style>
