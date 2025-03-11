<template>
  <header
    class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-blue-500/30 shadow-md"
  >
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Back Button with improved styling -->
      <NuxtLink
        to="/home"
        class="p-2 hover:bg-blue-50 rounded-full transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow border border-transparent hover:border-blue-200"
      >
        <Rewind name="heroicons:arrow-left" class="w-5 h-5 text-blue-600" />
      </NuxtLink>

      <!-- Breadcrumbs with improved styling -->
      <div class="flex items-center flex-grow justify-center space-x-2 px-4">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <NuxtLink
            v-if="crumb.link"
            :to="crumb.link"
            class="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline text-sm md:text-base"
          >
            {{ crumb.text }}
          </NuxtLink>
          <span v-else class="text-gray-700 font-semibold text-sm md:text-base">{{ crumb.text }}</span>

          <!-- Separator between breadcrumbs -->
          <span
            v-if="index < breadcrumbs.length - 1"
            class="text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </template>
      </div>
      
      <!-- Optional user menu icon on the right -->
      <button class="p-2 hover:bg-blue-50 rounded-full transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow border border-transparent hover:border-blue-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { Rewind } from "lucide-vue-next";
import { useRouter } from "vue-router";
const router = useRouter();

const breadcrumbs = ref([
  { text: "จัดการหมวดหมู่", link: "/category" },
  { text: "", link: "" },
]);


const goBack = () => {
  router.back();
}


</script>
