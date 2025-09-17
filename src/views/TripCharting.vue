<template>
  <section class="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-6">
    <div class="w-full max-w-4xl mt-10 bg-gray-800 rounded-xl shadow-xl p-8">
      
      <!-- Header -->
      <h1 class="text-3xl font-bold text-center mb-6 text-red-500">DMRC Trip Charting Solution</h1>
      <p class="text-center text-gray-300 mb-8">
        Upload the timetable file and configure stepping back times for accurate trip chart generation.
      </p>

      <!-- File Upload Section -->
      <div class="mb-6">
        <label class="block mb-2 font-semibold text-gray-200">Timetable File</label>
        <div
          class="border-2 border-gray-600 hover:border-red-500 rounded-lg p-6 text-center cursor-pointer transition bg-gray-700"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
          <p class="text-gray-300">
            Drag & drop your timetable here, or click to browse
          </p>
        </div>
        <p v-if="fileName" class="mt-2 text-green-400 font-medium">{{ fileName }} selected</p>
      </div>

      <!-- Stepping Back Entries Section -->
      <div class="mb-6">
        <label class="block mb-2 font-semibold text-gray-200">Stepping Back Entries</label>
        <div v-for="(entry, idx) in form.steppingBack" :key="idx" class="bg-gray-700 p-4 rounded mb-2 relative border border-gray-600">
          <div class="grid grid-cols-3 gap-4">
            <input v-model="entry.station" placeholder="Station Name" class="p-2 rounded bg-gray-800 border border-gray-600 w-full" />
            <input v-model="entry.start" type="time" class="p-2 rounded bg-gray-800 border border-gray-600 w-full" />
            <input v-model="entry.end" type="time" class="p-2 rounded bg-gray-800 border border-gray-600 w-full" />
          </div>
          <button type="button" @click="removeEntry(idx)" class="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold">✖</button>
        </div>
        <button type="button" @click="addEntry" class="mt-2 py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 transition font-semibold">
          ➕ Add Stepping Back Entry
        </button>
      </div>

      <!-- Submit Button -->
      <button @click="submitSimulation" class="w-full py-3 rounded bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-lg font-semibold transition">
        Submit Trip Chart Simulation
      </button>

    </div>
  </section>
</template>

<!-- <script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
const fileName = ref('')
const form = reactive({ steppingBack: [] })

const triggerFileInput = () => fileInput.value.click()
const handleFileUpload = (e) => { if(e.target.files[0]) fileName.value = e.target.files[0].name }
const handleDrop = (e) => { if(e.dataTransfer.files[0]) fileName.value = e.dataTransfer.files[0].name }

const addEntry = () => form.steppingBack.push({ station: '', start: '', end: '' })
const removeEntry = (idx) => form.steppingBack.splice(idx, 1)

const submitSimulation = async () => {
  if (!fileName.value) { alert('Please upload a timetable file'); return }

  const payload = {
    user_id: '123', // replace with real user ID from login
    file_name: fileName.value,
    stepping_back: form.steppingBack
  }

  try {
    const res = await fetch('http://localhost:8000/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (!data.execution_id) throw new Error('No execution ID returned')
    router.push({ name: 'TripChartingStatus', params: { executionId: data.execution_id } })
  } catch (err) {
    console.error('Submission failed', err)
    alert('Failed to submit simulation')
  }
}
</script> -->
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const fileInput = ref(null)
const fileObj = ref(null)
const fileName = ref('')
const form = reactive({ steppingBack: [] })
const auth = useAuthStore()

const triggerFileInput = () => fileInput.value.click()
const handleFileUpload = (e) => {
  if (e.target.files[0]) {
    fileObj.value = e.target.files[0]
    fileName.value = e.target.files[0].name
  }
}
const handleDrop = (e) => {
  if (e.dataTransfer.files[0]) {
    fileObj.value = e.dataTransfer.files[0]
    fileName.value = e.dataTransfer.files[0].name
  }
}

const addEntry = () => form.steppingBack.push({ station: '', start: '', end: '' })
const removeEntry = (idx) => form.steppingBack.splice(idx, 1)

const submitSimulation = async () => {
  if (!fileObj.value) {
    alert('Please upload a timetable file')
    return
  }
  const executionId = crypto.randomUUID()
  const payload = new FormData()
  payload.append('execution_id', executionId)
  payload.append('file', fileObj.value)
  payload.append('user_id', auth.user?.id || '')
  payload.append('user_name', auth.user?.username || '')
  payload.append('stepping_back', JSON.stringify(form.steppingBack))

  try {
    const res = await fetch('http://localhost:8000/simulate', {
      method: 'POST',
      body: payload,
    })
    const data = await res.json()
    if (!data.execution_id) throw new Error('No execution ID returned')
    router.push({ name: 'TripChartingStatus', params: { executionId: data.execution_id } })
  } catch (err) {
    console.error('Submission failed', err)
    alert('Failed to submit simulation')
  }
}
</script>

<style>
/* subtle fade-in for file selection */
.animate-fadeIn { animation: fadeIn 0.6s ease-in-out forwards; }
@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
</style>
