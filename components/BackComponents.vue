<template>
  <header
    class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b-2 border-blue-400 shadow-sm"
  >
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Back Button -->
      <NuxtLink
        to="/home"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Rewind name="heroicons:arrow-left" class="w-5 h-5 text-gray-800" />
      </NuxtLink>

      <!-- Breadcrumbs -->
      <div class="flex items-center flex-grow justify-center space-x-2">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <NuxtLink
            v-if="crumb.link"
            :to="crumb.link"
            class="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {{ crumb.text }}
          </NuxtLink>
          <span v-else class="text-gray-500">{{ crumb.text }}</span>

          <span
            v-if="index < breadcrumbs.length - 1"
            class="text-gray-400 mx-1"
          >
          </span>
        </template>
      </div>
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
