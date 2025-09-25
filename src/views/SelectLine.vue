<template>
  <div class="min-h-screen bg-slate-900 text-gray-200 flex items-center justify-center px-4 py-8">
    <transition name="fade" appear>
      <div class="w-full max-w-5xl bg-slate-800 shadow-2xl rounded-2xl overflow-hidden border border-slate-700">
        
        <!-- Header -->
        <header class="px-8 py-6 border-b border-slate-700">
          <h1 class="text-3xl font-bold text-white">🚇 DMRC Trip Charting</h1>
          <p class="text-sm text-slate-400 mt-1">Select a metro line to proceed</p>
        </header>

        <!-- Grid of Lines -->
        <main class="p-8">
          <transition-group name="card-fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <!-- <button
              v-for="line in lines"
              :key="line.name"
              @click="goToTripChart(line.path)"
              :class="[
                'w-full py-5 px-6 rounded-xl font-semibold text-lg text-white flex items-center justify-center shadow-lg transition transform duration-300',
                line.class,
                'hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30'
              ]"
            >
              {{ line.name }}
            </button> -->
            <button
            v-for="line in lines"
            :key="line.name"
            :disabled="line.locked"
            @click="!line.locked && goToTripChart(line.path)"
            :class="[
                'w-full py-5 px-6 rounded-xl font-semibold text-lg flex items-center justify-center transition duration-300',
                line.class,
                {
                'opacity-40 cursor-not-allowed': line.locked,
                'text-white hover:scale-105 hover:shadow-xl': !line.locked
                }
            ]"
            >
            {{ line.name }}
            </button>

          </transition-group>
        </main>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const lines = [
  { name: 'Red Line', path: 'red', class: 'bg-red-600 hover:bg-red-700' },
  { name: 'Blue Line', path: 'blue', class: 'bg-blue-600 hover:bg-blue-700', locked: true },
  { name: 'Yellow Line', path: 'yellow', class: 'bg-yellow-400 text-black hover:bg-yellow-300', locked: true },
  { name: 'Green Line', path: 'green', class: 'bg-green-600 hover:bg-green-700', locked: true },
  { name: 'Pink Line', path: 'pink', class: 'bg-pink-500 hover:bg-pink-600', locked: true },
  { name: 'Magenta Line', path: 'magenta', class: 'bg-purple-600 hover:bg-purple-700', locked: true },
  { name: 'Orange Line', path: 'orange', class: 'bg-orange-500 text-black hover:bg-orange-400', locked: true },
  { name: 'Aqua Line', path: 'aqua', class: 'bg-cyan-500 text-black hover:bg-cyan-400', locked: true }
]

function goToTripChart(linePath) {
  router.push(`/trip-charting-${linePath}`)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card-fade-enter-active {
  transition: all 0.4s ease;
}
.card-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
