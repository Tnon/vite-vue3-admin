import { VAxios } from './Axios';
import { AxiosTransform } from './axiosTransform';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { checkStatus } from './checkStatus';
import { Modal, message as Message } from "ant-design-vue";
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { isString } from '@/utils/is/'
import { removeAllPending, Logout } from '@/utils/tools'
import { RequestOptions, Result } from './types';
const isDev = import.meta.env.DEV
import store from '@/store'
import { storage } from '@/utils/Storage'
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { useI18n } from '@/plugins/setupGlobalLocalLang';
const T = useI18n()
const ERROR = Message.error!,
    SUCCESS = Message.success!,
    CONFIRM = Modal.confirm!;

const transform: AxiosTransform = {
    /**
  * @description: 请求完成时候的处置(成功和失败 HttpCode===200)
  */
    transformRequestData: (res: AxiosResponse<Result> | any, options: RequestOptions) => {
        const { successMessageText, errorMessageText } = options;
        const { code, msg } = res.data
        if (code) {
            //统一处理错误
            ERROR(msg || errorMessageText)
        } else {
            // 统一处理正确弹框
            if (successMessageText) {
                if (options.messageMode === 'modal') {
                    CONFIRM({ title: T('message.opraSuc'), content: T('message.' + successMessageText) });
                    // SUCCESS(successMessageText || '操作成功！')
                } else {
                    SUCCESS(T('message.' + successMessageText) || T('message.opraSuc'))
                }
            }
        }
        // }
        return res.data;
    },
    /**
   * @description: 请求之前处理配置
   */
    beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig => {

        const { apiUrl } = options;
        config.url = isDev ? `${config.url}` : `${apiUrl || ''}${config.url}`
        if (config.method === RequestEnum.GET) {
            if (!isString(config.params)) {
                if (!config.params) return config
            } else {
                config.url = config.url + '/' + config.params;
                config.params = {};
            }
        } else {
            if (!isString(config.params)) {
                if (!config.params) return config
                config.data = config.params
            } else {
                config.url = config.url + config.params;
            }
            config.params = {};
        }
        return config;
    },

    /**
   * @description: 请求之前的拦截器
   */
    requestInterceptors: (config: AxiosRequestConfig): AxiosRequestConfig => {
        // 请求之前处理config
        const token: string = store.state.user.token,
            language: string = store.state.langTheme.language;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (language) {
            config.headers['Local-Lan'] = language;
        }
        return config;
    },
    /**
    * @description: 请求之后的拦截器
    */
    responseInterceptors: (config) => {

        //token将过期时候，分配新的token并替换
        const token: string = config.headers['new-token'];
        if (token) {
            storage.set(ACCESS_TOKEN, token)
            store.commit('user/SetToken', token)
        }
        return config;
    },
    /**
    * @description: 请求之后的拦截器错误处理
    */
    responseInterceptorsCatch: (error: any) => {
        const { response, message } = error || {};
        const errMsg: string = response && response.data && response.data.msg ? response.data.msg : '',
            errCode: number = response && response.data && response.data.code ? response.data.code : undefined;
        const httpErr: string = error.toString();
        try {
            if (response && response.status == 401) {
                // Message.destroy()
                //登录失效
                ERROR(T('login.loginInva'));
                Logout()
                return;
            }
            if (message.indexOf('timeout') !== -1) {
                Message.destroy()
                //请求超时
                ERROR(T('login.apiTimeOut'));
                return;
            }
            if (message.indexOf('code 404') !== -1) {
                ERROR(T('login.apiNotEx'));
                return;
            }
            if (httpErr && httpErr.includes('Network Error')) {
                Modal.destroyAll()
                removeAllPending()
                Modal.confirm({
                    title: T('login.netExce'),
                    content: T('login.checkNet'),
                });
                return;
            }
        } catch (error) {
            throw new Error(error as any);
        }
        // 请求是否被取消
        const isCancel = axios.isCancel(error)
        if (!isCancel) {
            checkStatus(errCode, errMsg);
        }
        return Promise.resolve('');
    },
};
const Axios = new VAxios({
    // timeout: 15 * 1000,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 数据处理方式
    transform,
    // 配置项，(默认)
    requestOptions: {
        // 消息提示类型
        messageMode: 'none',
        // 接口地址
        apiUrl: import.meta.env.VITE_APP_API_URL as string,
    }
});
export default Axios;