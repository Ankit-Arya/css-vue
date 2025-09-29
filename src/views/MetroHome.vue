<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero / Welcome Section -->
    <header class="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <!-- Decorative circles -->
      <div class="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 animate-fadeInUp">
          Welcome to <span class="text-blue-700">DMRC</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-700 font-light animate-fadeInUp delay-200">
          Choose an option to continue your metro experience
        </p>
      </div>
    </header>

    <!-- Action Buttons Section -->
    <section class="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <ul class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Watch Demo -->
          <li>
            <RouterLink
              to="/demo"
              class="group flex flex-col items-center justify-center h-48 p-8 rounded-xl shadow-md border-2 border-blue-200 bg-white hover:bg-blue-50 transition transform hover:-translate-y-2 hover:shadow-lg hover:animate-pulse"
            >
              <div class="text-5xl mb-4 text-blue-600 group-hover:scale-110 transition">
                🎥
              </div>
              <h3 class="text-xl font-semibold text-gray-800 text-center">
                Watch Demo
              </h3>
            </RouterLink>
          </li>

          <!-- Enter Trip Charting -->
          <li>
            <RouterLink
              to="/select-line"
              class="group flex flex-col items-center justify-center h-48 p-8 rounded-xl shadow-md border-2 border-red-200 bg-white hover:bg-red-50 transition transform hover:-translate-y-2 hover:shadow-lg hover:animate-pulse"
            >
              <div class="text-5xl mb-4 text-red-600 group-hover:scale-110 transition">
                🚇
              </div>
              <h3 class="text-xl font-semibold text-gray-800 text-center">
                Enter Trip Charting Solution
              </h3>
            </RouterLink>
          </li>

          <!-- Download Report -->
          <li>
            <RouterLink
              to="/download-trip-chart"
              class="group flex flex-col items-center justify-center h-48 p-8 rounded-xl shadow-md border-2 border-green-200 bg-white hover:bg-green-50 transition transform hover:-translate-y-2 hover:shadow-lg hover:animate-pulse"
            >
              <div class="text-5xl mb-4 text-green-600 group-hover:scale-110 transition">
                📥
              </div>
              <h3 class="text-xl font-semibold text-gray-800 text-center">
                Download Report by Execution ID
              </h3>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- Status Check Section -->
    <section class="bg-gradient-to-r from-gray-50 via-blue-50 to-blue-100 py-16 px-6">
      <div class="max-w-3xl mx-auto text-center bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fadeInUp">
          🔍 Check Simulation Status
        </h2>

        <div class="flex flex-col sm:flex-row items-center gap-4">
          <input
            v-model="executionIdInput"
            type="text"
            placeholder="Enter Execution ID"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            @click="goToStatus"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!executionIdInput.trim()"
          >
            Check
          </button>
          <button
            @click="cancelSimulation"
            class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!executionIdInput.trim() || isCancelling"
          >
            Cancel
          </button>
        </div>

        <p v-if="errorMsg" class="mt-4 text-red-500">{{ errorMsg }}</p>
        <p v-if="successMsg" class="mt-4 text-green-600">{{ successMsg }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const executionIdInput = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const isCancelling = ref(false)

const goToStatus = () => {
  const id = executionIdInput.value.trim()
  if (!id) {
    errorMsg.value = 'Please enter a valid Execution ID.'
    return
  }
  errorMsg.value = ''
  router.push({ name: 'TripChartingStatus', params: { executionId: id } })
}

const cancelSimulation = async () => {
  const id = executionIdInput.value.trim()
  if (!id) {
    errorMsg.value = 'Please enter a valid Execution ID to cancel.'
    return
  }

  errorMsg.value = ''
  successMsg.value = ''
  isCancelling.value = true

  try {
    const res = await fetch(`http://localhost:8000/cancel/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      const errData = await res.json()
      throw new Error(errData.detail || 'Failed to cancel simulation.')
    }

    const data = await res.json()
    successMsg.value = data.message || 'Simulation cancelled successfully.'
  } catch (err) {
    console.error('❌ Cancel failed:', err)
    errorMsg.value = err.message || 'An error occurred while cancelling.'
  } finally {
    isCancelling.value = false
  }
}
</script>
