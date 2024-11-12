import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../views/Layout.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
