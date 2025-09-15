<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-red-700 text-white shadow">
      <div class="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <h1 class="text-xl font-bold">DMRC Portal</h1>
        <div>
          <template v-if="!isLoggedIn">
            <button @click="openLogin" class="px-4 py-2 rounded hover:bg-red-800">Login</button>
            <button @click="openSignup" class="ml-2 px-4 py-2 rounded border border-white hover:bg-white hover:text-red-700">Sign Up</button>
          </template>
          <template v-else>
            <span class="mr-4">Welcome, {{ userEmail }}</span>
            <button @click="logout" class="px-4 py-2 rounded bg-white text-red-700 hover:bg-gray-200">Logout</button>
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
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

const router = useRouter()

const isLoggedIn = ref(false)
const userEmail = ref("")
const token = ref("")

// modal visibility
const showLogin = ref(false)
const showSignup = ref(false)

// login form
const loginEmail = ref("")
const loginPassword = ref("")
const loginError = ref("")

// signup form
const signupEmail = ref("")
const signupPassword = ref("")
const signupError = ref("")

const openLogin = () => { showLogin.value = true; showSignup.value = false }
const openSignup = () => { showSignup.value = true; showLogin.value = false }

const login = async () => {
  loginError.value = ""
  try {
    const res = await axios.post("http://127.0.0.1:8000/login", {
      email: loginEmail.value,
      password: loginPassword.value,
    })
    token.value = res.data.access_token
    userEmail.value = loginEmail.value
    isLoggedIn.value = true
    localStorage.setItem("token", token.value)
    localStorage.setItem("userEmail", userEmail.value)
    showLogin.value = false
    router.push("/metro-home")
  } catch (err) {
    loginError.value = err.response?.data?.detail || "Login failed."
  }
}

const signup = async () => {
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
    signupError.value = err.response?.data?.detail || "Signup failed."
  }
}

const logout = () => {
  isLoggedIn.value = false
  token.value = ""
  userEmail.value = ""
  localStorage.removeItem("token")
  localStorage.removeItem("userEmail")
  router.push("/")
}

onMounted(() => {
  const savedToken = localStorage.getItem("token")
  const savedEmail = localStorage.getItem("userEmail")
  if (savedToken && savedEmail) {
    token.value = savedToken
    userEmail.value = savedEmail
    isLoggedIn.value = true
  }
})
</script>
