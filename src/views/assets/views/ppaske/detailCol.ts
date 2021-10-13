import { createVNode } from 'vue'
import hostIp from '@/components/host-ip'


export const getapi_columnsDetail = (type, T) => {
    const api_columnsDetail = {
        processPro: [
            {
                title: T('common.hostIp'),
                dataIndex: 'ip',
                width: 200,
                customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
            },
            {
                title: T('asset.processPath'),
                dataIndex: 'path',
                width: 360
            },
            {
                title: 'PID',
                dataIndex: 'process_id',
                width: 120
            },
            {
                title: T('asset.runUser'),
                dataIndex: 'username',
                width: 200
            },
            {
                title: T('asset.startTime'),
                dataIndex: 'start_time',
                width: 200
            },
            {
                title: T('asset.startArg'),
                dataIndex: 'command_info',
                width: 100,
                ellipsis: true
            },
            {
                title: T('asset.threads'),
                dataIndex: 'thread_num',
                width: 100
            },
            {
                title: T('asset.cpuUtil'),
                dataIndex: 'cpu_util',
                width: 100
            },
            {
                title: T('asset.memUtil'),
                dataIndex: 'mem_util',
                width: 100
            },
            {
                title: T('asset.IOR'),
                dataIndex: 'io_read_bytes',
                width: 120
            },
            {
                title: T('asset.IOW'),
                dataIndex: 'io_write_bytes',
                width: 120
            },
        ],
        processIp: [
            {
                title: T('asset.processPath'),
                dataIndex: 'path',
                width: 360
            },
            {
                title: 'PID',
                dataIndex: 'process_id',
                width: 120
            },
            {
                title: T('asset.runUser'),
                dataIndex: 'username',
                width: 120
            },
            {
                title: T('asset.startTime'),
                dataIndex: 'start_time',
                width: 200
            },
            {
                title: T('asset.startArg'),
                dataIndex: 'command_info',
                width: 100,
                ellipsis: true
            },
            {
                title: T('asset.threads'),
                dataIndex: 'thread_num',
                width: 100
            },
            {
                title: T('asset.cpuUtil'),
                dataIndex: 'cpu_util',
                width: 100
            },
            {
                title: T('asset.memUtil'),
                dataIndex: 'mem_util',
                width: 100
            },
            {
                title: T('asset.IOR'),
                dataIndex: 'io_read_bytes',
                width: 120
            },
            {
                title: T('asset.IOW'),
                dataIndex: 'io_write_bytes',
                width: 120
            },
        ],
        portPro: [
            {
                title: T('common.hostIp'),
                dataIndex: 'ip',
                width: 200,
                customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
            },
            {
                title: T('asset.processName'),
                dataIndex: 'process_name',
                width: 480
            },
            {
                title: 'PID',
                dataIndex: 'process_id',
                width: 220
            },
            {
                title: T('asset.agreement'),
                dataIndex: 'prococol',
                width: 220
            },
            {
                title: T('asset.runUser'),
                dataIndex: 'username',
                width: 220
            },
            {
                title: T('asset.startTime'),
                dataIndex: 'start_time',
                width: 420
            }
        ],
        portIp: [
            {
                title: T('asset.portNum'),
                sorter: true,
                dataIndex: 'port',
                width: 366
            },
            {
                title: T('asset.processName'),
                dataIndex: 'process_name',
                width: 366
            },
            {
                title: 'PID',
                dataIndex: 'process_id',
                width: 220
            },
            {
                title: T('asset.agreement'),
                dataIndex: 'prococol',
                width: 220
            },
            {
                title: T('asset.runUser'),
                dataIndex: 'username',
                width: 220
            },
            {
                title: T('asset.startTime'),
                dataIndex: 'start_time',
                width: 366
            }
        ],

        servicePro: [
            {
                title: T('common.hostIp'),
                dataIndex: 'ip',
                width: 280,
                customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
            },
            {
                title: T('common.description'),
                dataIndex: 'description',
                width: 400
            },
            {
                title: 'PID',
                dataIndex: 'process_id',
                width: 120
            },
            {
                title: T('asset.servStatus'),
                dataIndex: 'state',
                width: 120
            },
            {
                title: T('asset.startTime'),
                dataIndex: 'start_time',
                width: 200
            },
            {
                title: T('asset.mapPtth'),
                dataIndex: 'path',
                width: 320
            },
            {
                title: T('common.fileSha256'),
                dataIndex: 'sha256',
                width: 400
            }
        ],
        serviceIp: [
            {
                title: T('asset.startService'),
                dataIndex: 'name',
                width: 200
            },
            {
                title: T('common.description'),
                dataIndex: 'description',
                width: 400
            },
            {
                title: 'PID',
                dataIndex: 'process_id',
                width: 120
            },
            {
                title: T('asset.servStatus'),
                dataIndex: 'state',
                width: 120
            },
            {
                title: T('asset.startTime'),
                dataIndex: 'start_time',
                width: 200
            },
            {
                title: T('asset.mapPtth'),
                dataIndex: 'path',
                width: 320
            },
            {
                title: T('common.fileSha256'),
                dataIndex: 'sha256',
                width: 400
            }
        ],

        envPro: [
            {
                title: T('common.hostIp'),
                dataIndex: 'ip',
                width: 880,
                customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
            },
            {
                title: T('asset.enValue'),
                dataIndex: 'value',
                width: 880
            }
        ],
        envIp: [
            {
                title: T('asset.envName'),
                dataIndex: 'name',
                width: 880
            },
            {
                title: T('asset.enValue'),
                dataIndex: 'value',
                width: 880
            }
        ],

        kernelPro: [
            {
                title: T('common.hostIp'),
                dataIndex: 'ip',
                width: 200,
                customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
            },
            {
                title: T('common.description'),
                dataIndex: 'description',
                width: 400
            },
            {
                title: T('asset.corrSerName'),
                dataIndex: 'service_name',
                width: 200
            },
            {
                title: T('asset.modelSize'),
                dataIndex: 'image_size',
                width: 120
            },
            {
                title: T('asset.modelPath'),
                dataIndex: 'path',
                width: 280
            },
            {
                title: T('common.fileSha256'),
                dataIndex: 'sha256',
                width: 280
            },
            {
                title: T('asset.digiSign'),
                dataIndex: 'signature',
                width: 280
            }
        ],
        kernelIp: [
            {
                title: T('asset.kerName'),
                dataIndex: 'name',
                width: 200
            },
            {
                title: T('common.description'),
                dataIndex: 'description',
                width: 400
            },
            {
                title: T('asset.corrSerName'),
                dataIndex: 'service_name',
                width: 200
            },
            {
                title: T('asset.modelSize'),
                dataIndex: 'image_size',
                width: 120
            },
            {
                title: T('asset.modelPath'),
                dataIndex: 'path',
                width: 280
            },
            {
                title: T('common.fileSha256'),
                dataIndex: 'sha256',
                width: 280
            },
            {
                title: T('asset.digiSign'),
                dataIndex: 'signature',
                width: 280
            }
        ],

        accountPro: [
            {
                title: T('common.hostIp'),
                dataIndex: 'ip',
                width: 200,
                customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
            },
            {
                title: 'UID',
                dataIndex: 'user_id',
                width: 400
            },
            {
                title: 'GID',
                dataIndex: 'group_id',
                width: 280
            },
            {
                title: T('asset.accStatus'),
                dataIndex: 'enabled',
                customRender: ({ text }) => {
                    return text ? T('common.enable') : T('common.unEnable')
                },
                width: 200
            },
            {
                title: T('asset.rootPower'),
                dataIndex: 'is_super_user',
                customRender: ({ text }) => {
                    return text ? T('common.admin') : T('common.unAdmin')
                },
                width: 200
            },
            {
                title: 'Shell',
                dataIndex: 'shell',
                width: 200
            },
            {
                title: T('common.lastLogin'),
                dataIndex: 'login_time',
                width: 280
            },
        ],
        accountIp: [
            {
                title: T('asset.accName'),
                dataIndex: 'username',
                width: 220,
                // customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
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
                title: T('asset.accStatus'),
                dataIndex: 'enabled',
                customRender: ({ text }) => {
                    return text ? T('common.enable') : T('common.unEnable')
                },
                width: 200
            },
            {
                title: T('asset.rootPower'),
                dataIndex: 'is_super_user',
                customRender: ({ text }) => {
                    return text ? T('common.admin') : T('common.unAdmin')
                },
                width: 200
            },
            {
                title: 'Shell',
                dataIndex: 'shell',
                width: 200
            },
            {
                title: T('common.lastLogin'),
                dataIndex: 'login_time',
                width: 280
            },
        ],
    }
    return api_columnsDetail[type]
}