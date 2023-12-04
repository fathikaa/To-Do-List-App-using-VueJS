import { createWebHistory, createRouter } from "vue-router";
import Add from '../views/Add.vue'
import Tasks from '../views/Tasks.vue'
import Daily from '../views/Daily.vue'
import Important from '../views/Important.vue'
import Planned from '../views/Planned.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/add',
      name: 'addTodo',
      component: Add
    },
    {
      path: '/Tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/Daily',
      name: 'Daily',
      component: Daily
    },
    {
      path: '/Important',
      name: 'Important',
      component: Important
    },
    {
      path: '/Planned',
      name: 'Planned',
      component: Planned
    },
    {
      // Lazy Loaded
      path: '/update/:id',
      name: 'update',
      component: () => import('../views/Edit.vue')
    }
  ]
});

export default router;