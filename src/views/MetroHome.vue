<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar -->
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
            Trip Chart Execution Control
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
    <main class="flex-1 p-10 bg-white-300 border border-gray-300">
      <RouterLink
        to="/select-line"
        class="w-full max-w p-24 bg-blue-100 rounded-2xl shadow-xl border-2 border-blue-400 flex flex-col items-center justify-center hover:shadow-2xl transition"
      >
        <!-- Image Icon -->
        <img
          src="@/assets/metro.jpg"
          alt="Metro Icon"
          class="w-24 h-24 mb-4 object-contain"
        />

        <h3 class="text-xl font-bold text-blue-900 text-center animate-pulse">Click Here</h3>
        <h3 class="text-xl font-bold text-blue-900 text-center animate-pulse">To</h3>
        <h3 class="text-2xl font-bold text-blue-900 text-center">
          Generate New Trip Chart
        </h3>
      </RouterLink>
    </main>

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
    // const res = await fetch('http://34.131.163.51:8000/notices')
    const res = await fetch('http://localhost:8000/notices')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    liveNotices.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch notices:', err)
  }
}

onMounted(() => {
  fetchNotices()
})


function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      // alert('Copied: ' + text)
    })
    .catch(() => {
      // alert('Failed to copy')
    })
}



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
    // const res = await fetch(`http://34.131.163.51:8000/cancel/${id}`, {
    const res = await fetch(`http://localhost:8000/cancel/${id}`, {
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
    // const res = await fetch(`http://34.131.163.51:8000/files/${fileId}`)
    const res = await fetch(`http://localhost:8000/files/${fileId}`)
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

