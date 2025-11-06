<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header / Hero Section -->
<header class="relative overflow-hidden py-10 px-6 text-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
  <!-- Decorative Circles -->
  <div class="absolute -top-16 -left-16 w-64 h-64 bg-blue-600 rounded-full opacity-0 blur-3xl animate-pulse"></div>
  <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-600 rounded-full opacity-0 blur-3xl animate-pulse"></div>

  <!-- Content -->
  <div class="relative z-10 max-w-4xl mx-auto">
    
    <!-- Tagline -->
    <p class="mb-4 text-base md:text-xl font-medium text-gray-700 animate-pulse tracking-wider uppercase">
      A DMRC CSS Cell Innovation
    </p>

    <!-- Main Heading -->
    <h1 class="text-4xl md:text-7xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-2">
      CREW SCHEDULING
      <span class="text-indigo-600 text-3xl relative animate-fade-in-up">
        V2
      </span>
    </h1>

    <!-- Subtext -->
    <p class="text-2xl md:text-2xl text-gray-800 font-light animate-fade-in-up delay-50">
      The DMRC-developed system redefining operational efficiency
    </p>
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

<footer class="bg-white-300 text-gray-700 text-sm border-t border-gray-0">
  <div class="max-w-7xl mx-auto px-0 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32">
    
    <!-- Logo + Address -->
    <div>
      <img
        src="https://www.delhimetrorail.com/static/media/logo-passenger.d3afd408.svg"
        alt="Delhi Metro"
        class="w-32 mb-4"
      />
      <h3 class="font-semibold text-base mb-1">Get In Touch</h3>
      <p class="text-gray-600 leading-relaxed">
        Regional Office - Mayur Vihar Phase 1<br />
        New Delhi, India
      </p>
    </div>

    <!-- Quick Links -->
    <div>
      <h3 class="font-semibold text-base mb-3">Quick Links</h3>
      <ul class="space-y-2">
        <li><a href="/faq" class="hover:underline text-gray-600">FAQ’s</a></li>
        <li><a href="/contact-us" class="hover:underline text-gray-600">Help & Contact</a></li>
        <li><a href="/disclaimer" class="hover:underline text-gray-600">Disclaimer</a></li>
        <li><a href="/privacy-policy" class="hover:underline text-gray-600">Privacy Policy</a></li>
      </ul>
    </div>

    <!-- Contact Info -->
    <div>
      <h3 class="font-semibold text-base mb-3">Helplines</h3>
      <div class="space-y-3 text-gray-600">
        <p>
          CSS Helpline:<br />
          <strong class="text-gray-800">520205</strong>
        </p>
        <p>
          Reach Out:<br />
          <strong class="text-gray-800">+91-8800460307</strong>
        </p>
        <p>
          App Developed by:<br />
          <h4>Ankit Arya</h4><br />
          <strong class="text-gray-800">CSS CELL</strong>
        </p>
      </div>
    </div>
  </div>

</footer>
</template>



<script setup>
// No script needed for static animations
</script>



