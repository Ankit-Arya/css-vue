<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white text-gray-900 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Left: Logo -->
          <RouterLink to="/" class="flex items-center">
            <img
              src="https://www.delhimetrorail.com/static/media/logo-passenger.d3afd408.svg"
              alt="Delhi Metro Rail"
              class="h-12 sm:h-14 object-contain"
            />
          </RouterLink>

          <!-- Right: Buttons -->
          <div class="flex flex-wrap items-center justify-end gap-2 sm:gap-3 font-semibold">
            <template v-if="!isLoggedIn">
              <button
                @click="openLogin"
                class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-md bg-gray-100 border border-gray-300 text-base hover:bg-gray-200 hover:shadow-sm transition"
              >
                Login
              </button>
              <button
                @click="openSignup"
                class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-sm transition"
              >
                Sign Up
              </button>
            </template>

            <template v-else>
              <span class="hidden sm:inline-block mr-1 text-base text-gray-700">
                Welcome, {{ userEmail }}
              </span>
              <RouterLink
                to="/metro-home"
                class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 hover:shadow-sm text-base transition"
              >
                Work Space
              </RouterLink>
              <button
                @click="logout"
                class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-md bg-red-600 text-white hover:bg-red-700 hover:shadow-sm text-base transition"
              >
                Logout
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white text-sm border-t border-gray-700">
      <div class="text-center text-sm py-4">
        &copy; {{ new Date().getFullYear() }} Delhi Metro Rail Corporation. All rights reserved.
      </div>
    </footer>

    <!-- Login Modal -->
    <div
      v-if="showLogin"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative z-50">
        <button
          @click="showLogin = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >&times;</button>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Login</h2>
        <form @submit.prevent="login" class="space-y-3">
          <input v-model="loginEmail" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
          <input v-model="loginPassword" type="password" placeholder="Password" class="w-full p-2 border rounded" required />

          <!-- reCAPTCHA -->
          <div class="g-recaptcha" :data-sitekey="siteKey" data-callback="onLoginCaptchaVerified"></div>

          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p v-if="loginError" class="text-red-600 text-sm mt-2">{{ loginError }}</p>
      </div>
    </div>

    <!-- Signup Modal -->
    <div
      v-if="showSignup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative z-50">
        <button
          @click="showSignup = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >&times;</button>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
        <form @submit.prevent="signup" class="space-y-3">
          <input v-model="signupEmail" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
          <input v-model="signupPassword" type="password" placeholder="Password" class="w-full p-2 border rounded" required />

          <!-- reCAPTCHA -->
          <div class="g-recaptcha" :data-sitekey="siteKey" data-callback="onSignupCaptchaVerified"></div>

          <button type="submit" class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>
        <p v-if="signupError" class="text-red-600 text-sm mt-2">{{ signupError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick  } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from './stores/auth.js'

const router = useRouter()
const auth = useAuthStore()

// Site Key (replace with yours)
const siteKey = '6LdGs_crAAAAAC9dPDaOMwlpCE2MMBJDrj_eN_LG'

// State
const showLogin = ref(false)
const showSignup = ref(false)
const loginEmail = ref('')
const loginPassword = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const loginError = ref('')
const signupError = ref('')
const loginCaptchaToken = ref('')
const signupCaptchaToken = ref('')

// Google callback functions must be global
window.onLoginCaptchaVerified = (token) => {
  console.log('✅ Login reCAPTCHA verified:', token)
  loginCaptchaToken.value = token
}
window.onSignupCaptchaVerified = (token) => {
  console.log('✅ Signup reCAPTCHA verified:', token)
  signupCaptchaToken.value = token
}

// Modal toggles
const openLogin = () => {
  showLogin.value = true
  showSignup.value = false
  nextTick(() => grecaptcha.render(document.querySelector('.g-recaptcha')))
}
const openSignup = () => {
  showSignup.value = true
  showLogin.value = false
  nextTick(() => grecaptcha.render(document.querySelector('.g-recaptcha')))
}

// Login
const login = async () => {
  loginError.value = ''
  if (!loginCaptchaToken.value) {
    loginError.value = 'Please complete the reCAPTCHA.'
    return
  }
  try {
    // const res = await axios.post('http://127.0.0.1:8000/login', {
    const res = await axios.post('http://34.131.163.51:8000/login', {

      email: loginEmail.value,
      password: loginPassword.value,
      captcha: loginCaptchaToken.value,
    })
    auth.login(res.data.access_token)
    showLogin.value = false
    router.push('/metro-home')
  } catch (err) {
    loginError.value = err.response?.data?.detail || 'Login failed.'
  }
}

// Signup
const signup = async () => {
  signupError.value = ''
  if (!signupCaptchaToken.value) {
    signupError.value = 'Please complete the reCAPTCHA.'
    return
  }
  try {
    await axios.post('http://34.131.163.51/signup', {
      email: signupEmail.value,
      password: signupPassword.value,
      captcha: signupCaptchaToken.value,
    })
    alert('Signup successful! Please log in.')
    showSignup.value = false
    showLogin.value = true
  } catch (err) {
    signupError.value = err.response?.data?.detail || 'Signup failed.'
  }
}

// Logout
const logout = () => {
  auth.logout()
  router.push('/')
}

// Auth state
onMounted(() => {
  auth.initFromStorage()
})

const isLoggedIn = computed(() => auth.isLoggedIn)
const userEmail = computed(() => auth.user?.email || '')

watch(() => auth.isLoggedIn, (v) => console.log('Auth changed:', v))
</script>
