<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white text-gray-900 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <RouterLink to="/" class="flex items-center">
            <img
              src="https://www.delhimetrorail.com/static/media/logo-passenger.d3afd408.svg"
              alt="Delhi Metro Rail"
              class="h-12 sm:h-14 object-contain"
            />
          </RouterLink>

          <div class="flex flex-wrap items-center justify-end gap-2 sm:gap-3 font-semibold">
            <template v-if="!isLoggedIn">
              <button
                @click="openLogin"
                class="px-4 py-2 rounded-md bg-gray-100 border hover:bg-gray-200"
              >
                Login
              </button>
              <button
                @click="openSignup"
                class="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Sign Up
              </button>
            </template>

            <template v-else>
              <span class="hidden sm:inline-block mr-2 text-gray-700">
                Welcome, {{ userEmail }}
              </span>
              <RouterLink
                to="/metro-home"
                class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Work Space
              </RouterLink>
              <button
                @click="logout"
                class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-gray-900 text-white text-sm text-center py-4">
      © {{ new Date().getFullYear() }} Delhi Metro Rail Corporation. All rights reserved.
    </footer>

    <!-- LOGIN MODAL -->
    <div v-if="showLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-full max-w-md relative">
        <button @click="showLogin=false" class="absolute top-3 right-3 text-xl">&times;</button>

        <h2 class="text-2xl font-bold mb-4">Login</h2>

        <form @submit.prevent="login" class="space-y-3">
          <input v-model="loginEmail" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
          <input v-model="loginPassword" type="password" placeholder="Password" class="w-full p-2 border rounded" required />

          <!-- LOCAL CAPTCHA -->
          <div class="border rounded p-3 bg-gray-50">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">{{ loginCaptchaQuestion }}</span>
              <button type="button" @click="generateLoginCaptcha" class="text-sm text-blue-600">
                Refresh
              </button>
            </div>
            <input
              v-model="loginCaptchaInput"
              placeholder="Enter answer"
              class="w-full p-2 border rounded"
            />
          </div>

          <button class="w-full bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </form>

        <p v-if="loginError" class="text-red-600 mt-2 text-sm">{{ loginError }}</p>
      </div>
    </div>

    <!-- SIGNUP MODAL -->
    <div v-if="showSignup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-full max-w-md relative">
        <button @click="showSignup=false" class="absolute top-3 right-3 text-xl">&times;</button>

        <h2 class="text-2xl font-bold mb-4">Sign Up</h2>

        <form @submit.prevent="signup" class="space-y-3">
          <input v-model="signupEmail" type="email" placeholder="DMRC Email" class="w-full p-2 border rounded" required />
          <input v-model="signupPassword" type="password" placeholder="Password" class="w-full p-2 border rounded" required />

          <!-- LOCAL CAPTCHA -->
          <div class="border rounded p-3 bg-gray-50">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">{{ signupCaptchaQuestion }}</span>
              <button type="button" @click="generateSignupCaptcha" class="text-sm text-blue-600">
                Refresh
              </button>
            </div>
            <input
              v-model="signupCaptchaInput"
              placeholder="Enter answer"
              class="w-full p-2 border rounded"
            />
          </div>

          <button class="w-full bg-green-600 text-white p-2 rounded">
            Sign Up
          </button>
        </form>

        <p v-if="signupError" class="text-red-600 mt-2 text-sm">{{ signupError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from './stores/auth.js'

const router = useRouter()
const auth = useAuthStore()

/* ---------- STATE ---------- */
const showLogin = ref(false)
const showSignup = ref(false)

const loginEmail = ref('')
const loginPassword = ref('')
const signupEmail = ref('')
const signupPassword = ref('')

const loginError = ref('')
const signupError = ref('')

/* ---------- LOGIN CAPTCHA ---------- */
const loginCaptchaA = ref(0)
const loginCaptchaB = ref(0)
const loginCaptchaInput = ref('')

const generateLoginCaptcha = () => {
  loginCaptchaA.value = Math.floor(Math.random() * 9) + 1
  loginCaptchaB.value = Math.floor(Math.random() * 9) + 1
  loginCaptchaInput.value = ''
}
const loginCaptchaQuestion = computed(
  () => `${loginCaptchaA.value} + ${loginCaptchaB.value} = ?`
)

/* ---------- SIGNUP CAPTCHA ---------- */
const signupCaptchaA = ref(0)
const signupCaptchaB = ref(0)
const signupCaptchaInput = ref('')

const generateSignupCaptcha = () => {
  signupCaptchaA.value = Math.floor(Math.random() * 9) + 1
  signupCaptchaB.value = Math.floor(Math.random() * 9) + 1
  signupCaptchaInput.value = ''
}
const signupCaptchaQuestion = computed(
  () => `${signupCaptchaA.value} + ${signupCaptchaB.value} = ?`
)

/* ---------- MODALS ---------- */
const openLogin = () => {
  showLogin.value = true
  showSignup.value = false
  generateLoginCaptcha()
}
const openSignup = () => {
  showSignup.value = true
  showLogin.value = false
  generateSignupCaptcha()
}

/* ---------- LOGIN ---------- */
const login = async () => {
  loginError.value = ''

  if (parseInt(loginCaptchaInput.value) !== loginCaptchaA.value + loginCaptchaB.value) {
    loginError.value = 'Invalid CAPTCHA'
    generateLoginCaptcha()
    return
  }

  try {
    const res = await axios.post('http://127.0.0.1:8000/login', {
      email: loginEmail.value,
      password: loginPassword.value
    })

    auth.login(res.data.access_token)
    showLogin.value = false
    router.push('/metro-home')
  } catch (err) {
    loginError.value = err.response?.data?.detail || 'Login failed'
  }
}

/* ---------- SIGNUP ---------- */
const signup = async () => {
  signupError.value = ''

  if (parseInt(signupCaptchaInput.value) !== signupCaptchaA.value + signupCaptchaB.value) {
    signupError.value = 'Invalid CAPTCHA'
    generateSignupCaptcha()
    return
  }

  try {
    await axios.post('http://localhost:8000/signup', {
      email: signupEmail.value,
      password: signupPassword.value
    })

    alert('Signup successful! Please login.')
    showSignup.value = false
    showLogin.value = true
  } catch (err) {
    signupError.value = err.response?.data?.detail || 'Signup failed'
  }
}

/* ---------- AUTH ---------- */
const logout = () => {
  auth.logout()
  router.push('/')
}

onMounted(() => auth.initFromStorage())

const isLoggedIn = computed(() => auth.isLoggedIn)
const userEmail = computed(() => auth.user?.email || '')
</script>
