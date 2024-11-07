<!-- src/components/ApiResults.vue -->
<template>
  <div>
    <!-- 这里显示API测试的结果 -->
    <a-table :columns="columns" :dataSource="data" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  // 添加其他列
];

const data = ref([
  // 示例数据
  {
    key: '1',
    model: 'text-davinci-003',
    status: 'Available',
  },
]);
</script>
<style scoped>
.results-container {
  max-width: 800px; /* 或者您想要的宽度 */
  margin: 0 auto;
}
</style>
