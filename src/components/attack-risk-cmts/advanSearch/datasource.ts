export interface TreeDataItem {
    value: string;
    id: string;
    name?: string;
    disabled?: boolean;
    items?: TreeDataItem[];
}
export const statusData: TreeDataItem[] = [
    {
        name: '已拦截',
        value: '已拦截',
        id: '3',
    },
    {
        name: '已加黑',
        value: '已加黑',
        id: '2',
    },
    {
        name: '已加白',
        value: '已加白',
        id: '1',
    },
    {
        name: '仅上报',
        value: '仅上报',
        id: '5',
    },
    {
        name: '未处理',
        value: '未处理',
        id: '0',
    },
]