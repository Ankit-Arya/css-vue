<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header / Hero Section -->
    <header class="relative overflow-hidden py-12 px-6 bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-800 text-white shadow-2xl">
<!-- <header class="relative overflow-hidden py-12 px-6 bg-gradient-to-br from-indigo-300 via-blue-200 to-teal-200 text-gray-900 shadow-lg"> -->

      <!-- Floating circles -->
      <div class="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-spin"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-400 rounded-full opacity-15 blur-3xl animate-[spin_90s_linear_infinite]"></div>

      <!-- Heading -->
      <div class="text-center relative z-10 max-w-5xl mx-auto">
        <p class="mb-3 text-sm font-medium tracking-widest uppercase text-gray-300 animate-pulse">
          A DMRC CSS Cell Innovation
        </p>

        <h1 class="text-5xl md:text-7xl font-black mb-4 leading-snug drop-shadow-lg transform transition-transform duration-700 hover:scale-105">
          <span class="block text-teal-400">Next-Gen</span> Crew Scheduling
        </h1>

        <p class="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto animate-pulse">
          The DMRC-developed system redefining operational management for high-demand environments.
        </p>

        <a href="#features" class="mt-8 inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors font-semibold group">
          Explore Features
          <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </header>

    <!-- Highlights Section -->
    <section class="flex-1 max-w-6xl mx-auto py-16 px-6">
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Highlight 1 -->
<li>
  <div class="group border-2 border-blue-200 rounded-xl p-8 flex items-center space-x-6 relative transition-all duration-300 hover:bg-blue-600 hover:shadow-lg">
    <div class="text-5xl text-blue-700 group-hover:text-white transition-colors duration-300">📘</div>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 mb-2">
        100+ Trip Charts Generated
      </h3>
      <p class="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">
        Enabling better planning and smoother operations across the network.
      </p>
    </div>
  </div>
</li>

<!-- Highlight 2 -->
<li>
  <div class="group border-2 border-orange-200 rounded-xl p-8 flex items-center space-x-6 relative transition-all duration-300 hover:bg-orange-500 hover:shadow-lg">
    <div class="text-5xl text-orange-700 group-hover:text-white transition-colors duration-300">💼</div>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 mb-2">
        Manpower Cost Savings
      </h3>
      <p class="text-gray-600 group-hover:text-orange-100 transition-colors duration-300">
        Automation has saved hundreds of hours in manual planning and coordination.
      </p>
    </div>
  </div>
</li>

<!-- Highlight 3 -->
<li>
  <div class="group border-2 border-green-200 rounded-xl p-8 flex items-center space-x-6 relative transition-all duration-300 hover:bg-green-600 hover:shadow-lg">
    <div class="text-5xl text-green-700 group-hover:text-white transition-colors duration-300">📄</div>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 mb-2">
        Crew Control & TO Reports
      </h3>
      <p class="text-gray-600 group-hover:text-green-100 transition-colors duration-300">
        Instantly generate reports for crew management and train operations in a few clicks.
      </p>
    </div>
  </div>
</li>

        <!-- Highlight 4 -->
<li>
  <div class="group border-2 border-purple-200 rounded-xl p-8 flex items-center space-x-6 relative transition-all duration-300 hover:bg-purple-600 hover:shadow-lg">
    <!-- Icon -->
    <div class="text-5xl text-purple-700 group-hover:text-white transition-colors duration-300">
      ⚡
    </div>

    <!-- Text Content -->
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 mb-2">
        Fast, Efficient, Scalable
      </h3>
      <p class="text-gray-600 group-hover:text-purple-100 transition-colors duration-300">
        Built for the scale of DMRC with enterprise-grade performance.
      </p>
    </div>
  </div>
</li>

      </ul>
    </section>
  </div>
</template>



<script setup>
// No script needed for static animations
</script>

