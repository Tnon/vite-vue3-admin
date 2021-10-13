import { TableColumn } from "@/types/tableColumn";
import { FormItem } from '@/types/schema'
import { validateIp } from "@/utils/reg";

export const useFormItems = (t: any): TableColumn[] => [
  {
    title: 'IP',
    dataIndex: 'ip',
    formProps: {
      type: 'input',
      placeholder: t('setting.ipPlac'),
      rules: [
        { required: true, trigger: 'blur', message: t('setting.ipPlac'), validator: validateIp },
      ]
    }
  },
  {
    title: t('setting.port'),
    dataIndex: 'port',
    formProps: {
      type: 'input',
      placeholder: t('setting.portPlac'),
      extraSlot: false,
      rules: [
        { required: true, message: t('setting.portPlac'), trigger: 'blur' }
      ]
    }
  },
  {
    title: t('setting.agmY'),
    dataIndex: 'network',
    formProps: {
      type: 'select',
      placeholder: t('setting.proPlac'),
      options: [
        {
          value: 'UDP',
          label: 'UDP'
        },
        {
          value: 'TCP',
          label: 'TCP'
        }
      ],
      rules: [
        { required: true, trigger: 'change', message: t('setting.proPlac') }
      ]
    }
  }
]
export const useDataType = (t: any): TableColumn[] => [
  {
    title: t('menu.attack'),
    dataIndex: 'attack'
  },
  {
    title: t('menu.risk'),
    dataIndex: 'risk'
  },
  {
    title: t('log.behavior'),
    dataIndex: 'bha_log'
  },
  {
    title: t('menu.assets'),
    dataIndex: 'assets'
  }
]
export const useSyncConfig = (): FormItem[] => [
  {
    label: 'eveDay',
    value: '0'
  },
  {
    label: 'weekly',
    value: '1'
  },
  {
    label: 'sycNow',
    value: '2'
  }
]

export const useWeekData = (): FormItem[] => [
  {
    label: 'Monday',
    value: '1'
  },
  {
    label: 'Tuesday',
    value: '2'
  },
  {
    label: 'Wednesday',
    value: '3'
  },
  {
    label: 'Thursday',
    value: '4'
  },
  {
    label: 'Friday',
    value: '5'
  },
  {
    label: 'Saturday',
    value: '6'
  },
  {
    label: 'Sunday',
    value: '7'
  }
]