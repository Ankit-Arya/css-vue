<!-- <template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-red-700 text-white p-6">
    <div class="w-full max-w-3xl bg-black bg-opacity-70 rounded-xl shadow-2xl p-8">

      <h1 class="text-3xl font-extrabold text-center mb-6 text-red-400 animate-pulse">
        🛠️ Simulation Status
      </h1>

      <div class="space-y-2">
        <div v-for="(step, idx) in steps" :key="idx" class="flex items-center space-x-2 p-2 rounded bg-gray-800">
          <span v-if="step.status==='completed'" class="text-green-400">✔</span>
          <span v-else-if="step.status==='running'" class="text-yellow-400 animate-spin">⏳</span>
          <span v-else-if="step.status==='WIP'" class="text-yellow-400 animate-spin">⏳</span>
          <span v-else class="text-gray-500">•</span>
          <span :class="step.status==='error' ? 'text-red-400' : 'text-gray-300'">
            {{ step.name }} {{ step.message ? `- ${step.message}` : '' }}
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// ✅ executionId comes from /status/:executionId in router config
const executionId = ref(route.params.executionId)

const steps = ref([])
let polling = null

const fetchStatus = async () => {
  try {
    // ✅ use executionId.value
    const res = await fetch(`http://localhost:8000/status/${executionId.value}`)
    if (!res.ok) throw new Error('Bad response from server')
    const data = await res.json()
    steps.value = data.steps

    // Stop polling if finished or error
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
    const res = await fetch(`http://localhost:8000/download/${executionId.value}`)
    if (!res.ok) throw new Error('File not ready')
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `trip_chart_${executionId.value}.xlsx` // or .xlsx depending on backend
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Download failed:', err)
  }
}

onMounted(() => {
  console.log('Route params:', route.params) // ✅ Debug
  fetchStatus()
  polling = setInterval(fetchStatus, 2000)
})

onUnmounted(() => {
  if (polling) clearInterval(polling)
})

</script>

<style>
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
</style>
 -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header Section -->
    <header class="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div class="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-red-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-5xl font-extrabold mb-4 text-gray-900 animate-fadeInUp">
          🛠️ Simulation Status
        </h1>
        <p class="text-lg text-gray-800 animate-fadeInUp delay-150">
          Real-time status of your Trip Chart Simulation
        </p>
      </div>
    </header>

    <!-- Status Timeline Section -->
    <section class="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 px-6">
      <div class="max-w-4xl mx-auto space-y-6">

        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="flex items-start space-x-4 p-5 rounded-lg bg-white border border-blue-200 shadow-sm transition animate-fadeInUp"
        >
          <!-- Icon Column -->
          <div class="text-2xl flex-shrink-0 mt-1">
            <span v-if="step.status === 'completed'" class="text-green-600">✅</span>
            <span v-else-if="step.status === 'running' || step.status === 'WIP'" class="text-yellow-500 animate-spin-slow">🔄</span>
            <span v-else-if="step.status === 'pending'" class="text-gray-500">⏳</span>
            <span v-else-if="step.status === 'error'" class="text-red-500">❌</span>
            <span v-else class="text-gray-400">•</span>
          </div>

          <!-- Message Column -->
          <div>
            <p
              :class="[
                'text-base',
                step.status === 'error' ? 'text-red-600 font-semibold' : 'text-gray-800'
              ]"
            >
              {{ getStatusMessage(step) }}
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>
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
    const res = await fetch(`http://localhost:8000/status/${executionId.value}`)
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
    const res = await fetch(`http://localhost:8000/download/${executionId.value}`)
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
    case 'cancelled':
      return `${step.name} — Aborted by user`
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
