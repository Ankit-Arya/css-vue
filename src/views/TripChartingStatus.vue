
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
              :class="[
                'text-sm md:text-base',
                step.status === 'error' ? 'text-red-300 font-medium' : 'text-gray-300'
              ]"
            >
              {{ getStatusMessage(step) }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const executionId = ref(route.params.executionId)
const steps = ref([]) 
let polling = null

const fetchStatus = async () => {
  try {
    const res = await fetch(`http://34.131.163.51:8000/status/${executionId.value}`)
    if (!res.ok) throw new Error('Bad response from server')
    const data = await res.json()
    steps.value = data.steps

    const hasError = data.steps.some(s => s.status === 'error')
    const allCompleted = data.steps.every(s => s.status === 'completed')

    if (hasError || allCompleted) {
      clearInterval(polling)
      polling = null

      if (allCompleted) {
        downloadOutputFile()
      }
    }
  } catch (err) {
    console.error('Failed to fetch status', err)
    clearInterval(polling)
    polling = null
  }
}

const downloadOutputFile = async () => {
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
  } catch (err) {
    console.error('Download failed:', err)
  }
}

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
  console.log('Route params:', route.params)
  fetchStatus()
  polling = setInterval(fetchStatus, 2000)
})

onUnmounted(() => {
  if (polling) clearInterval(polling)
})
</script>

<!-- Fade-in animation (can be added to Tailwind config too) -->
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
