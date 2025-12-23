<template>
  <div class="min-h-screen flex bg-slate-100">
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
    <main class="flex-1 p-10">
      <div class="p-2">
        <div class="max-h-[500px] overflow-y-auto pr-2">
          <ul class="space-y-2">
            <li
              v-for="notice in liveNotices"
              :key="notice.id"
              class="grid grid-cols-[1fr_auto] items-center
                    border border-blue-600 bg-blue-50 rounded-md
                    px-3 py-2 hover:bg-blue-300 transition"
            >
              <!-- LEFT: SINGLE LINE CONTENT -->
              <div class="text-sm text-slate-800 truncate">
                <strong>ID:</strong> {{ notice.executionId }}
                <button
                  @click="copyText(notice.executionId)"
                  class="ml-1 text-blue-600 hover:text-blue-800"
                >
                  📋
                </button>
                <span class="mx-2">|</span>

                <strong>By:</strong> {{ notice.initiatedBy }}
                <span class="mx-2">|</span>

                <strong>At:</strong> {{ formatTime(notice.timestamp) }}
              </div>

              <!-- RIGHT: ALIGNED DOWNLOAD BUTTON -->
              <button
                @click="downloadFile(notice.file_id)"
                class="ml-4 whitespace-nowrap
                      inline-flex items-center
                      px-2 py-1 text-xs font-medium rounded
                      bg-emerald-500 text-white
                      hover:bg-emerald-600 transition"
              >
                Download Time Table Template
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>


  </div>
</template>

  <script setup>
  import { ref, onMounted } from 'vue'
  
  const liveNotices = ref([])
  
  const fetchNotices = async () => {
    try {
      const res = await fetch('http://localhost:8000/notices')
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      liveNotices.value = await res.json()
    } catch (err) {
      console.error('Failed to fetch notices:', err)
    }
  }
  
  const copyText = (text) => navigator.clipboard.writeText(text).catch(() => {})
  
  const formatTime = (timestamp) => new Date(timestamp).toLocaleString()
  
  const downloadFile = async (fileId) => {
    try {
      const res = await fetch(`http://localhost:8000/files/${fileId}`)
      if (!res.ok) throw new Error('Failed to download file')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'downloaded_file'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error(err)
    }
  }
  
  onMounted(fetchNotices)
  </script>
  