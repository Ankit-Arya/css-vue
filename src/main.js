import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css';
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
// Important: initialize auth on app start
// const auth = useAuthStore()
// auth.initFromStorage()

app.use(router)


// // Important: initialize auth on app start
const auth = useAuthStore()
auth.initFromStorage()

window.addEventListener('storage', (event) => {
  if (event.key === 'token' && event.newValue === null) {
    console.log('Storage event detected. Signout is done in another tab. Logging out in this tab.')
    auth.logout()
    router.push({ name: 'Landing' })
  }
});

app.mount('#app')