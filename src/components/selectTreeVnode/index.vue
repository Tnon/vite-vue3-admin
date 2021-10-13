<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-14 19:16:54
 * @LastEditTime: 2021-08-25 20:19:15
-->
<template>
  <a-form>
    <a-form-item v-bind="validateInfos.target_group_id">
      <a-tree-select
        :replaceFields="replaceFields"
        class="treeselect"
        v-model:value="target_group_idState.target_group_id"
        :tree-data="dataSource"
        treeNodeFilterProp="title"
        :tree-checkable="false"
        show-search
        allow-clear
        :placeholder="placeholder || t('common.allPlace')"
        :show-checked-strategy="SHOW_PARENT"
        @select="selectTree"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { TreeSelect, Tooltip, Form } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { getHostGroups } from '@/api/asset/host'
import { useI18n } from 'vue-i18n'
const useForm = Form.useForm

export default defineComponent({
  props: {
    placeholder: {
      type: String
    },
    replaceFields: {
      type: Object,
      default: () => ({
        children: 'items',
        title: 'name',
        key: 'id',
        value: 'id'
      })
    },
    target_group_idState: Object,
    id: Number
  },
  components: {
    DownOutlined,
    [Tooltip.name]: Tooltip,
    [TreeSelect.name]: TreeSelect
  },
  setup(props) {
    const { t } = useI18n()
    const rulesRef = reactive({
      target_group_id: [
        {
          required: true,
          message: t('asset.selectGroup')
        }
      ]
    })
    const { validate, validateInfos } = useForm(
      props.target_group_idState!,
      rulesRef
    )
    //树 数据
    let dataSource: any = ref<any>()
    const getTreeData = async () => {
      const { groups } = await getHostGroups(-1, String(props.id + ',' + '0'))
      dataSource.value = groups
    }
    getTreeData()
    const SHOW_PARENT = TreeSelect.SHOW_PARENT
    const selectedName = ref<string>('')
    //选择树节点
    const selectTree = (_, { dataRef }) => {
      selectedName.value = dataRef.name
    }
    return {
      SHOW_PARENT,
      selectTree,
      dataSource,
      validate,
      validateInfos,
      selectedName,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.suffixIcon {
  position: absolute;
  top: 5px;
  right: 10px;
  color: #666;
}
</style>
