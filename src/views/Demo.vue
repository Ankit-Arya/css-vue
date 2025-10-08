<template>
  <section class="bg-white py-12 px-4 sm:px-8 lg:px-16">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          🎥 Trip Charting Demo
        </h2>
        <p class="text-gray-600 text-base max-w-2xl">
          This demo showcases the workflow and simulation process for entering and managing trip charting data in the DMRC system.
        </p>
      </div>

      <!-- Video Embed -->
      <div class="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
        <div class="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/abc123DEF"
            title="Trip Charting Demo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script logic needed for static video
</script>

<style scoped>
/* Optional: for browsers not supporting Tailwind's aspect-ratio plugin */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.aspect-w-16 iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
