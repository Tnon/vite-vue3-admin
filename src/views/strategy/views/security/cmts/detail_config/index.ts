import driveInjection from './drive-injection.vue'
import { TableColumn } from "@/types/tableColumn";
import { processPath } from '../../../../components'
import { createVNode } from 'vue'
import addModal from './addModal.vue'
import { InjectCfg } from '@/api/strategy/model'
const validatePath = (_, value) => {
    const res = [...new Set(value.split(''))]
    if (res.length === 1 && res[0] === '*') {
        return Promise.reject()
    } else if (!res.length) {
        return Promise.reject()
    }
    return Promise.resolve()
}
export const useColumns = (t): TableColumn[] => [
    {
        title: t('strategy.appName'),
        dataIndex: 'modname',
        ellipsis: true,
    },
    {
        title: t('asset.processPath'),
        dataIndex: 'modparams',
        customRender: ({ text: modparams }) => createVNode(processPath, { modparams, type: 'path' }),
        ellipsis: true,
    },
    {
        title: t('arcomn.cmdlineDraw'),
        dataIndex: 'modparams',
        ellipsis: true,
        customRender: ({ text: modparams }) => createVNode(processPath, { modparams, type: 'param' })
    },
    {
        title: t('common.action'),
        dataIndex: 'action',
        slots: {
            customRender: 'action_icon'
        },
    },]
export const useFormItems = (t: any): TableColumn[] => [{
    title: t('strategy.appName'),
    dataIndex: 'name',
    formProps: {
        type: 'input',
        rules: [
            {
                required: true, trigger: 'blur', message: t('strategy.appNameNoEmp')
            }
        ],
        placeholder: t('strategy.pIptAppName')
    }
},
{
    title: t('asset.processPath'),
    dataIndex: 'path',
    formProps: {
        type: 'input',
        rules: [
            {
                required: true, trigger: 'blur', message: t('strategy.pIptProPath'), validator: validatePath
            }
        ],
        placeholder: t('strategy.proPathVali')
    }
},
{
    title: t('arcomn.cmdlineDraw'),
    dataIndex: 'command',
    formProps: {
        type: 'input',
        placeholder: t('strategy.comLiVali'),
        extraSlot: true
    }
}]
// modname：名称
// modparams：[{"path":"C:\program\office\word.exe","param":"-a -b -sdf3"},{"path":"C:\program\office\excel.exe","param":"-d -e"}]
// osver：系统版本
const useCfgList = (modelValue): InjectCfg => {
    let obj: InjectCfg = {
        modname: modelValue.name,
        modparams: []
    }
    modelValue.tagsList.forEach(ele => {

        const cacheObj = {
            path: ele.split(',')[0],
            param: ele.split(',')[1]
        }
        obj.modparams.push(cacheObj)
    })
    obj.modparams = JSON.stringify(obj.modparams)
    return obj

}
const cfgJsonToObj = (cfgjson) => {
    let modparams: string[] = []
    JSON.parse(cfgjson).forEach(ele => {
        modparams.push(ele.path + ',' + ele.param)
    })
    return modparams
}
const isExistName = (injectcfgs, modname) => injectcfgs.every((ele) => ele.modname !== modname)
const isExistProPath = (injectcfgs, modparams): boolean => {
    let flag: boolean = false
    let allProPathArr: any = []
    injectcfgs.forEach(ele => {
        allProPathArr = allProPathArr.concat(JSON.parse(ele.modparams))
    })
    allProPathArr.forEach(ele => {

        if (ele.path === modparams.path && ele.param === modparams.command) {
            flag = true
        }
    })
    return flag
}
export { driveInjection, addModal, useCfgList, cfgJsonToObj, isExistName, isExistProPath }
