import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const messages = {
  en,
  zh,
};

const i18n = createI18n({
  legacy: false, // 重要：禁用 legacy 模式
  locale: 'en',
  messages,
});

export default i18n;
