// import { createRouter, createWebHistory } from 'vue-router';
// import MetroHome from '../views/MetroHome.vue';
// import App from '../App.vue';

// const routes = [
//   { path: '/', component: App },
//   { path: '/metro-home', component: MetroHome }
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import MetroHome from '../views/MetroHome.vue'
import Demo from '../views/Demo.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/metro-home', name: 'MetroHome', component: MetroHome },
  { path: '/demo', name: 'Demo', component: Demo },
  { path: '/trip-charting', name: 'TripCharting', component: TripCharting },
  { path: '/trip-charting-status', name: 'TripChartingStatus', component: TripChartingStatus },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
