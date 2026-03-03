<template>
  <div
    v-if="visible"
    ref="overlay"
    @click="launch"
    class="fixed inset-0 z-[9999] bg-[#020617] overflow-hidden cursor-pointer"
  >
    <!-- Background flares -->
    <div ref="flare1" class="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -top-24 -left-24"></div>
    <div ref="flare2" class="absolute w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] -bottom-48 -right-48"></div>

    <!-- Header / subtitle container near top -->
    <div class="absolute top-16 left-0 w-full flex flex-col items-center z-10 pointer-events-none">
      <div ref="header" class="text-center opacity-0">
        <div class="flex justify-center items-center gap-4 mb-4">
          <div class="h-[2px] w-12 bg-red-600"></div>
          <span class="text-white/60 uppercase tracking-[0.3em] text-xs font-semibold">
            Government of India Enterprise
          </span>
          <div class="h-[2px] w-12 bg-red-600"></div>
        </div>
        <h1 class="text-white text-4xl md:text-6xl font-bold tracking-tight">
          Delhi Metro Rail <span class="text-red-600">Corporation</span>
        </h1>
      </div>

      <div ref="subtitle" class="mt-4 text-center opacity-0">
        <h3 class="text-2xl md:text-4xl font-light text-cyan-100 tracking-wide">
          Crew Scheduling <span class="font-bold">Software</span>
        </h3>
        <p class="mt-2 text-sm md:text-base text-white/40 tracking-[0.2em] uppercase">
          Advanced Operational Planning & Optimization
        </p>
      </div>
    </div>

    <!-- DMRC text centered -->
    <div
      ref="dmrc"
      class="absolute z-20 text-white font-black text-8xl md:text-[140px] tracking-[0.15em] leading-none select-none opacity-0"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
    >
      DMRC
    </div>

    <!-- Footer near bottom -->
    <div
      ref="footer"
      class="absolute bottom-16 left-0 w-full flex flex-col items-center z-10 opacity-0 pointer-events-none"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        <span class="text-white/60 text-xs tracking-[0.5em] uppercase animate-pulse">
          Click to Launch System
        </span>
      </div>
    </div>

    <!-- White flash -->
    <div ref="flash" class="absolute inset-0 bg-white opacity-0 pointer-events-none z-30"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { gsap } from "gsap"

const visible = ref(true)
const header = ref(null)
const subtitle = ref(null)
const footer = ref(null)
const dmrc = ref(null)
const flash = ref(null)
const flare1 = ref(null)
const flare2 = ref(null)
const overlay = ref(null)

let launched = false

onMounted(() => {
  // Entrance animation
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .to([header.value, subtitle.value, footer.value], {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      startAt: { y: -20 }
    })
    .to(dmrc.value, { opacity: 1, duration: 1 }, "-=1")

  // Optional subtle idle zoom for DMRC
  gsap.to(dmrc.value, {
    scale: 1.02,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  })
})

function launch() {
  if (launched) return
  launched = true

  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } })

  // Fade out everything except DMRC
  tl.to([header.value, subtitle.value, footer.value, flare1.value, flare2.value], {
    opacity: 0,
    duration: 0.6,
    stagger: 0.05
  })

  // Slow cinematic zoom for DMRC while fading to white
  tl.to(
    dmrc.value,
    {
      scale: 25,
      duration: 3,
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50
    },
    0
  )
  tl.to(
    flash.value,
    { opacity: 1, duration: 3, ease: "power1.inOut" },
    0
  )

  // Remove overlay to reveal app
  tl.to(overlay.value, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => (visible.value = false)
  })
}
</script>

<style scoped>
h1, h3 {
  -webkit-font-smoothing: antialiased;
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
</style>