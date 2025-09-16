<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-red-700 text-white p-6">
    <div class="w-full max-w-3xl bg-black bg-opacity-70 rounded-xl shadow-2xl p-8">

      <h1 class="text-3xl font-extrabold text-center mb-6 text-red-400 animate-pulse">
        🚇 DMRC Trip Charting
      </h1>
      <p class="text-center text-gray-300 mb-8">
        Upload your real timetable and input stepping back values for simulation.
      </p>

      <!-- File Upload -->
      <div
        class="border-2 border-dashed border-gray-500 hover:border-red-400 rounded-lg p-6 text-center cursor-pointer transition mb-6"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
        <p class="text-lg">
          📂 <span class="font-semibold">Drag & drop</span> your timetable or <span class="text-blue-400 underline cursor-pointer" @click="triggerFileInput">browse</span>
        </p>
        <p v-if="fileName" class="mt-3 text-green-400 font-medium animate-fadeIn">
          ✅ {{ fileName }} selected
        </p>
      </div>

      <!-- Stepping Back Entries -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2 text-blue-400">Stepping Back Entries</h2>
        <div v-for="(entry, idx) in form.steppingBack" :key="idx" class="bg-gray-800 p-4 rounded-lg mb-2 relative">
          <input v-model="entry.station" placeholder="Station Name" class="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-600" />
          <div class="grid grid-cols-2 gap-2">
            <input v-model="entry.start" type="time" class="p-2 rounded bg-gray-900 border border-gray-600" />
            <input v-model="entry.end" type="time" class="p-2 rounded bg-gray-900 border border-gray-600" />
          </div>
          <button type="button" @click="removeEntry(idx)" class="absolute top-2 right-2 text-red-400 hover:text-red-600">✖</button>
        </div>
        <button type="button" @click="addEntry" class="w-full py-2 rounded bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 mt-2 font-semibold">
          ➕ Add Entry
        </button>
      </div>

      <!-- Submit -->
      <button @click="submitSimulation" class="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-lg font-semibold transition">
        🚀 Submit Simulation
      </button>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
const fileName = ref('')
const form = reactive({
  steppingBack: []
})

const triggerFileInput = () => fileInput.value.click()
const handleFileUpload = (e) => { if(e.target.files[0]) fileName.value = e.target.files[0].name }
const handleDrop = (e) => { if(e.dataTransfer.files[0]) fileName.value = e.dataTransfer.files[0].name }

const addEntry = () => form.steppingBack.push({ station: '', start: '', end: '' })
const removeEntry = (idx) => form.steppingBack.splice(idx,1)

const submitSimulation = async () => {
  if(!fileName.value) { alert('Please upload a timetable file'); return }
  const payload = {
    user_id: '123', // can be dynamic in real app
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
    const executionId = data.execution_id
    router.push({ name: 'TripChartingStatus', params: { executionId } })
  } catch(err) {
    console.error('Submission failed', err)
    alert('Failed to submit simulation')
  }
}
</script>

<style>
.animate-fadeIn { animation: fadeIn 0.6s ease-in-out forwards; }
@keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
</style>
