import subForm from './index.vue'
export default subForm
import { FormItem } from '@/types/schema'
import { TableColumn } from '@/types/tableColumn'
import { getReportOptions } from '@/api/report'

type Type = 'week' | 'month'
export interface NofieldState {
  week: string[]
  month: string[]
  emails: string[]
  round: Type
}
// Monday: '周一',
// Tuesday: '周二',
// Wednesday: '周三',
// Thursday: '周四',
// Friday: '周五',
// Saturday: '周六',
// Sunday: '周日',
export const useWeekMonthData = (t) => {
  return {
    week: [
      {
        label: t('setting.Monday'),
        value: '1'
      },
      {
        label: t('setting.Tuesday'),
        value: '2'
      },
      {
        label: t('setting.Wednesday'),
        value: '3'
      },
      {
        label: t('setting.Thursday'),
        value: '4'
      },
      {
        label: t('setting.Friday'),
        value: '5'
      },
      {
        label: t('setting.Saturday'),
        value: '6'
      },
      {
        label: t('setting.Sunday'),
        value: '7'
      }
    ],
    month: [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2'
      },
      {
        label: '3',
        value: '3'
      },
      {
        label: '4',
        value: '4'
      },
      {
        label: '5',
        value: '5'
      },
      {
        label: '6',
        value: '6',
      },
      {
        label: '7',
        value: '7'
      },
      {
        label: '8',
        value: '8'
      },
      {
        label: '9',
        value: '9'
      },
      {
        label: '10',
        value: '10',
      },
      {
        label: '11',
        value: '11'
      },
      {
        label: '12',
        value: '12'
      },
      {
        label: '13',
        value: '13'
      },
      {
        label: '14',
        value: '14'
      },
      {
        label: '15',
        value: '15',
      },
      {
        label: '16',
        value: '16'
      },
      {
        label: '17',
        value: '17'
      },
      {
        label: '18',
        value: '18'
      },
      {
        label: '19',
        value: '19'
      },
      {
        label: '20',
        value: '20',
      },
      {
        label: '21',
        value: '21'
      },
      {
        label: '22',
        value: '22'
      },
      {
        label: '23',
        value: '23'
      },
      {
        label: '24',
        value: '24'
      },
      {
        label: '25',
        value: '25',
      },
      {
        label: '26',
        value: '26'
      },
      {
        label: '27',
        value: '27'
      },
      {
        label: '28',
        value: '28'
      },
      {
        label: '29',
        value: '29'
      },
      {
        label: '30',
        value: '30',
      },
      {
        label: '31',
        value: '31'
      }
    ]
  }
}


export const useEveryWMType = (t): FormItem[] => [
  {
    label: t('setting.weekly'),
    value: 'week'
  },
  {
    label: t('setting.monthly'),
    value: 'month'
  }
]

export const useFormItems = (t): TableColumn[] => [
  {
    dataIndex: 'name',
    formProps: {
      type: 'input',
      placeholder: t('report.subNamePlac'),
      rules: [
        {
          required: true,
          trigger: 'blur',
          message: t('report.subNamePlac'),
        }
      ]
    }
  },
  {
    dataIndex: 'select',
    formProps: {
      type: 'select',
      placeholder: t('report.seleSubRep'),
      rules: [
        {
          required: true,
          message: t('report.seleSubRep'),
        }
      ],
      asyncOptions: getReportOptions
    }
  }
]