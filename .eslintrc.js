// .eslintrc.js 内容大致如下
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/essential',
        'plugin:prettier/recommended', // 添加 prettier 插件, 注意需要放到 plugin 最后一个
        '@vue/prettier',
    ],
    // rules 里面的内容根据团队风格统一配置
    rules: {
        "vue/no-unused-components": "off",
        'vue/no-unused-vars': 'off',
        'vue/no-v-for-template-key-on-child': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/camelcase': 'off',
        "@typescript-eslint/ban-ts-ignore": "off",
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
}