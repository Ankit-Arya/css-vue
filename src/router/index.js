import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

import Landing from '../views/Landing.vue'
import MetroHome from '../views/MetroHome.vue'
import Demo from '../views/Demo.vue'
import TripCharting from '../views/TripCharting.vue'
import TripChartingStatus from '../views/TripChartingStatus.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/metro-home', name: 'MetroHome', component: MetroHome },
  { path: '/demo', name: 'Demo', component: Demo },
  { path: '/trip-charting', name: 'TripCharting', component: TripCharting, meta: { requiresAuth: true }},
  // { path: '/trip-charting-status', name: 'TripChartingStatus', component: TripChartingStatus, meta: { requiresAuth: true }},
  { 
    path: '/trip-charting-status/:executionId', 
    name: 'TripChartingStatus', 
    component: TripChartingStatus, 
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  console.log('Route Guard - Destination:', to.path)
  console.log('isLoggedIn:', auth.isLoggedIn)
  console.log('Token:', auth.token)

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    console.warn('Blocked: Not logged in. Redirecting to Landing.')
    next({ name: 'Landing' })
  } else {
    console.log('Access granted.')
    next()
  }
})


export default router
