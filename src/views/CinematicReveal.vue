<template>
    <div v-if="visible" class="overlay" ref="overlay" @click="open">
  
      <!-- Soft Animated Grid -->
      <div class="grid"></div>
  
      <!-- Expanding Energy Core -->
      <div class="core" ref="core"></div>
  
      <!-- Center Content -->
      <div class="content" ref="content">
        <h1 class="org">Delhi Metro Rail Corporation</h1>
        <h2 class="app">Crew Scheduling Software v 02</h2>
        <p class="tagline">
          Driven by enterprise grade optimization and web app
        </p>
        <span class="hint">Click to Launch</span>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { gsap } from "gsap"
  
  const visible = ref(true)
  const overlay = ref(null)
  const core = ref(null)
  const content = ref(null)
  
  let opened = false
  
  function open() {
    if (opened) return
    opened = true
  
    const tl = gsap.timeline()
  
    // Fade content
    tl.to(content.value, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    })
  
    // Expand energy core dramatically
    tl.to(core.value, {
      scale: 18,
      duration: 1.8,
      ease: "power4.inOut"
    })
  
    // Fade overlay
    tl.to(overlay.value, {
      opacity: 0,
      duration: 1,
      onComplete: () => visible.value = false
    })
  }
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at center, #1e3a5f 0%, #0b1c2d 70%);
    z-index: 9999;
    overflow: hidden;
    cursor: pointer;
    transition: opacity 0.8s ease;
  }
  
  /* Light modern animated grid */
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,180,255,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,180,255,0.08) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridMove 18s linear infinite;
  }
  
  @keyframes gridMove {
    from { background-position: 0 0; }
    to { background-position: 60px 60px; }
  }
  
  /* Energy Core */
  .core {
    position: absolute;
    width: 160px;
    height: 160px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    border-radius: 50%;
    background: radial-gradient(circle,
      rgba(0,200,255,0.9) 0%,
      rgba(0,140,255,0.6) 40%,
      transparent 70%
    );
    box-shadow:
      0 0 80px rgba(0,200,255,0.7),
      0 0 160px rgba(0,140,255,0.5);
  }
  
  /* Content */
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    max-width: 800px;
    padding: 20px;
    color: #ffffff;
  }
  
  .org {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 2px;
  }
  
  .app {
    margin-top: 12px;
    font-size: 26px;
    font-weight: 500;
    color: #7dd3fc;
  }
  
  .tagline {
    margin-top: 18px;
    font-size: 16px;
    opacity: 0.85;
    color: #dbeafe;
  }
  
  .hint {
    display: block;
    margin-top: 30px;
    font-size: 14px;
    opacity: 0.6;
    letter-spacing: 1px;
  }
  </style>