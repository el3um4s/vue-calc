import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/CalcStandardView').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/simple',
      name: 'simple',
      component: require('@/components/CalcStandardView').default
    },
    {
      path: '/advanced',
      name: 'advanced',
      component: require('@/components/CalcAdvancedView').default
    },
    {
      path: '/date',
      name: 'date',
      component: require('@/components/CalcDateView').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/SettingsView').default
    }
  ]
})
