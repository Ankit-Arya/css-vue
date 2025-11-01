<template>
    <div class="min-h-screen flex flex-col">
      <!-- Hero / Welcome Section -->
      <header class="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <!-- Decorative Circles -->
        <div class="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
  
        <div class="relative z-10 max-w-3xl mx-auto">
          <h1 class="text-5xl font-extrabold text-gray-900 mb-4 animate-fadeInUp">
            DMRC Trip Charting
          </h1>
          <p class="text-lg text-gray-800 animate-fadeInUp delay-150">
            Upload timetable and configure stepping back timings
          </p>
        </div>
      </header>
  
      <!-- Upload + Form Section -->
      <section class="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 px-6">
        <div class="max-w-5xl mx-auto space-y-12">
          
          <!-- File Upload -->
          <div>
            <h2 class="text-2xl font-bold text-blue-800 mb-4">📁 Upload Timetable</h2>
            <div
              class="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-lg p-6 text-center cursor-pointer bg-white transition hover:bg-blue-300 py-20"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
              <p class="text-gray-600 text-2xl">
                Drag & drop your timetable file here, or click to browse
              </p>
              <p v-if="fileName" class="mt-2 text-green-600 font-medium">{{ fileName }} selected</p>
            </div>
          </div>
  
          <!-- Stepping Back Entries -->
          <div>
            <h2 class="text-2xl font-bold text-blue-800 mb-4">🕒 Stepping Back Configuration</h2>
            <p class="text-gray-600 mb-4">Add stations and times where stepping back logic applies.</p>
            <div v-for="(entry, idx) in form.steppingBack" :key="idx" class="bg-white p-4 rounded border border-blue-200 shadow-sm mb-4 relative">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input v-model="entry.station" placeholder="Station Name" class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200" />
                <input v-model="entry.start" type="time" class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200" />
                <input v-model="entry.end" type="time" class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200" />
              </div>
              <button type="button" @click="removeEntry(idx)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl">×</button>
            </div>
            <button type="button" @click="addEntry" class="mt-2 py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
             Add Stepping Back Entry
            </button>
          </div>
  
          <!-- Submit Button -->
          <div class="text-center">
            <button
              @click="submitSimulation"
              class="px-8 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 
                    text-white text-lg font-semibold shadow-sm hover:shadow-md 
                    transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Submit 
            </button>
  
  
  
          </div>
        </div>
      </section>
    </div>
  </template>
  
  
  
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
    payload.append('user_name', auth.user?.email || '')
    payload.append('stepping_back', JSON.stringify(form.steppingBack))
  
    try {
      const res = await fetch('http://34.131.115.69:8000/simulateL34', {
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
  