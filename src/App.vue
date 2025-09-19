<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
<!-- Navbar -->
  <nav class="bg-gray-900 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
      
      <!-- Left: Logo + Title -->
      <div class="flex items-center space-x-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Delhi_Metro_logo.svg/640px-Delhi_Metro_logo.svg.png"
          alt="DMRC Logo"
          class="h-10 w-10 object-contain"
        />
        <RouterLink to="/" class="text-lg font-semibold tracking-wide hover:text-gray-300 transition">
          DMRC Portal
        </RouterLink>
      </div>

      <!-- Right: Auth Controls -->
      <div class="flex items-center">
        <template v-if="!isLoggedIn">
          <button
            @click="openLogin"
            class="px-4 py-2 text-sm rounded bg-gray-800 hover:bg-gray-700 transition"
          >
            Login
          </button>
          <button
            @click="openSignup"
            class="ml-2 px-4 py-2 text-sm rounded border border-gray-400 hover:bg-white hover:text-gray-900 transition"
          >
            Sign Up
          </button>
        </template>

        <template v-else>
          <span class="mr-4 text-sm text-gray-300">Welcome, {{ userEmail }}</span>
          
          <RouterLink
            to="/metro-home"
            class="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            Work Space
          </RouterLink>

          <button
            @click="logout"
            class="ml-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm transition"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>

    <!-- Page Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 text-center py-6">
      © {{ new Date().getFullYear() }} Delhi Metro Rail Corporation. All rights reserved.
    </footer>

    <!-- Login / Signup Modals -->
    <div v-if="showLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 class="text-lg font-semibold text-red-700 mb-4">Login</h2>
        <form @submit.prevent="login">
          <input v-model="loginEmail" type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" required />
          <input v-model="loginPassword" type="password" placeholder="Password" class="w-full mb-3 p-2 border rounded" required />
          <button type="submit" class="w-full py-2 bg-red-700 text-white rounded hover:bg-red-800">Login</button>
        </form>
        <p v-if="loginError" class="text-red-600 text-sm mt-2">{{ loginError }}</p>
        <button @click="showLogin = false" class="mt-4 text-sm text-gray-500 hover:underline">Close</button>
      </div>
    </div>

    <div v-if="showSignup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 class="text-lg font-semibold text-red-700 mb-4">Sign Up</h2>
        <form @submit.prevent="signup">
          <input v-model="signupEmail" type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" required />
          <input v-model="signupPassword" type="password" placeholder="Password" class="w-full mb-3 p-2 border rounded" required />
          <button type="submit" class="w-full py-2 bg-red-700 text-white rounded hover:bg-red-800">Sign Up</button>
        </form>
        <p v-if="signupError" class="text-red-600 text-sm mt-2">{{ signupError }}</p>
        <button @click="showSignup = false" class="mt-4 text-sm text-gray-500 hover:underline">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed  } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useAuthStore } from './stores/auth.js'  // adjust path if needed

const router = useRouter()
const auth = useAuthStore()

// Modal visibility (local state)
const showLogin = ref(false)
const showSignup = ref(false)

// Login form
const loginEmail = ref("")
const loginPassword = ref("")
const loginError = ref("")

// Signup form
const signupEmail = ref("")
const signupPassword = ref("")
const signupError = ref("")

// Modal open/close
const openLogin = () => {
  console.log('Opening login modal')
  showLogin.value = true
  showSignup.value = false
}

const openSignup = () => {
  console.log('Opening signup modal')
  showSignup.value = true
  showLogin.value = false
}

// Login method (updates Pinia store)
const login = async () => {
  console.log('Login attempt with', loginEmail.value)
  loginError.value = ""
  try {
    const res = await axios.post("http://127.0.0.1:8000/login", {
      email: loginEmail.value,
      password: loginPassword.value,
    })
    console.log('Login success response:', res.data)

    auth.login(res.data.access_token)  // <-- Use Pinia store action

    showLogin.value = false
    router.push("/metro-home")
  } catch (err) {
    console.error('Login error:', err)
    loginError.value = err.response?.data?.detail || "Login failed."
  }
}

// Signup method (same as before)
const signup = async () => {
  console.log('Signup attempt with', signupEmail.value)
  signupError.value = ""
  try {
    await axios.post("http://127.0.0.1:8000/signup", {
      email: signupEmail.value,
      password: signupPassword.value,
    })
    alert("Signup successful! Please log in.")
    showSignup.value = false
    showLogin.value = true
  } catch (err) {
    console.error('Signup error:', err)
    signupError.value = err.response?.data?.detail || "Signup failed."
  }
}

// Logout method (Pinia store)
const logout = () => {
  console.log('Logout called')
  auth.logout()
  router.push("/")
  console.log('After logout: loggedIn?', auth.isLoggedIn)
}

// Initialize auth state on mount (use Pinia's initFromStorage)
onMounted(() => {
  console.log('App mounted, initializing auth from storage')
  auth.initFromStorage()
})

// Expose reactive Pinia properties for template use
const isLoggedIn = computed(() => auth.isLoggedIn)
const userEmail = computed(() => auth.user?.email || "")


// Optional: watch for debugging
watch(() => auth.isLoggedIn, (val) => {
  console.log('Pinia isLoggedIn changed:', val)
})
watch(() => auth.token, (val) => {
  console.log('Pinia token changed:', val)
})
watch(() => auth.user, (val) => {
  console.log('Pinia user changed:', val)
})
</script>


