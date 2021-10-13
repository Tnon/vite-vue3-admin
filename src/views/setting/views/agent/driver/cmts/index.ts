/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-31 09:34:49
 * @LastEditTime: 2021-08-31 10:21:37
 */
import { TableColumn } from '@/types/tableColumn'
import agentStatus from './agentStatus/index.vue'
import driverStatus from './driverStatus/index.vue'
import restartAgent from './restartAgent/index.vue'
import logAction from './logAction/index.vue'
import { createVNode } from 'vue'
export const useColumns = (t): TableColumn[] => [
  {
    title: t('setting.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('setting.status'),
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }) => createVNode('span', {
      style: { color: text ? '#18b666' : '#FF0000' }
    }, text ? t('common.success') : t('common.fail'))
  }
]

export interface dataType {
  name: string,
  status: boolean
}
export { agentStatus, driverStatus, restartAgent, logAction }
