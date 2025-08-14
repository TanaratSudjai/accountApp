<template>
  <header
    class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b-2 border-blue-400 shadow-sm"
  >
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Back Button -->
      <NuxtLink
        to="/category"
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
            /
          </span>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
const { $axios } = useNuxtApp();
import { Rewind } from "lucide-vue-next";

const GroupData = ref([]);
const breadcrumbs = ref([
  { text: "จัดการหมวดหมู่", link: "/category" },
  { text: "", link: "" },
]);

const fetchGroup = async () => {
  try {
    const response = await $axios.get(`/category/${categoryID}`);
    GroupData.value = response.data;
  } catch (error) {
    console.error("Error fetching group data:");
  }
};

onMounted(() => {
  fetchGroup();
});

const route = useRoute();
const categoryID = route.params.id;

watch(GroupData, (newData) => {
  if (newData.length > 0) {
    breadcrumbs.value[1].text = newData[0].account_category_name;
    breadcrumbs.value[1].link = `/group/${categoryID}`;
  }
});
</script>
