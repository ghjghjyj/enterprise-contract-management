import { createRouter, createWebHistory } from 'vue-router'
import EnterpriseListView from '@/views/EnterpriseListView.vue'
import EnterpriseFormView from '@/views/EnterpriseFormView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/enterprise' },
    { path: '/enterprise', name: 'enterprise', component: EnterpriseListView },
    { path: '/enterprise/form', name: 'enterprise-form', component: EnterpriseFormView }
  ]
})

export default router
