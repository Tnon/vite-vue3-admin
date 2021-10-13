<template>
  <div class="box">
    <div class="cardCon bk_br_sd">
      <!-- 头部 start -->
      <div class="header">
        <span class="title">{{ option.title }}</span>
        <span class="subTitle" v-if="option.subTitle">
          {{ option.subTitle }}
        </span>
      </div>
      <!-- 头部 end -->
      <!-- 选项 start -->
      <a-radio-group v-model:value="checked" :disabled="!pth">
        <template v-for="item in option.groups.children">
          <a-radio class="radio" :value="item.value">{{ item.title }}</a-radio>
        </template>
      </a-radio-group>
      <!-- 选项 end -->
      <div v-if="checked === 1">
        <!-- 文本域 start -->
        <a-textarea
          class="textArea"
          :placeholder="option.areaPlace"
          v-model:value="areavalue"
          :disabled="!pth"
        />
        <!-- 文本域 start -->
        <a-button
          class="btn"
          :disabled="!!!areavalue.length || !pth"
          type="primary"
          @click="addTag"
        >
          {{ t('common.add') }}
        </a-button>

        <!-- tags start -->
        <template v-for="(item, index) in valueList" :key="item">
          <a-tag closable @close="closeTag(index)">{{ item }}</a-tag>
        </template>
        <!-- tags end -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, unref } from 'vue'
import { Input, message, Tag } from 'ant-design-vue'
import { CardRuls } from './index'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Input.TextArea.name]: Input.TextArea,
    [Tag.name]: Tag
  },
  props: {
    option: Object as PropType<CardRuls>,
    checkValue: Number,
    valueList: Array as PropType<string[]>,
    pth: Number,
    type: String
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    //radio 的值
    const checked = computed({
      get: () => props.checkValue,
      set: (val) => emit('update:checkValue', val)
    })

    //textarea
    const areavalue = ref<string>('')

    //添加tag
    const addTag = () => {
      let reg: any
      if (props.type === 'ip') {
        reg =
          /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      } else {
        reg = /^[a-zA-Z0-9_$~!#%^&-]{3,50}$/
      }

      const valueArr: Array<string> = [...new Set(unref(areavalue)!.split('/'))]
      const rightResult = valueArr.every((ele) => reg.test(ele))
      if (rightResult) {
        areavalue.value = ''
        valueArr.forEach((ele) => {
          if (props.valueList!.indexOf(ele) < 0) {
            props.valueList!.push(ele)
          }
        })
      } else {
        message.error(t('strategy.validFail'))
      }
    }
    //删除tag
    const closeTag = (index) => {
      props.valueList!.splice(index, 1)
    }
    return {
      checked,
      areavalue,
      addTag,
      closeTag,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  display: flex;
  justify-content: center;
  background: #fff;
  margin: 20px 16px;

  .cardCon {
    // width: 600px;
    width: 100%;
    padding: 0 16px 16px 16px;
  }
  .radio {
    display: block;
    height: 50px;
    line-height: 50px;
  }
  .textArea {
    margin: 16px 0;
  }
  .btn {
    margin-bottom: 16px;
    display: block;
  }
}
.header {
  height: 48px;
  line-height: 48px;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .subTitle {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin-left: 16px;
  }
}
</style>
