/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-01 00:10:34
 */
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv, OUTPUT_DIR } from './build/utils';
import { createProxy } from './build/vite/proxy'
import { useVitePlugins } from './build/vite/plugins'
const CWD = process.cwd()
export default ({ mode, command }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, CWD);
    const viteEnv = wrapperEnv(env);
    const { VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_PORT, VITE_PROXY } = viteEnv;
    const isProduction = command === 'build';
    return {
        root,
        base: VITE_BASE_URL,
        resolve: {
            alias: [
                {
                    find: 'vue-i18n',
                    replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
                },
                {
                    find: '@',
                    replacement: resolve(__dirname, './src')
                },
            ]
        },
        server: {
            port: VITE_PORT,
            host: true,
            proxy: createProxy(VITE_PROXY)
        },
        build: {
            target: 'es2015',
            outDir: OUTPUT_DIR,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
            brotliSize: false,
            chunkSizeWarningLimit: 1000,
        },
        plugins: useVitePlugins(viteEnv, isProduction),
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: { '@primary-color': '#18BA79' },
                    javascriptEnabled: true,
                }

            }
        },
        optimizeDeps: {
            include: [
                '@ant-design/icons-vue',
                'ant-design-vue/es/locale/zh_CN',
                'ant-design-vue/es/locale/en_US',
                'moment/dist/locale/zh-cn',
                'ant-design-vue/es/locale/en_US',
                'moment/dist/locale/eu',
            ],
            exclude: [
                'vue-demi'
            ]
        },

    }
}
