<template>
  <a-config-provider :theme="theme">
    <router-view />
  </a-config-provider>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'App',
  setup() {
    const { t } = useI18n();
    const theme = ref({
      primaryColor: '#1890ff',
    });

    return {
      theme,
      t,
    };
  },
};
</script>

<style>
@import './styles/global.css';
</style>
