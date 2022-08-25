import MainAW from '../pages/main-aw/index'
import Progress from '../pages/progress/index'
import Gallery from '../pages/gallery/index'
//import Operating from '../pages/operating/index'
import Documents from '../pages/documents/index'
import Location from '../pages/location/index'
import Apartments from '../pages/apartments/index'

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/operating_shedule',
    //   name: 'operating_shedule',
    //   component: Operating
    // },
    {
      path: '/',
      name: 'MainAW',
      component: MainAW
    },
    {
      path: '/progress',
      name: 'Progress',
      component: Progress
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery
    },
    {
      path: '/documents',
      name: 'Documents',
      component: Documents
    },
    {
      path: '/location',
      name: 'Location',
      component: Location
    },
    {
      path: '/apartments',
      name: 'Apartments',
      component: Apartments
    },
  ]
})
