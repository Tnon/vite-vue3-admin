<template>
  <div class="injectModal">
    <slots-form
      :formItemLayout="formItemLayout"
      :colsMap="formItems"
      :fields="formModel"
      ref="formRef"
    >
      <a-button type="primary" class="slotBtn" @click="btnEvent">
        {{ btnName }}
      </a-button>
    </slots-form>
    <div class="tags">
      <template v-for="(item, index) in tagsList" :key="item">
        <a-tag
          class="tagSelf"
          :class="{ actived: selectedTag === item }"
          @click="selectTag(item)"
          closable
          @close="delTag(item, index)"
        >
          {{ item }}
        </a-tag>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  unref,
  watch,
  toRefs,
  PropType
} from 'vue'
import slotsForm from '@/components/slots-form'
import { useFormItems, isExistName, isExistProPath } from './index'
import { message, Tag } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    tagsList: {
      type: Array,
      default: () => []
    },
    modname: String,
    records: Array as PropType<any[]>
  },
  components: {
    slotsForm,
    [Tag.name]: Tag
  },
  setup(props) {
    const formRef = ref<any>()
    const { t } = useI18n()
    const formItems = useFormItems(t)
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    //按钮名字
    const btnName = ref<string>(t('common.add'))
    //选择的标签
    const selectedTag = ref<string>('')
    //应用名称和标签列表
    const modalValue = reactive({
      tagsList: props.tagsList as any,
      name: props.modname as any
    })
    // 表单信息
    const formModel = reactive({
      name: props.modname as any,
      path: '',
      command: ''
    })
    watch(selectedTag, (v) => {
      btnName.value = v ? t('common.edit') : t('common.add')
    })
    //监听name变化 赋值给modelValue
    watch(
      () => formModel.name,
      (v) => {
        modalValue.name = v
      }
    )
    //初始化
    const initForm = () => {
      selectedTag.value = ''
      formModel.path = ''
      formModel.command = ''
    }
    //添加
    const btnEvent = async () => {
      try {
        await unref(formRef).validate()
      } catch {
        return
      }
      if (props.modname) {
        if (props.modname !== formModel.name) {
          // if (!props.records!.every((ele) => ele.modname !== formModel.name)) {
          if (!isExistName(props.records, formModel.name)) {
            message.error(t('strategy.nameExist'))
            return
          }
        }
      } else {
        if (!isExistName(props.records, formModel.name)) {
          message.error(t('strategy.nameExist'))
          return
        }
      }

      if (modalValue.tagsList.length >= 10 && !unref(selectedTag)) {
        message.error(t('common.noMoreThan', [10]))
        return
      }
      formModel.command = formModel.command ? formModel.command : '*'
      const nodes = formModel.path + ',' + formModel.command
      //如果存在 不添加
      if (modalValue.tagsList.indexOf(nodes) > -1) {
        return false
      }
      //进程和路径重复检验
      if (
        isExistProPath(props.records, {
          path: formModel.path,
          command: formModel.command
        })
      ) {
        message.error(t('strategy.existSame'))
        return
      }
      if (unref(selectedTag)) {
        //修改
        const selectedIndex = modalValue.tagsList.indexOf(unref(selectedTag))
        modalValue.tagsList[selectedIndex] = nodes
      } else {
        //新增
        modalValue.tagsList.push(nodes)
      }
      initForm()
    }
    //删除
    const delTag = (item, index) => {
      if (selectedTag.value == item) {
        initForm()
      }
      modalValue.tagsList.splice(index, 1)
    }
    //选择标签
    const selectTag = (item) => {
      selectedTag.value = selectedTag.value == item ? '' : item
      const [path, command] = unref(selectedTag).split(',')
      formModel.path = path
      formModel.command = command
    }
    return {
      ...toRefs(modalValue),
      formItems,
      formModel,
      formItemLayout,
      btnEvent,
      modalValue,
      delTag,
      selectTag,
      selectedTag,
      btnName,
      formRef
    }
  }
})
</script>
<style lang="less" scoped>
.tagSelf {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  line-height: 19px;
  height: 22px;
  padding-right: 7px;
  &:hover {
    padding-right: 20px;
    ::v-deep(.anticon) {
      // display: inline-block;
      transform: scale(1);
    }
  }
  ::v-deep(.anticon) {
    transition: all 0.4s;
    position: absolute;
    right: 3px;
    top: 4px;
    transform: scale(0);
  }
}
.actived {
  background: #18ba79;
  color: #fff;
}
.injectModal {
  ::v-deep(.ant-input) {
    border-radius: 8px;
  }
  .slotBtn {
    margin-left: 16px;
  }
}
</style>
