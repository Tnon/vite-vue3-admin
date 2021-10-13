<template>
  <draggable :list="columns_bak" @change="log">
    <a-checkbox
      v-for="(element, index) in columns_bak"
      :key="index"
      :checked="element.checked"
      @change="changeCheck($event, index)"
      >{{ element.label }}</a-checkbox
    >
  </draggable>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, ref, toRefs, toRaw } from 'vue'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { VueDraggableNext } from 'vue-draggable-next'
interface Columns extends ColumnProps {
  actions?: any
  dataIndex: string
}
type coluContent = {
  label: string
  value: string
  checked: any
}
type columsType = coluContent[]
export default defineComponent({
  name: 'tabfilter',
  components: { draggable: VueDraggableNext },
  props: {
    columns: {
      type: Object as PropType<Columns[]>
    }
  },
  setup(props, { emit }) {
    const dragOptions = {
      animation: 0,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost'
    }
    let columns_bak: columsType = reactive([])
    const columnsObj = toRaw(props.columns)
    columnsObj?.forEach((ele) => {
      columns_bak.push({
        label: ele.title as string,
        value: ele.dataIndex,
        checked: true
      })
    })
    const changeCheck = (e, i) => {
      columns_bak[i].checked = e.target.checked
      emit('changeColumns', { value: toRaw(columns_bak), type: 'check' })
    }
    const log = (el) => {
      emit('changeColumns', { value: toRaw(columns_bak), type: 'order' })
    }
    return {
      columns_bak,
      changeCheck,
      dragOptions,
      log
    }
  }
})
</script>
<style lang="less" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.aaaa {
  background: red;
}
</style>
