/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-16 09:29:48
 * @LastEditTime: 2021-09-01 14:17:02
 */
import type { ColumnProps, TableProps } from "ant-design-vue/lib/table/interface";
import type { PaginationProps } from "ant-design-vue/lib/pagination/Pagination";

export interface Columns extends ColumnProps {
    actions?: any;
    dataIndex: string;
}

export type pageOption = Partial<PaginationProps>


export interface Props extends Omit<TableProps, 'columns'> {
    columns: Columns[]
    rowKey: string | ((record: any) => string)
    pageOption: pageOption
    getListFunc: (prams) => any
    getCanSelectFunc: (prams) => any
    isCheck: boolean
    arguments: any
    extraFunc: ExtraFunc
    customRow: TableProps['customRow']
    totalNum: number
    allowCheckAll: boolean
    disabledKeys: DisbKeys[]
    customReload: any
}
export interface ExtraFunc {
    sortVsb?: boolean;
    dragRow?: boolean;
    dragCol?: boolean;
}

export interface DisbKeys {
    key: string
    value: any
}
interface rowSelection {
    selectedRowKeys: string[]
    onChange(selectedRowKeys): void
    onSelect(record, selected): void
    onSelectAll(...rest): void
    getCheckboxProps: (record) => any

}
export interface TableRowSelection {
    rowSelection: undefined | rowSelection
}