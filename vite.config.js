import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
          resolveIcons: true,
        }),
      ],
    }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "~ant-design-vue/lib/style/themes/dark.less";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    // 添加 build 配置
    rollupOptions: {
      output: {
        // 手动拆分 chunk
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('ant-design-vue')) {
              return 'ant-design-vue';
            }
            if (id.includes('lodash')) {
              return 'lodash';
            }
            // 添加更多需要单独拆分的库
            return 'vendor';
          }
        },
      },
    },
  },
});
