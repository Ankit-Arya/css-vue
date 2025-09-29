<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
<!-- Navbar -->

<nav class="bg-white text-gray-900 border-b border-gray-200 shadow-sm">
  <div class="w-full px-6 flex justify-between items-center h-16">
    
    <!-- Left: Official DMRC Logo (acts as home button) -->
    <RouterLink to="/" class="flex items-center">
      <img
        src="https://www.delhimetrorail.com/static/media/logo-passenger.d3afd408.svg"
        alt="Delhi Metro Rail"
        class="h-12 object-contain"
      />
    </RouterLink>

    <!-- Right: Auth Controls -->
    <div class="flex items-center space-x-3 font-semibold">
      <template v-if="!isLoggedIn">
        <button
          @click="openLogin"
          class="px-4 py-2 rounded bg-gray-100 border border-gray-300 hover:bg-gray-200 transition"
        >
          Login
        </button>
        <button
          @click="openSignup"
          class="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          Sign Up
        </button>
      </template>

      <template v-else>
        <span class="mr-2 text-sm text-gray-700">Welcome, {{ userEmail }}</span>

        <RouterLink
          to="/metro-home"
          class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
        >
          Work Space
        </RouterLink>

        <button
          @click="logout"
          class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm transition"
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
    <!-- <footer class="bg-gray-800 text-gray-300 text-center py-6">
      © {{ new Date().getFullYear() }} Delhi Metro Rail Corporation. All rights reserved.
    </footer> -->

  <footer class="bg-gray-100 text-gray-700">
    <div class="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Logo + Address -->
      <div>
        <img
          src="https://www.delhimetrorail.com/static/media/logo-passenger.d3afd408.svg"
          alt="delhimetrorail"
          class="w-40 mb-4"
        />
        <div class="hidden md:block text-sm leading-relaxed">
          <h3 class="font-semibold mb-2">Get In Touch</h3>
          <p>
            Metro Bhawan Fire Brigade Lane, Barakhamba Road,<br />
            New Delhi - 110001, India<br />
            EPABX - 011-23417910/11/12
          </p>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="font-semibold mb-3">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/faq" class="hover:underline">FAQ’s</a></li>
          <li><a href="/contact-us" class="hover:underline">Help &amp; Contact</a></li>
          <li><a href="/disclaimer" class="hover:underline">Disclaimer</a></li>
          <li><a href="/privacy-policy" class="hover:underline">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Quick Contact + App Download -->
      <div>
        <h3 class="sr-only">Quick Contact</h3>
        <div class="space-y-3 text-sm">
          <div>
            DMRC Helpline no.<br />
            <strong>155370 <b>(Chargeable)</b></strong>
          </div>
          <div>
            CISF Helpline no.<br />
            <strong>155655</strong>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="sr-only">Download Apps</h3>
          <div class="flex space-x-3">
            <a href="https://play.google.com/store/apps/details?id=com.sraoss.dmrc" target="_blank">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                class="h-9"
              />
            </a>
            <a href="https://apps.apple.com/in/app/delhi-metro-rail/id691105308" target="_blank">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                class="h-9"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div>
        <h3 class="sr-only">Social Links</h3>
        <div class="flex space-x-4 justify-start lg:justify-end">
          <a href="https://www.facebook.com/officialdmrc/" target="_blank" aria-label="Facebook" class="hover:text-blue-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"/>
            </svg>
          </a>
          <a href="https://twitter.com/OfficialDMRC" target="_blank" aria-label="Twitter" class="hover:text-sky-500">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
              alt="Twitter"
              class="w-7 h-7"
            />
          </a>
          <a href="https://www.instagram.com/officialdmrc/?hl=en" target="_blank" aria-label="Instagram" class="hover:text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

  </footer>



    <!-- Login / Signup Modals -->
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
      <input
        v-model="loginEmail"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded"
        required
      />
      <input
        v-model="loginPassword"
        type="password"
        placeholder="Password"
        class="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
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
      <input
        v-model="signupEmail"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded"
        required
      />
      <input
        v-model="signupPassword"
        type="password"
        placeholder="Password"
        class="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
      >
        Sign Up
      </button>
    </form>
    <p v-if="signupError" class="text-red-600 text-sm mt-2">{{ signupError }}</p>
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


