<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-slate-800 to-gray-700 text-white">
    <div class="max-w-lg w-full text-center p-8 rounded-xl shadow-2xl bg-white bg-opacity-10 backdrop-blur-sm border border-gray-600">
      <!-- Title -->
      <h1 class="text-4xl font-extrabold mb-6 tracking-wide text-red-500">
        Welcome to DMRC
      </h1>
      <p class="mb-10 text-lg text-gray-200">
        Choose an option to continue your metro experience
      </p>

      <!-- Buttons -->
      <div class="grid gap-5">
        <RouterLink 
          to="/demo" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300"
        >
          🎥 Watch Demo
        </RouterLink>

        <!-- <RouterLink 
          to="/trip-charting" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300"
        >
          🚇 Enter Trip Charting Solution
        </RouterLink> -->
        <RouterLink 
          to="/select-line" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300"
        >
          🚇 Enter Trip Charting Solution
        </RouterLink>
        <RouterLink 
          to="/download-trip-chart" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition duration-300"
        >
          📥 Download Report by Execution ID
        </RouterLink>
      </div>
    
       <!-- Execution ID Input for Status Check -->
      <div class="border-t border-gray-500 pt-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-300">🔍 Check Simulation Status</h2>
        
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <input
            v-model="executionIdInput"
            type="text"
            placeholder="Enter Execution ID"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            @click="goToStatus"
            class="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!executionIdInput.trim()"
          >
            Check
          </button>

          <button
            @click="cancelSimulation"
            class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!executionIdInput.trim() || isCancelling"
          >
            Cancel
          </button>
        </div>

        <p v-if="errorMsg" class="mt-3 text-red-400 text-sm">{{ errorMsg }}</p>
      </div>
    </div>
    <!-- </div> -->
  </section>
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

  // Clear error and navigate
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
