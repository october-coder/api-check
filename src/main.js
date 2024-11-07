import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ConfigProvider } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 引入 i18n
import i18n from './i18n';

const app = createApp(App);

app.use(router);
app.use(ConfigProvider);
app.use(i18n);

app.mount('#app');
