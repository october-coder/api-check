// vite.config.js
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [vue(),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        }),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },

});
