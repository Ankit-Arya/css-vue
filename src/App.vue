<template>
  <div class="min-h-screen bg-gradient-to-tr from-indigo-600 via-fuchsia-500 to-pink-400 flex flex-col">
    <nav class="flex justify-between items-center py-6 px-8">
      <div class="flex items-center gap-2">
        <img class="h-10 w-10" src="https://delhimetrorail.com/static/media/logo-passenger.d3afd408.svg" alt="DMRC Logo" />
        <span class="font-bold text-white text-xl tracking-tight">DMRC Crew</span>
      </div>
      <a href="#" class="hover:underline text-white text-base font-medium transition">Learn More</a>
    </nav>

    <main class="flex-1 flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-12 pb-6 md:pb-0 gap-10 md:gap-20">
      <!-- Left: Hero Content -->
      <section class="max-w-xl">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 leading-tight">

          <br>
          <span class="inline-block bg-white bg-opacity-30 px-3 py-1 mt-3 mb-2 rounded-md text-fuchsia-100 shadow-lg animate-pulse">
            Optimize DMRC Crew Scheduling Effortlessly.
          </span>
          <br>
        </h1>
        <p class="text-lg md:text-xl text-white/90 mb-8 drop-shadow">
          Modern. Automated. Human-centric. Empower team efficiency across all metro lines with seamless, intelligent crew management!
        </p>
        <button
          @click="enterSoftware"
          :disabled="loading"
          class="relative inline-flex items-center px-7 py-3 rounded-full bg-white/90 hover:bg-white text-fuchsia-600 shadow-lg font-semibold text-lg transition-all group"
        >
          <span v-if="!loading" class="group-hover:scale-105 transition">Enter Software</span>
          <svg v-else class="animate-spin ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"/>
          </svg>
        </button>
        <p class="text-xs text-fuchsia-50 mt-5 mb-1 transition-opacity animate-fadeIn">Try it now. No login required!</p>
      </section>
      <!-- Right: Hero Illustration -->
      <section class="flex-shrink-0">
        <video
          src="/Free Metro Train Animation Animation by Divyesh 8D  LottieFiles.mp4"
          autoplay
          loop
          muted
          playsinline
          class="w-80 md:w-96 rounded-2xl shadow-2xl bg-white/10 animate-slideInUp"
        ></video>
      </section>

    </main>

    <footer class="text-center text-white/70 py-6 text-xs tracking-wide">
      Made with <span class="text-pink-200">&hearts;</span> using Vue.js 3 + Tailwind CSS &mdash; {{ year }}
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const year = new Date().getFullYear()
const loading = ref(false)

const enterSoftware = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('Loading next page...')
  }, 1300)
}
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0 }
  100% { opacity: 1 }
}
.animate-fadeIn { animation: fadeIn 1.8s cubic-bezier(.4,0,.2,1) 0.35s both; }

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
}
.animate-slideInUp { animation: slideInUp 2s ease-out 0.2s both; }
</style>
