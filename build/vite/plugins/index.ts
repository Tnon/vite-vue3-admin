/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-27 15:40:36
 * @LastEditTime: 2021-09-29 18:20:57
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configSvgIconsPlugin } from './svgSprite';

import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
// import { ThemePlugin } from './theme'
export function useVitePlugins(viteEnv: ViteEnv, isProduction: boolean) {
    const {
        VITE_USE_IMAGEMIN,
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DEL_SOURCE_FILE,
    } = viteEnv;

    const vitePlugins: (Plugin | Plugin[])[] = [
        // have to
        vue(),
        // have to
        vueJsx(),
    ];


    // vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(isProduction));


    // vite-plugin-style-import
    vitePlugins.push(configStyleImportPlugin(isProduction));

    // vite-plugin-style-import
    // vitePlugins.push(ThemePlugin());

    //vite-plugin-imagemin 一直不成功
    // isProduction && VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    isProduction && vitePlugins.push(
        configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DEL_SOURCE_FILE),
    );


    return vitePlugins;
}
