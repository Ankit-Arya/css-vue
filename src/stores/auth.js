import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    token: null,
  }),

  actions: {
    initFromStorage() {
      const token = localStorage.getItem('token')
      // console.log('🔁 initFromStorage called, token:', token)

      if (token) {
        try {
          const decoded = jwtDecode(token)

          const isExpired = decoded.exp * 1000 < Date.now()
          if (isExpired) {
            console.warn('⚠️ Token is expired.')
            this.logout()
            return
          }

          this.token = token
          this.user = {
            email: decoded.sub  // sub contains email as per your FastAPI token
          }
          this.isLoggedIn = true
          console.log('✅ Token valid. User:', this.user)

        } catch (e) {
          console.error('❌ Invalid token during init:', e)
          this.logout()
        }
      } else {
        console.log('ℹ️ No token found in localStorage.')
        this.logout()
      }
    },

    login(token) {
      // console.log('➡️ login() called with token:', token)

      try {
        const decoded = jwtDecode(token)

        const isExpired = decoded.exp * 1000 < Date.now()
        if (isExpired) {
          console.warn('⚠️ Token is expired on login.')
          this.logout()
          return
        }

        this.token = token
        this.user = {
          email: decoded.sub  // sub contains email as per your FastAPI token
        }
        this.isLoggedIn = true
        localStorage.setItem('token', token)
        console.log('✅ Login successful. User:', this.user)

      } catch (e) {
        console.error('❌ Invalid token on login:', e)
        this.logout()
      }
    },

    logout() {
      console.log('👋 logout() called.')
      this.token = null
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
    }
  }
})
