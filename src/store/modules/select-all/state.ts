
export type IExclude = {
    exclude: string[];
    isSelectAll: boolean
    isCheck: boolean
};
export const state: IExclude = {
    exclude: [],
    isSelectAll: false,
    isCheck: false
};
