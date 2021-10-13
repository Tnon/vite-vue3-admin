import { toRaw } from "vue"
import { Columns } from '@/components/slots-table/types'
export function useDragOrder(props, emit): (...rest) => void {
    const columsObj = toRaw(props.columns)
    return ({ value, type }) => {
        let newColumns: Columns[] = []
        //选择操作
        if (type == 'check') {
            value.forEach(ele => {
                columsObj.forEach(elev => {
                    if (elev.dataIndex == ele.value && ele.checked) {
                        newColumns.push(elev)
                    }
                })
            })
        } else {
            //拖拽操作
            value.forEach(ele => {
                columsObj.forEach(eleb => {
                    if (ele.value == eleb.dataIndex && ele.checked) {
                        newColumns.push(eleb)
                    }
                })
            })
        }
        emit('update:columns', newColumns)
    }
}