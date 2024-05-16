import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../src/components/HelloWorld.vue'
// import listVocab from '../src/components/listVocab.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HelloWorld,
    },
    {
      path: '/liste',
      component: () => import('./components/listVocab.vue'),
    },
    {
      path: '/addVocab',
      component: () => import('./components/addVocab.vue'),
    },
    {
        path: '/jeuvocab',
        component: () => import('./components/jeuRapidite.vue'),
    },
  ],
})
