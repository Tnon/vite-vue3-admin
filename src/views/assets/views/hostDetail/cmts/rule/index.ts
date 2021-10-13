/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 14:18:14
 * @LastEditTime: 2021-10-12 16:55:54
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.stagyName'),
    dataIndex: 'policy_name',
    width: 400
  },
  {
    title: t('asset.stagyType'),
    dataIndex: 'policy_type',
    width: 400,
    customRender: ({ text }) => createVNode('span', {}, text === 1 ? t('strategy.domain') : t('strategy.security'))
  },
  {
    title: t('asset.effStau'),
    dataIndex: 'status',
    width: 120,
    customRender: ({ text }) => createVNode('span', { style: { color: !text ? '#F8A04C' : '#18BA79' } }, text ? t('asset.effeVe') : t('asset.notEffe'))
  },
  {
    title: t('asset.applyType'),
    dataIndex: 'apply_type',
    width: 120,
    customRender: ({ text }) => createVNode('span', {}, text ? t('common.group') : t('asset.host'))
  },
  {
    title: t('asset.poliSrc'),
    dataIndex: 'source',
    width: 200,
    customRender: ({ text }) => createVNode('span', {}, text ? t('asset.userDef') : t('asset.dftTmp'))
  },
  {
    title: t('asset.updDate'),
    dataIndex: 'updated_at',
    width: 400
  }
]
