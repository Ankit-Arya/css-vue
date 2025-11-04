<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-red-700 text-white p-6">
    <div class="w-full max-w-3xl bg-black bg-opacity-70 rounded-xl shadow-2xl p-8">
      
      <h1 class="text-3xl font-extrabold text-center mb-6 text-red-400 animate-pulse">
        🛠️ Simulation Status
      </h1>

      <div class="space-y-3">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="flex items-start space-x-3 p-3 rounded-lg bg-gray-800 animate-fade-in"
        >
          <!-- Icon -->
          <div class="text-xl w-6 flex-shrink-0">
            <span v-if="step.status === 'completed'" class="text-green-400">✅</span>
            <span v-else-if="step.status === 'running' || step.status === 'WIP'" class="text-yellow-400 animate-spin">🔄</span>
            <span v-else-if="step.status === 'pending'" class="text-gray-400">⏳</span>
            <span v-else-if="step.status === 'error'" class="text-red-400">❌</span>
            <span v-else class="text-gray-500">•</span>
          </div>

          <!-- Message -->
          <div>
            <p
              :class="[step.status === 'error' ? 'text-red-300 font-medium' : 'text-gray-300', 'text-sm md:text-base']"
            >
              {{ getStatusMessage(step) }}
            </p>
          </div>
        </div>
      </div>

      <p v-if="fileError" class="mt-4 text-red-500 text-sm">❌ {{ fileError }}</p>
      <p v-if="fileDownloaded" class="mt-4 text-green-400 text-sm">✅ Trip chart downloaded successfully</p>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const executionId = ref(route.params.executionId)
const steps = ref([]) 
const fileDownloaded = ref(false)
const fileError = ref('')

let polling = null
const POLLING_INTERVAL = 2000
const FILE_DOWNLOAD_RETRIES = 10
const FILE_RETRY_DELAY = 2000

// Fetch simulation steps
const fetchStatus = async () => {
  try {
    const res = await fetch(`http://34.131.163.51:8000/status/${executionId.value}`)
    if (!res.ok) throw new Error('Bad response from server')
    const data = await res.json()
    steps.value = data.steps

    const hasError = data.steps.some(s => s.status === 'error')
    const allCompleted = data.steps.every(s => s.status === 'completed')

    if (hasError) {
      clearInterval(polling)
      polling = null
      fileError.value = 'Simulation failed. File will not be generated.'
      return
    }

    // Check if trip chart file exists
    if (allCompleted) {
      const fileAvailable = await checkFileAvailability()
      const tripChartStep = steps.value.find(s => s.name.toLowerCase().includes('trip chart'))
      if (tripChartStep) {
        tripChartStep.status = fileAvailable ? 'completed' : 'running'
      }

      if (fileAvailable) {
        clearInterval(polling)
        polling = null
        await downloadFileWithRetry()
      }
    }
  } catch (err) {
    console.error('Failed to fetch status', err)
  }
}

// Check if file is available on server
const checkFileAvailability = async () => {
  try {
    const res = await fetch(`http://34.131.163.51:8000/download/${executionId.value}`, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

// Download file with retry
const downloadFileWithRetry = async () => {
  let attempt = 0
  const tryDownload = async () => {
    try {
      const res = await fetch(`http://34.131.163.51:8000/download/${executionId.value}`)
      if (!res.ok) throw new Error('File not ready')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `trip_chart_${executionId.value}.xlsx`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)

      fileDownloaded.value = true
      console.log('✅ File downloaded successfully')
    } catch (err) {
      attempt++
      console.log(`File not ready yet (attempt ${attempt})`)
      if (attempt < FILE_DOWNLOAD_RETRIES) {
        setTimeout(tryDownload, FILE_RETRY_DELAY)
      } else {
        fileError.value = 'Failed to download file after multiple attempts.'
        console.error('Download failed:', err)
      }
    }
  }

  tryDownload()
}

// Helper for status message
const getStatusMessage = (step) => {
  switch (step.status) {
    case 'completed':
      return `${step.name} — Completed successfully`
    case 'running':
    case 'WIP':
      return `${step.name} — In progress...`
    case 'pending':
      return `${step.name} — Queued`
    case 'error':
      return `${step.name} — Failed to complete`
    default:
      return `${step.name} — Unknown status`
  }
}

onMounted(() => {
  fetchStatus()
  polling = setInterval(fetchStatus, POLLING_INTERVAL)
})

onUnmounted(() => {
  if (polling) clearInterval(polling)
})
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out both;
}
</style>
