<template>
  <a-select v-model="locale" @change="changeLanguage" style="width: 120px;">
    <a-select-option value="en">English</a-select-option>
    <a-select-option value="zh">中文</a-select-option>
  </a-select>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'LanguageToggle',
  setup() {
    const { locale } = useI18n();
    const changeLanguage = (value) => {
      locale.value = value;
    };

    return {
      locale,
      changeLanguage
    };
  }
};
</script>
