<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Hero Section -->
    <header class="relative bg-gradient-to-r from-red-700 via-red-800 to-blue-900 text-white py-16 shadow-lg">
      <div class="max-w-6xl mx-auto text-center px-6">
        <!-- Logo -->
        <img src="/dmrc-logo.png" alt="DMRC Logo" class="mx-auto mb-6 h-20 w-auto animate-fadeIn" />

        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide animate-slideDown">
          Delhi Metro Rail Corporation
        </h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto animate-fadeIn delay-200">
          Efficient Operations • Employee Management • Optimized Trip Charting • Comprehensive Reports
        </p>
      </div>
    </header>

    <!-- Features Section -->
    <main class="flex-1 max-w-6xl mx-auto py-16 px-6 grid gap-8 md:grid-cols-3">
      <!-- Feature Card -->
      <div
        v-for="feature in features"
        :key="feature.title"
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
      >
        <div class="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <component :is="feature.icon" class="h-6 w-6 text-red-700" />
        </div>
        <h3 class="text-xl font-semibold text-red-700 mb-2">{{ feature.title }}</h3>
        <p class="text-gray-600">{{ feature.description }}</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 text-center py-6 mt-auto">
      <p>&copy; {{ new Date().getFullYear() }} Delhi Metro Rail Corporation. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ChartBarIcon, UsersIcon, ClipboardDocumentListIcon } from "@heroicons/vue/24/outline"

const features = [
  {
    title: "Trip Charting",
    description: "Generate and optimize metro trip charts with real-time simulation and reporting.",
    icon: ChartBarIcon,
  },
  {
    title: "Employee Management",
    description: "Manage crew schedules, duties, and performance seamlessly in one place.",
    icon: UsersIcon,
  },
  {
    title: "Reports & Analytics",
    description: "Access detailed operational reports and insights for better decision making.",
    icon: ClipboardDocumentListIcon,
  },
]
</script>

<style>
/* Animations for subtle professionalism */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
.animate-slideDown { animation: slideDown 1s ease forwards; }
</style>
