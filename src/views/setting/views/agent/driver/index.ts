import { TableColumn } from "@/types/tableColumn"
import { createVNode } from 'vue'
import hostOnline from '@/components/host-online'
import hostIp from '@/components/host-ip'
import { agentStatus, driverStatus, restartAgent, logAction } from "./cmts"
export const types: Items[] = [
  {
    title: 'common.windows',
    type: '1',
  },
  {
    title: 'common.linux',
    type: '0',
  }
]
type fTypes = '0' | '1'
interface option {
  columns: TableColumn[],
}
type driverType = Record<fTypes, option>
const customRenderCell = (record, type) => {
  if (record.status && JSON.parse(record.status)) {
    return createVNode(driverStatus, { status: JSON.parse(record.status)[type] })
  } else if (record.status == null) {
    return createVNode("span", {}, "-");
  } else {
    return createVNode(driverStatus, { status: false })
  }
}
const useComPre = (t: any): TableColumn[] => [
  {
    title: t('common.hostIp'),
    dataIndex: 'host',
    width: 200,
    customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: !!record.online })
  },
  {
    title: t('common.onlineStau'),
    dataIndex: 'online',
    sorter: true,
    width: 150,
    customRender: ({ record }) => createVNode(hostOnline, { online: !!record.online })
  },
  {
    title: t('common.agentVersion'),
    dataIndex: 'agentVer',
    width: 200,
    ellipsis: true
  },
  {
    title: t('setting.agtSDs'),
    width: 200,
    ellipsis: true,
    dataIndex: 'verify_status',
    customRender: ({ text }) => {
      if (!text || text === '-') {
        return createVNode('span', {}, '-')
      }
      return createVNode(agentStatus, { agentStatus: JSON.parse(text) })
    }
  },
]
const useComNext = (t: any): TableColumn[] => [
  {
    title: t('setting.acCau'),
    dataIndex: 'abnreason',
    width: 200,
    ellipsis: true
  },
  {
    title: t('common.updateTime'),
    dataIndex: 'update_at',
    width: 200,
    ellipsis: true
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    customRender: ({ record }) => createVNode(restartAgent, { online: !!record.online, driverStatus: record.drvstatus, host_id: record.host_id })
  },
  {
    title: t('menu.log'),
    width: 100,
    dataIndex: 'log',
    customRender: ({ record }) => createVNode(logAction, { online: !!record.online, host_id: record.host_id })
  }
]
export const useDriverData = (t: any): driverType => {
  return {
    //windows
    '1': {
      columns: [
        ...useComPre(t),
        {
          title: t('setting.driStu'),
          dataIndex: 'status',
          children: [
            {
              title: 'AxDefense',
              dataIndex: 'AxDefense',
              width: 200,
              customRender: ({ record, column }) => customRenderCell(record, column.dataIndex)
            },
            {
              title: 'AxBehaviorMonitor',
              dataIndex: 'AxBehaviorMonitor',
              width: 200,
              customRender: ({ record, column }) => customRenderCell(record, column.dataIndex)
            },
            {
              title: 'BaseBehaviorMoniterDriver',
              dataIndex: 'BaseBehaviorMoniterDriver',
              width: 200,
              customRender: ({ record, column }) => customRenderCell(record, column.dataIndex)
            },
          ],
        },
        ...useComNext(t)
      ]
    },
    //linux
    '0': {
      columns: [
        ...useComPre(t),
        {
          title: t('setting.driStu'),
          dataIndex: 'status',
          width: 200,
          children: [
            {
              title: 'memprotect_service',
              dataIndex: 'memprotect_service',
              width: 200,
              customRender: ({ record, column }) => customRenderCell(record, column.dataIndex)
            },

          ],
        },
        ...useComNext(t)
      ]
    }
  }
}
