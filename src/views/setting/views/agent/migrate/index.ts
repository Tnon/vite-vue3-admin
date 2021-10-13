import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
import manageAddress from "./cmts/manageAddress";
import notMigrate from "./cmts/notMigrate";

export const useColumns = (t): TableColumn[] => [
  {
    title: t('setting.migGrp'),
    dataIndex: 'group_name'
  },
  {
    title: t('setting.manaUrl'),
    dataIndex: 'new_host',
    slots: {
      customRender: 'new_host'
    },
    slotsType: 'component',
    slotsFunc: ({ new_host, group_id }, reload) => createVNode(manageAddress, { ipGroup: new_host.split(','), group_id, reload }),
  },
  {
    title: t('setting.migTime'),
    dataIndex: 'updated_at',
  },
  {
    dataIndex: 'uneffected',
    // customRender: ({ text: uneffected }) => createVNode(notMigrate, { uneffected }),
    slotsType: 'component',
    slotsFunc: ({ uneffected, group_id }, callback) => createVNode(notMigrate, { uneffected, callback, group_id }),
    slots: {
      title: 'customTitle',
      customRender: 'uneffected'
    }

  },
  {
    title: t('setting.migTotal'),
    dataIndex: 'total'
  }
]