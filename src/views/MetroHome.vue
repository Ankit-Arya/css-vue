<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-700 via-gray-900 to-blue-900 text-white">
    <div class="max-w-lg w-full text-center p-8 rounded-xl shadow-2xl bg-black bg-opacity-70">
      <!-- Title -->
      <h1 class="text-4xl font-extrabold mb-6 tracking-wide text-red-400">
        Welcome to DMRC
      </h1>
      <p class="mb-10 text-lg text-gray-200">
        Choose an option to continue your metro experience
      </p>

      <!-- Buttons -->
      <div class="grid gap-5">
        <RouterLink 
          to="/demo" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition"
        >
          🎥 Watch Demo
        </RouterLink>

        <RouterLink 
          to="/trip-charting" 
          class="block w-full px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition"
        >
          🚇 Enter Trip Charting Solution
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// No special logic yet; just UI + routing
</script>
