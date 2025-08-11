<!-- SlidingButton.vue -->
<template>
  <BackComponents />
  <div class="max-w-2xl container mx-auto">
    <div class="w-full flex justify-center space-y-2">
      <div class="relative w-full">
        <div class="flex border-b border-gray-300  overflow-hidden relative">
          <!-- Background Slider -->
          <div class="absolute top-0 bottom-0 w-1/2 transition-transform duration-300" :class="{
            'border-b-2 border-purple-300 translate-x-0': activeButton === 'borrow',
            'border-b-2 border-yellow-200 translate-x-full': activeButton === 'return',
          }"></div>

          <button @click="setActive('borrow')"
            class="relative z-10 flex-1 px-1 py-1 text-center transition-colors duration-300" :class="activeButton === 'borrow' ? 'text-gray-800' : 'text-gray-600'
              ">
            ยืม
          </button>
          <button @click="setActive('return')"
            class="relative z-10 flex-1 px-1 py-1 text-center transition-colors duration-300" :class="activeButton === 'return' ? 'text-gray-800' : 'text-gray-600'
              ">
            คืน
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Conditionally Render Components -->
  <div class="mx-auto max-w-2xl">
    <DataTransitionDebtorBorrow v-if="activeButton === 'borrow'" />
    <DataTransitionDebtorReturn v-else />
  </div>

  <div class="flex justify-center w-full mb-12">
    <ButtonDashboard />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Import your components

const activeButton = ref("borrow");

const setActive = (button) => {
  activeButton.value = button;
};
</script>
