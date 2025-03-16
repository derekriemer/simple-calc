import { createRouter, createWebHistory } from 'vue-router'
import MainCalculator from '../views/MainCalculator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainCalculator,
      meta: { title: 'Scientific Calculator' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'Default Title';
  next();
});

export default router
