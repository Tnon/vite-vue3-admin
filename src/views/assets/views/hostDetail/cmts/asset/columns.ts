
import type { FilterColumns } from './type'
import { getHostViewDetail as processApi } from '@/api/asset/process'
import { getHostViewDetail as portApi } from '@/api/asset/port'
import { getHostViewDetail as accountApi } from '@/api/asset/account'
import { getHostViewDetail as envApi } from '@/api/asset/env'
import { getHostViewDetail as serviceApi } from '@/api/asset/service'
import { getHostViewDetail as kernelApi } from '@/api/asset/kernel'
export const useColumnsData = (t): FilterColumns => {
  return {
    process: {
      value: 111,
      place: t('asset.pInput', [t('asset.processName')]),
      api: processApi,
      columns: [
        {
          title: t('asset.processName'),
          dataIndex: 'name',
          width: 200
        },
        // {
        //   title: '进程版本',
        //   dataIndex: '',
        //   width: 120
        // },
        {
          title: t('asset.processPath'),
          dataIndex: 'path',
          width: 360
        },
        {
          title: 'PID',
          dataIndex: 'process_id',
          width: 120
        },
        {
          title: t('asset.runUser'),
          dataIndex: 'username',
          width: 120
        },
        {
          title: t('asset.startTime'),
          dataIndex: 'start_time',
          width: 200
        },
        {
          title: t('asset.startArg'),
          dataIndex: 'command_info',
          width: 200
        },
        {
          title: t('asset.threads'),
          dataIndex: 'thread_num',
          width: 100
        },
        {
          title: t('asset.cpuUtil'),
          dataIndex: 'cpu_util',
          width: 100
        },
        {
          title: t('asset.memUtil'),
          dataIndex: 'mem_util',
          width: 100
        },
        {
          title: t('asset.IOR'),
          dataIndex: 'io_read_bytes',
          width: 120
        },
        {
          title: t('asset.IOW'),
          dataIndex: 'io_write_bytes',
          width: 120
        }
      ]
    },
    port: {
      value: 34,
      place: t('asset.pInput', [t('asset.portNum')]),
      api: portApi,
      columns: [
        {
          title: t('asset.portNum'),
          dataIndex: 'port',
          width: 366
        },
        {
          title: t('asset.processName'),
          dataIndex: 'process_name',
          width: 366
        },
        {
          title: 'PID',
          dataIndex: 'process_id',
          width: 220
        },
        {
          title: t('asset.agreement'),
          dataIndex: 'prococol',
          width: 220
        },
        {
          title: t('asset.runUser'),
          dataIndex: 'username',
          width: 200
        },
        {
          title: t('asset.startTime'),
          dataIndex: 'start_time',
          width: 366
        },
      ]
    },
    account: {
      value: 111,
      place: t('asset.pInput', [t('asset.accName')]),
      api: accountApi,
      columns: [
        {
          title: t('asset.accName'),
          dataIndex: 'username',
          width: 320
        },
        {
          title: 'UID',
          dataIndex: 'user_id',
          width: 280
        },
        {
          title: 'GID',
          dataIndex: 'group_id',
          width: 280
        },
        {
          title: t('asset.accStatus'),
          dataIndex: 'enabled',
          customRender: ({ text }) => {
            return text ? t('common.enable') : t('common.unEnable')
          },
          width: 200
        },
        {
          title: t('asset.rootPower'),
          dataIndex: 'is_super_user',
          customRender: ({ text }) => {
            return text ? t('common.admin') : t('common.unAdmin')
          },
          width: 200
        },
        {
          title: 'shell',
          dataIndex: 'shell',
          width: 200
        },
        {
          title: t('common.lastLogin'),
          dataIndex: 'password_change_time',
          width: 280
        },
      ]
    },
    service: {
      value: 111,
      place: t('asset.pInput', [t('asset.startService')]),
      api: serviceApi,
      columns: [
        {
          title: t('asset.startService'),
          dataIndex: 'name',
          width: 200
        },
        {
          title: t('common.description'),
          dataIndex: 'description',
          width: 400
        },
        {
          title: 'PID',
          dataIndex: 'process_id',
          width: 120
        },
        {
          title: t('asset.servStatus'),
          dataIndex: 'state',
          width: 120
        },
        {
          title: t('asset.startTime'),
          dataIndex: 'start_time',
          width: 200
        },
        {
          title: t('asset.mapPtth'),
          dataIndex: 'path',
          width: 320
        },
        {
          title: t('common.fileSha256'),
          dataIndex: 'sha256',
          width: 320
        }
      ]
    },
    kernel: {
      value: 143,
      place: t('asset.pInput', [t('asset.kerName')]),
      api: kernelApi,
      columns: [
        {
          title: t('asset.kerName'),
          dataIndex: 'name',
          width: 200
        },
        {
          title: t('common.description'),
          dataIndex: 'description',
          width: 400
        },
        {
          title: t('asset.corrSerName'),
          dataIndex: 'service_name',
          width: 200
        },
        {
          title: t('asset.modelSize'),
          dataIndex: 'image_size',
          width: 120
        },
        {
          title: t('asset.modelPath'),
          dataIndex: 'path',
          width: 280
        },
        {
          title: t('common.fileSha256'),
          dataIndex: 'sha256',
          width: 280
        },
        {
          title: t('asset.digiSign'),
          dataIndex: 'signature',
          width: 280
        }
      ],

    },
    environment: {
      value: 111,
      place: t('asset.pInput', [t('asset.envName')]),
      api: envApi,
      columns: [
        {
          title: t('asset.envName'),
          dataIndex: 'name',
          width: 880
        },
        {
          title: t('asset.enValue'),
          dataIndex: 'value',
          width: 880
        }
      ]
    }
  }
}

