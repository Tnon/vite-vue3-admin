/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-08 14:06:49
 */
import { TableColumn } from '@/types/tableColumn'
import memberLog from './index.vue'
export const useColumns = (t): TableColumn[] => [
  {
    title: t('log.actTime'),
    dataIndex: 'created_at',
    width: 200
  },
  {
    title: t('log.adminRole'),
    dataIndex: 'u_type',
    width: 200
  },
  {
    title: t('log.useName'),
    dataIndex: 'email',
    width: 300
  },
  {
    title: t('log.model'),
    dataIndex: 'modtype',
    width: 200
  },
  {
    title: t('log.logLevel'),
    dataIndex: 'oplevel',
    width: 200
  },
  {
    title: t('log.actDes'),
    dataIndex: 'description',
    width: 400
  },
]
export interface Option {
  value: string;
  label: string;
  children?: Option[];
}
export { memberLog }
