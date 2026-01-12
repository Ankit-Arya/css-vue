<template>
            <div class="min-h-screen flex bg-zinc-50">
    <!-- Sidebar -->
    <aside class="w-72 bg-blue-800 text-slate-200 flex flex-col">
      <!-- Brand -->
      <div class="px-6 py-5 border-b border-slate-800">
        <h1 class="text-xl font-semibold text-white">
          CSS Dashboard
        </h1>

      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6">


        <ul class="space-y-1">
          <!-- Execution Control -->
          <RouterLink
            to="/execution-control"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Trip Chart Status/Control
          </RouterLink>

          <!-- Past Executions -->
          <RouterLink
            to="/live-notice-board"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Trip Chart/Time Table Archive
          </RouterLink>



          <!-- Download -->
          <RouterLink
            to="/download-trip-chart"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Download Trip Chart
          </RouterLink>

          <!-- Demo -->
          <RouterLink
            to="/demo"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Watch Demo
          </RouterLink>
        </ul>
      </nav>


    </aside>

        <!-- Main Content -->
  <main class="flex-1 p-10 bg-slate-300 border border-gray-900">
  <div class="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md border border-gray-200">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Download Trip Chart</h2>

    <div class="mb-4">
      <label for="executionId" class="block text-sm font-medium text-gray-700 mb-1">Trip Chart Execution ID</label>
      <input
        id="executionId"
        v-model="executionId"
        type="text"
        placeholder="Enter Trip Chart execution ID (To be copied from Trip Chart/Time Table Archive)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="flex items-center space-x-3">
      <button
        @click="downloadFile"
        :disabled="loading || !executionId"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Downloading...' : 'Download' }}
      </button>

      <button
        v-if="error"
        @click="downloadFile"
        class="text-sm text-red-600 hover:underline"
      >
        Retry
      </button>
    </div>

    <p v-if="success" class="mt-4 text-green-600 text-sm">
      ✅ File downloaded successfully.
    </p>

    <p v-if="error" class="mt-4 text-red-600 text-sm">
      ❌ {{ error }}
    </p>
  </div>
  </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const executionId = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const downloadFile = async () => {
  if (!executionId.value) return

  loading.value = true
  error.value = ''
  success.value = false
  console.log('executionId--',executionId)
  console.log('executionId.value--',executionId.value)
  const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8000`
  
  try {
    const response = await fetch(`${API_BASE_URL}/download/${executionId.value}`)
    if (!response.ok) {
      const data = await response.json()
      error.value = data?.error || 'Unknown error'
      loading.value = false
      return
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `trip_chart_${executionId.value}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    success.value = true
  } catch (e) {
    error.value = 'Failed to download file. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
