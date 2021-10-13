/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-30 10:06:47
 */
// import dataTable from './index.vue'
import { handleAttackRisk } from '@/api/attack_risk'
import { TableColumn } from "@/types/tableColumn";
import { createVNode, computed } from "vue";
import { protectStatus, comLevel, handTool } from '@/components/attack-risk-cmts'
import store from '@/store'
import hostIp from '@/components/host-ip'
import { useI18n } from '@/plugins/setupGlobalLocalLang'
const T = useI18n()
interface RecordNode {
    host_id: string
    content_md5: string
    dtype: number
}
//开启选择时候，不让手动处理(在父组件取值，优化表格性能)
const isCheck = computed(() => store.state['selectAll'].isCheck)

export const batchHandleRecord = async (filter, isall, recordArr, refreshTreeAndTable) => {
    const sendObj: RecordNode[] = []
    recordArr.forEach(ele => {
        const [host_id, content_md5, dtype] = ele.split(',')
        sendObj.push({ host_id, content_md5, dtype: ~~dtype })
    })
    const { code } = await handleAttackRisk({
        filter,
        isall,
        riskinfolist: sendObj,
    })
    !code && refreshTreeAndTable()


}
export const useColumns = (type: number): TableColumn[] => [
    {
        title: T('arcomn.handleTime'),
        dataIndex: 'create_at',
        className: 'handleShow',
        width: 200,
        sorter: true,
    },
    {
        title: T('arcomn.protStatus'),
        dataIndex: 'handled',
        sorter: true,
        width: 200,
        customRender: ({ record }) => createVNode(protectStatus, { type: record.handled })
    },
    {
        title: T('arcomn.level'),
        dataIndex: 'level',
        sorter: true,
        width: 200,
        customRender: ({ record }) => createVNode(comLevel, { level: record.level, type: type === 1 ? 'attack' : 'risk' })
    },
    {
        title: type === 1 ? T('arcomn.attackType') : T('arcomn.riskType'),
        dataIndex: 'dtype',
        width: 200,
        sorter: true,
        customRender: ({ record }) => createVNode('span', { class: 'attRskType' }, record.dtypename)
    },
    {
        title: type === 1 ? T('arcomn.attackSrc') : T('arcomn.riskSrc'),
        dataIndex: 'risksrc',
        width: 200,
        sorter: true,
    },
    {
        title: T('arcomn.disTime'),
        dataIndex: 'event_at',
        width: 200,
        sorter: true,
    },
    {
        title: T('arcomn.repoTime'),
        dataIndex: 'update_at',
        width: 200,
        sorter: true,
    },
    {
        title: type === 1 ? T('arcomn.attChar') : T('arcomn.riskChar'),
        dataIndex: 'description',
        width: 500,
    },
    {
        title: T('arcomn.impactHost'),
        dataIndex: 'ip',
        width: 200,
        sorter: true,
        customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
    },
    {
        title: T('arcomn.action'),
        dataIndex: 'handtool',
        className: 'handleHide',
        width: 200,
        slots: {
            customRender: 'handtool'
        },
        slotsType: 'component',
        slotsFunc: ({ host_id, content_md5, dtype, description, osver, handled, }, reload) => createVNode(handTool, { host_id, content_md5, dtype, reload, description, osver, handled, isCheck: isCheck.value })
    },
    {
        title: T('arcomn.operator'),
        dataIndex: 'username',
        width: 200,
        className: 'handleShow',
        sorter: true,
    },
]
// export default dataTable