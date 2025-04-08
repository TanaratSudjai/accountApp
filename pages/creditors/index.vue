<!-- SlidingButton.vue -->
<template>
  <BackComponents />
  <div class="flex justify-center w-full p-4 mb-6">
    <div class="w-full flex justify-center max-w-4xl space-y-2">
      <div class="relative w-full max-w-2xl">
        <div
          class="flex border border-gray-300 rounded-lg overflow-hidden relative"
        >
          <!-- Background Slider -->
          <div
            class="absolute top-0 bottom-0 w-1/2 transition-transform duration-300"
            :class="{
              'bg-purple-300 translate-x-0': activeButton === 'borrow',
              'bg-yellow-200 translate-x-full': activeButton === 'return',
            }"
          ></div>

          <!-- Buttons -->
          <button
            @click="setActive('borrow')"
            class="relative z-10 flex-1 px-4 py-2 text-center transition-colors duration-300"
            :class="
              activeButton === 'borrow' ? 'text-gray-800' : 'text-gray-600'
            "
          >
            ยืม
          </button>
          <button
            @click="setActive('return')"
            class="relative z-10 flex-1 px-4 py-2 text-center transition-colors duration-300"
            :class="
              activeButton === 'return' ? 'text-gray-800' : 'text-gray-600'
            "
          >
            คืน
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Conditionally Render Components -->
  <div class="mt-4">
    <DataTransitionCreditorBorrow v-if="activeButton === 'borrow'" />
    <DataTransitionCreditorReturn v-else />
  </div>
  <div class="mt-4 flex justify-center w-full">
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
