<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Hero / Header Section -->
    <header
      class="bg-gradient-to-r from-red-700 via-red-800 to-blue-900 text-white text-center py-16 shadow-lg relative"
    >
      <!-- Logo -->
      <!-- <div class="absolute top-6 left-6 flex items-center space-x-3">
        <img
          src="https://www.dmrcsmartcard.com/images/logo.png"
          alt="DMRC Logo"
          class="h-12 w-12 object-contain animate-pulse"
        />
        <span class="text-xl font-bold tracking-wide">Delhi Metro Rail Corporation</span>
      </div> -->

      <!-- Main Heading -->
      <h1 class="text-4xl font-extrabold mb-4 animate-fadeIn">
        Welcome to DMRC Enterprise Portal
      </h1>
      <p class="text-lg max-w-2xl mx-auto animate-fadeIn delay-200">
        Powering metro operations, employee management, and optimization with
        secure, scalable digital solutions.
      </p>
    </header>

    <!-- Main Content -->
    <main
      class="flex-1 max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8"
    >
      <!-- Card 1 -->
      <div
        class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <div
          class="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4 text-red-700 text-2xl"
        >
          📊
        </div>
        <h3 class="text-xl font-semibold text-red-700 mb-2">
          Trip Charting
        </h3>
        <p class="text-gray-600">
          Upload timetables, optimize stepping back, and generate detailed trip
          charts.
        </p>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <div
          class="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4 text-blue-700 text-2xl"
        >
          👥
        </div>
        <h3 class="text-xl font-semibold text-blue-700 mb-2">
          Employee Management
        </h3>
        <p class="text-gray-600">
          Manage shifts, schedules, and employee data seamlessly across the
          network.
        </p>
      </div>

      <!-- Card 3 -->
      <div
        class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <div
          class="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4 text-green-700 text-2xl"
        >
          📑
        </div>
        <h3 class="text-xl font-semibold text-green-700 mb-2">
          Reports & Analytics
        </h3>
        <p class="text-gray-600">
          Generate operational insights, optimize performance, and view
          compliance reports.
        </p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 text-center py-6 text-sm">
      © {{ new Date().getFullYear() }} Delhi Metro Rail Corporation. All Rights
      Reserved.
    </footer>
  </div>
</template>

<script setup>
// no external icons needed
</script>

<style>
/* Custom Animations */
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
  animation: fadeIn 0.8s ease-in-out forwards;
}
.delay-200 {
  animation-delay: 0.2s;
}
</style>
