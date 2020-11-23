import Vue from 'vue'
import Router from 'vue-router'
import LayoutComponent from '@/components/LayoutComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LayoutComponent',
      component: LayoutComponent
    }
  ]
})
