<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center
           bg-gradient-to-r from-blue-300 via-gray-300 to-red-300
           p-6"
  >
    <div
      class="relative w-full max-w-3xl
             bg-indigo-400 bg-opacity-70
             rounded-xl shadow-2xl p-8"
    >
      <!-- Header -->
      <h1 class="text-3xl font-extrabold text-center mb-6 text-black">
        🛠️ Real-Time Trip Chart Execution Status
      </h1>

      <!-- Status List -->
      <div class="space-y-3 max-h-[420px] overflow-y-auto pr-2">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="flex items-start gap-3 p-3
                 rounded-lg bg-white text-gray-900
                 animate-fade-in"
        >
          <div class="text-xl w-6 flex-shrink-0 font-bold">
            <span v-if="step.status === 'completed'" class="text-green-500 font-bold">✅</span>
            <span
              v-else-if="step.status === 'running' || step.status === 'WIP'"
              class="text-yellow-500 animate-spin font-bold"
            >🔄</span>
            <span v-else-if="step.status === 'pending'" class="text-gray-400 font-bold">⏳</span>
            <span v-else-if="step.status === 'error'" class="text-red-500">❌</span>
            <span v-else class="text-gray-500 font-bold">•</span>
          </div>

        <p
          :class="[
            'transition-all',
            step.status === 'completed' && 'text-green-700 font-bold text-lg',
            (step.status === 'running' || step.status === 'WIP') && 'text-yellow-700 font-bold text-base ',
            step.status === 'pending' && 'text-gray-600 italic text-sm',
            step.status === 'error' && 'text-red-800 font-extrabold text-lg'
          ]"
        >
          {{ getStatusMessage(step) }}
        </p>

        </div>
      </div>

      <!-- File Feedback -->
      <p v-if="fileError" class="mt-4 text-red-600 text-sm text-center">
        ❌ {{ fileError }}
      </p>
      <p v-if="fileDownloaded" class="mt-4 text-green-700 text-sm text-center">
        ✅ Trip chart downloaded successfully
      </p>

      <!-- Divider -->
      <div class="my-6 border-t border-gray-500"></div>

      <!-- Execution Control -->
      <div class="text-center">
        <p class="text-sm text-gray-900 mb-3">
          Execution ID:
          <span class="font-semibold">{{ executionId }}</span>
        </p>

        <button v-if="!steps.some(step => step.name === 'STAGE 4 Complete' && step.status === 'completed')"
          @click="showConfirmModal = true"
          :disabled="isCancelling || isExecutionCompleted"
          class="inline-flex items-center gap-2
                 px-6 py-2.5 rounded-lg
                 bg-red-600 hover:bg-red-700
                 text-white font-semibold
                 transition disabled:opacity-50"
        >
          ⛔ Abort Execution
        </button>

        <p v-if="isExecutionCompleted" class="text-xs text-gray-800 mt-2">
          Execution already completed — abort disabled
        </p>

        <p v-if="errorMsg" class="mt-3 text-red-700 text-sm">
          ❌ {{ errorMsg }}
        </p>
        <p v-if="successMsg" class="mt-3 text-green-700 text-sm">
          ✅ {{ successMsg }}
        </p>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      @click.self="showConfirmModal = false"
      class="fixed inset-0 bg-black bg-opacity-50
            backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg
              max-w-md w-full p-6
              border border-red-300 text-center"
      >
        <h2 class="text-xl font-semibold text-red-600 mb-4">
          Abort Execution?
        </h2>

        <p class="text-gray-700 mb-6">
          This will permanently stop execution
          <strong>{{ executionId }}</strong>.
          Are you sure?
        </p>

        <div class="flex justify-center gap-4">
          <button
            @click="confirmAbort"
            class="px-4 py-2 bg-red-600 hover:bg-red-700
                  text-white rounded-md"
          >
            Yes, Abort
          </button>

          <button
            @click="showConfirmModal = false"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400
                  text-gray-800 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

/* ---------------- Route ---------------- */
const route = useRoute()
const executionId = ref(route.params.executionId)

/* ---------------- State ---------------- */
const steps = ref([])
const fileDownloaded = ref(false)
const fileError = ref('')

const isAborting = ref(false)
const abortSuccess = ref('')
const abortError = ref('')
const showAbortConfirm = ref(false)
const showConfirmModal = ref(false)

const POLLING_INTERVAL = 2000

let statusPolling = null
let filePolling = null
const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8000`
/* ---------------- Status Polling ---------------- */
const fetchStatus = async () => {
  if (isAborting.value) return

  try {
    const res = await fetch(`${API_BASE_URL}/status/${executionId.value}`)
    if (!res.ok) throw new Error('Failed to fetch status')

    const data = await res.json()
    steps.value = data.steps

    const hasError = data.steps.some(s => s.status === 'error')
    if (hasError) {
      stopPolling()
      fileError.value = 'Simulation failed. Files may not be generated.'
    }
  } catch (err) {
    console.error('Status polling error:', err)
  }
}

/* ---------------- File Availability ---------------- */
const checkFileAvailability = async () => {
  const baseUrl = `${API_BASE_URL}/download/`
  const possibleFiles = [
    `trip_chart_${executionId.value}.xlsx`,
    `duty_trip_break_summary_${executionId.value}.xlsx`,
    `log_${executionId.value}.txt`
  ]

  const availableFiles = []

  for (const fileName of possibleFiles) {
    try {
      const res = await fetch(`${baseUrl}${fileName}`, { method: 'HEAD' })
      if (res.ok) availableFiles.push(fileName)
    } catch (err) {
      console.warn(`⚠️ Could not check ${fileName}:`, err)
    }
  }

  return availableFiles
}

/* ---------------- File Download ---------------- */
const downloadFile = async (fileName) => {
  try {
    const res = await fetch(`${API_BASE_URL}/download/${fileName}`)
    if (!res.ok) throw new Error('File not ready')

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download failed:', err)
  }
}

const downloadAllFiles = async (fileNames) => {
  for (const fileName of fileNames) {
    await downloadFile(fileName)
  }
}

/* ---------------- File Polling ---------------- */
const pollFile = async () => {
  if (isAborting.value) return

  try {
    const availableFiles = await checkFileAvailability()

    if (availableFiles.length > 0) {
      await downloadAllFiles(availableFiles)
      fileDownloaded.value = true
      stopPolling()
    }
  } catch (err) {
    console.error('File polling error:', err)
  }
}

/* ---------------- Abort Execution ---------------- */
const abortExecution = async () => {
  
  isAborting.value = true;
  abortError.value = '';
  abortSuccess.value = '';

  try {
    const res = await fetch(
      `${API_BASE_URL}/cancel/${executionId.value}`,
      { method: 'DELETE' }
    )

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.detail || 'Abort failed')
    }

    const data = await res.json()
    abortSuccess.value = data.message || 'Execution aborted successfully.'

    stopPolling()
  } catch (err) {
    abortError.value = err.message || 'Abort failed.'
    isAborting.value = false
  }
}

const confirmAbort = async () => {
  showConfirmModal.value = false
  // showAbortConfirm.value = false
  await abortExecution()
  window.location.reload();


}

/* ---------------- Helpers ---------------- */
const stopPolling = () => {
  if (statusPolling) {
    clearInterval(statusPolling)
    statusPolling = null
  }
  if (filePolling) {
    clearInterval(filePolling)
    filePolling = null
  }
}

const isExecutionCompleted = computed(() =>
  steps.value.length > 0 &&
  steps.value.every(step => step.status === 'completed')
)

const getStatusMessage = (step) => {
  switch (step.status) {
    case 'completed': return `${step.name} — Completed successfully`
    case 'running':
    case 'WIP': return `${step.name} — In progress...`
    case 'pending': return `${step.name} — Queued`
    case 'error': return `${step.name} — Failed to complete`
    default: return `${step.name} — Unknown status`
  }
}

/* ---------------- Lifecycle ---------------- */
onMounted(() => {
  statusPolling = setInterval(fetchStatus, POLLING_INTERVAL)
  filePolling = setInterval(pollFile, POLLING_INTERVAL)
  fetchStatus()
  pollFile()
})

onUnmounted(() => {
  stopPolling()
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


