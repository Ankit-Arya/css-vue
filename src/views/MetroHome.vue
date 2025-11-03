<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero / Welcome Section -->
    <header class="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div class="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 animate-fadeInUp">
          Welcome to <span class="text-blue-700">DMRC</span>
        </h1>
        <p class="text-2xl md:text-2xl text-gray-700 font-light animate-fadeInUp delay-200">
          Choose an option to continue your metro experience
        </p>
      </div>
    </header>

    <!-- Action Buttons Section -->

<section class="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-12 px-4">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- LEFT: Notice Board - Full Height -->
    <div class="order-3 lg:order-1 bg-white flex flex-col border border-gray-200 rounded-xl shadow-md p-6 h-full max-h-[40rem] overflow-y-auto">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">📢 Live Notice Board</h2>
      <ul class="space-y-4">
        <li
          v-for="notice in liveNotices"
          :key="notice.id"
          class="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 rounded"
        >
          <p class="text-sm text-gray-800">
            <strong>ID:</strong> {{ notice.executionId }}<br />
            <strong>By:</strong> {{ notice.initiatedBy }}<br />
            <strong>At:</strong> {{ formatTime(notice.timestamp) }}<br/>
            <button
                  @click="downloadFile(notice.file_id)"
                  class="ml-4 px-3 py-1 bg-green-300 text-black rounded hover:bg-green-600 text-sm"
                >
                  Download Time Table File 
                </button>
          </p>
        </li>
      </ul>
    </div>

    <!-- MIDDLE: Main Trip Charting Section (was RIGHT) -->
    <div class="order-2 lg:order-2 flex flex-col items-center justify-center h-full">
      <RouterLink
        to="/select-line"
        class="group w-full h-60 p-8 rounded-2xl border-2 border-blue-400 bg-blue-100 shadow-xl hover:shadow-2xl transition hover:-translate-y-1 hover:bg-blue-200 flex flex-col items-center justify-center animate-pulse"
      >
        <div class="text-6xl text-blue-700 mb-4 group-hover:scale-110 transition">🚇</div>
        <h3 class="text-2xl font-bold text-blue-900 text-center">Enter Trip Charting Solution</h3>
      </RouterLink>
      <div class="flex gap-4 mt-8 w-full">
        <!-- Watch Demo -->
        <RouterLink
          to="/demo"
          class="group flex-1 flex flex-col items-center justify-center h-36 p-5 rounded-xl shadow-md border bg-white hover:bg-blue-50 transition"
        >
          <div class="text-4xl text-blue-600 mb-2 group-hover:scale-110 transition">🎥</div>
          <h3 class="text-lg font-semibold text-gray-800 text-center">Watch Demo</h3>
        </RouterLink>
        <!-- Download Report -->
        <RouterLink
          to="/download-trip-chart"
          class="group flex-1 flex flex-col items-center justify-center h-36 p-5 rounded-xl shadow-md border bg-white hover:bg-green-50 transition"
        >
          <div class="text-4xl text-green-600 mb-2 group-hover:scale-110 transition">📥</div>
          <h3 class="text-lg font-semibold text-gray-800 text-center">Download Report by Execution ID</h3>
        </RouterLink>
      </div>
    </div>

    <!-- RIGHT: Status Control (was MIDDLE) -->
    <div class="order-1 lg:order-3 bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-center items-center h-full space-y-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">🔍 Execution Control</h2>
      <input
        v-model="executionIdInput"
        type="text"
        placeholder="Enter Execution ID"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
      <div class="flex flex-col gap-3 w-full">
        <button
          @click="goToStatus"
          :disabled="!executionIdInput.trim()"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
        >
          Check Status
        </button>
        <button
          @click="showConfirmModal = true"
          :disabled="!executionIdInput.trim() || isCancelling"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
        >
          Abort Execution
        </button>
      </div>
      <!-- Feedback -->
      <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-600 text-sm">{{ successMsg }}</p>
    </div>

  </div>

  <!-- Confirmation Modal -->
  <div
    v-if="showConfirmModal"
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border border-red-200 text-center">
      <h2 class="text-xl font-semibold text-red-600 mb-4">Abort Simulation?</h2>
      <p class="text-gray-700 mb-6">
        This will permanently stop execution ID <strong>{{ executionIdInput }}</strong>.
        Are you sure?
      </p>
      <div class="flex justify-center gap-4">
        <button
          @click="confirmAbort"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Yes, Abort
        </button>
        <button
          @click="showConfirmModal = false"
          class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</section>
</div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const executionIdInput = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const isCancelling = ref(false)
const showConfirmModal = ref(false)


const liveNotices = ref([])

const fetchNotices = async () => {
  try {
    const res = await fetch('http://34.131.163.51:8000/notices')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    liveNotices.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch notices:', err)
  }
}

onMounted(() => {
  fetchNotices()
})

// 🔁 Format timestamp to readable
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

// ✅ Check Status
const goToStatus = () => {
  const id = executionIdInput.value.trim()
  if (!id) {
    errorMsg.value = 'Please enter a valid Execution ID.'
    return
  }
  errorMsg.value = ''
  router.push({ name: 'TripChartingStatus', params: { executionId: id } })
}

// 🚨 Cancel Confirmation
const confirmAbort = async () => {
  showConfirmModal.value = false
  await cancelSimulation()
}

// ❌ Cancel Simulation API
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
    const res = await fetch(`http://34.131.163.51:8000/cancel/${id}`, {
      method: 'DELETE',
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

const downloadFile = async (fileId) => {
  try {
    const res = await fetch(`http://34.131.163.51:8000/files/${fileId}`)
    if (!res.ok) throw new Error('Failed to download file')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    // Get filename from Content-Disposition header
    const disposition = res.headers.get('Content-Disposition')
    let filename = 'downloaded_file'
    if (disposition && disposition.includes('filename=')) {
      filename = disposition.split('filename=')[1].replace(/['"]/g, '')
    }

    const link = document.createElement('a')
    link.href = url
    link.download = filename  // Use extracted filename here
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(err)
  }
}

</script>

