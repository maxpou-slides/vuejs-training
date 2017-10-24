import Vue from 'vue'
import Router from 'vue-router'
import HostelList from '@/components/HostelList'
import HostelMap from '@/components/HostelMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'
    }, {
      path: '/list',
      name: 'List',
      component: HostelList
    }, {
      path: '/map',
      name: 'Map',
      component: HostelMap
    }
  ]
})
