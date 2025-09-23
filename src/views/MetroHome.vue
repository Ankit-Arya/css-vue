<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-slate-800 to-gray-700 text-white">
    <div class="max-w-lg w-full text-center p-8 rounded-xl shadow-2xl bg-white bg-opacity-10 backdrop-blur-sm border border-gray-600">
      <!-- Title -->
      <h1 class="text-4xl font-extrabold mb-6 tracking-wide text-red-500">
        Welcome to DMRC
      </h1>
      <p class="mb-10 text-lg text-gray-200">
        Choose an option to continue your metro experience
      </p>

      <!-- Buttons -->
      <div class="grid gap-5">
        <RouterLink 
          to="/demo" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300"
        >
          🎥 Watch Demo
        </RouterLink>

        <RouterLink 
          to="/trip-charting" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300"
        >
          🚇 Enter Trip Charting Solution
        </RouterLink>
        <RouterLink 
          to="/download-trip-chart" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition duration-300"
        >
          📥 Download Report by Execution ID
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// No special logic needed for this page
</script>
