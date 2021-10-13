<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-08-18 16:22:45
-->
<template>
  <div class="tagsContainer">
    <span
      v-for="item in policyrecord"
      :key="item.group_id"
      class="tags"
      :class="[item.status === 1 ? 'success' : 'faild']"
      @click="showDraw(item)"
    >
      {{ item.group_name }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tag } from 'ant-design-vue'
import useCreatDraw from '@/hooks/use-click-row'
import { drawCont } from '../index'
interface GroupMsg {
  group_id: number
  group_name: string
  policy_id: number
  status: number
}
export default defineComponent({
  props: {
    policyrecord: {
      type: Array,
      default: () => []
    },
    name: String,
    desc: String,
    policy_type: Number,
    reload: Function
  },
  components: {
    [Tag.name]: Tag
  },
  setup(props) {
    const activedId = ref<number | undefined>(undefined)
    const showDraw = (options: GroupMsg) => {
      props.reload!()
      useCreatDraw(
        {
          contentProps: {
            options,
            desc: props.desc!,
            title: props.name!,
            policy_type: props.policy_type
          }
        },
        drawCont
      )
    }
    return {
      showDraw,
      activedId
    }
  }
})
</script>

<style lang="less" scoped>
.tagsContainer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.tags {
  display: inline-block;
  padding: 2px 5px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 4px;
  margin: 5px;
  min-width: 80px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3s;
  box-sizing: content-box;
  &:hover {
    padding: 2px 8px;
  }
}
.success {
  background: #18b666;
  color: #fff;
}
.faild {
  background: #f8a04c;
  color: #fff;
}
</style>
