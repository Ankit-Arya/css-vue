<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-red-700 text-white p-6">
    <div class="w-full max-w-3xl bg-black bg-opacity-70 rounded-xl shadow-2xl p-8">

      <h1 class="text-3xl font-extrabold text-center mb-6 text-red-400 animate-pulse">
        🛠️ Simulation Status
      </h1>

      <div class="space-y-2">
        <div v-for="(step, idx) in steps" :key="idx" class="flex items-center space-x-2 p-2 rounded bg-gray-800">
          <span v-if="step.status==='completed'" class="text-green-400">✔</span>
          <span v-else-if="step.status==='running'" class="text-yellow-400 animate-spin">⏳</span>
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
// import { ref, onMounted } from 'vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()
// const executionId = route.params.executionId
// const steps = ref([])

// const fetchStatus = async () => {
//   try {
//     const res = await fetch(`http://localhost:8000/status/${executionId}`)
//     const data = await res.json()
//     steps.value = data.steps
//   } catch(err) {
//     console.error('Failed to fetch status', err)
//   }
// }

// onMounted(() => {
//   fetchStatus()
//   setInterval(fetchStatus, 2000) // poll every 2s
// })


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
    a.download = `trip_chart_${executionId.value}.csv` // or .xlsx depending on backend
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

