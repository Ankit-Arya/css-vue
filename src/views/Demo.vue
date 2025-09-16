<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-red-700 text-white p-6">
    <div class="w-full max-w-3xl bg-black bg-opacity-70 rounded-xl shadow-2xl p-8">
      <!-- Header -->
      <h1 class="text-3xl font-extrabold text-center mb-6 text-red-400 animate-pulse">
        🎥 DMRC Trip Charting Demo
      </h1>
      <p class="text-center text-gray-300 mb-8">
        Upload your timetable and input stepping back values to simulate train operations.
      </p>

      <!-- File Upload -->
      <div
        class="border-2 border-dashed border-gray-500 hover:border-red-400 rounded-lg p-6 text-center cursor-pointer transition mb-8"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="handleFileUpload"
        />
        <p class="text-lg">
          📂 <span class="font-semibold">Drag & drop</span> your timetable file here <br />
          or <span class="text-blue-400 underline cursor-pointer" @click="triggerFileInput">browse</span>
        </p>
        <p v-if="fileName" class="mt-3 text-green-400 font-medium animate-fadeIn">
          ✅ {{ fileName }} uploaded successfully!
        </p>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="submitForm" class="space-y-8">
        <!-- Dynamic Stepping Back Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4 text-blue-400">Stepping Back Times</h2>

          <div
            v-for="(entry, index) in form.steppingBackEntries"
            :key="index"
            class="mb-4 p-4 rounded-lg bg-gray-800 border border-gray-600 space-y-3 relative"
          >
            <div>
              <label class="block text-left mb-1 font-medium">Location</label>
              <input
                v-model="entry.location"
                type="text"
                placeholder="Station/Depot"
                class="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-400 outline-none transition"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-left mb-1 font-medium">Start Time</label>
                <input
                  v-model="entry.start"
                  type="time"
                  class="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
                />
              </div>
              <div>
                <label class="block text-left mb-1 font-medium">End Time</label>
                <input
                  v-model="entry.end"
                  type="time"
                  class="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
                />
              </div>
            </div>

            <!-- Remove Button -->
            <button
              type="button"
              @click="removeEntry(index)"
              class="absolute top-2 right-2 text-red-400 hover:text-red-600 transition"
            >
              ✖
            </button>
          </div>

          <!-- Add New Entry Button -->
          <button
            type="button"
            @click="addEntry"
            class="w-full py-2 rounded bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition font-semibold"
          >
            ➕ Add Stepping Back Entry
          </button>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-left mb-2 font-semibold">Additional Notes</label>
          <textarea
            v-model="form.notes"
            placeholder="Any operational notes..."
            class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
          ></textarea>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 transition text-lg font-semibold"
        >
          🚇 Run Simulation
        </button>
      </form>

      <!-- Animated Output -->
      <div v-if="submitted" class="mt-10 p-6 rounded-lg bg-gray-800 animate-fadeIn">
        <h2 class="text-xl font-bold mb-4 text-blue-400">Simulation Results</h2>
        <p class="text-gray-300 mb-4">📂 File: {{ fileName || "Not provided" }}</p>

        <div v-if="form.steppingBackEntries.length > 0" class="overflow-x-auto">
          <table class="min-w-full border border-gray-600 text-sm">
            <thead class="bg-gray-700">
              <tr>
                <th class="px-4 py-2 border border-gray-600 text-left">Location</th>
                <th class="px-4 py-2 border border-gray-600 text-left">Start</th>
                <th class="px-4 py-2 border border-gray-600 text-left">End</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(entry, index) in form.steppingBackEntries"
                :key="'result-' + index"
                class="hover:bg-gray-700 transition"
              >
                <td class="px-4 py-2 border border-gray-600">{{ entry.location }}</td>
                <td class="px-4 py-2 border border-gray-600">{{ entry.start }}</td>
                <td class="px-4 py-2 border border-gray-600">{{ entry.end }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-gray-300 mt-4">📝 Notes: {{ form.notes || "N/A" }}</p>

        <div class="mt-6 animate-bounce text-green-400 font-bold text-lg">
          ✅ Simulation Successful!
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue"

const fileInput = ref(null)
const fileName = ref("")
const submitted = ref(false)

const form = reactive({
  steppingBackEntries: [],
  notes: ""
})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    fileName.value = file.name
  }
}

const addEntry = () => {
  form.steppingBackEntries.push({
    location: "",
    start: "",
    end: ""
  })
}

const removeEntry = (index) => {
  form.steppingBackEntries.splice(index, 1)
}

const submitForm = () => {
  submitted.value = true
}
</script>

<style>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out forwards;
}
</style>
