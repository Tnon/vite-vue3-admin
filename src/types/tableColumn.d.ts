/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-19 15:08:04
 */
import { ColumnProps, TableProps } from 'ant-design-vue/lib/table/interface'
import { VNode } from 'vue'
import { FormItem } from './schema.d'
interface iconList {
    type?: string
    text: string
    func: ({ record, ...rest }, callback: (...rest) => any) => any
    disabled?: any
}
export declare interface ActionOptions {
    type: 'select' | 'button' | 'text' | 'popconfirm' | 'icon' | 'switch'; // 控制类型，默认为a,可选： select | button | text
    text?: string;
    permission?: { // 权限
        action?: 'create' | 'delete' | 'update' | 'retrieve'; // CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作
        effect?: 'disabled';
    };
    actionList?: iconList[];
    disabled?: any
    props?: any; // 组件属性，v-bind="props"
    // func?: ({ text, record, index }, callback: (...rest) => any) => any; // 动作事件触发回调
    func?: ({ record, ...rest }, callback: (...rest) => any) => any; // 动作事件触发回调
}

export declare interface TableColumn extends ColumnProps {
    title?: string;
    dataIndex: string;
    width?: number | string;
    slots?: {
        customRender?: string;
        title?: string
    };
    slotsType?: 'format' | 'link' | 'component';
    slotsFunc?: (record, callback?) => any;
    actions?: ActionOptions[];
    formProps?: FormItem
    render?: (h, params) => VNode,
    children?: TableColumn[]
}
