<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b-2 border-blue-400 shadow-sm">
    <div class="container mx-auto px-4 py-3 flex sm:flex-row items-center justify-between">
      <!-- Back Button -->
      <NuxtLink 
        to="/category" 
        class="mb-2 sm:mb-0 self-start sm:self-center"
      >
        <div class="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Rewind 
            name="heroicons:arrow-left" 
            class="w-5 h-5 text-gray-800" 
          />
        </div>
      </NuxtLink>

      <!-- Breadcrumbs -->
      <div class="flex items-center flex-wrap justify-center space-x-2 mb-2 sm:mb-0">
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

      <!-- Add Button เอาออกเพื่อให้สมดุล-->
      <NuxtLink 
        class="mb-2 sm:mb-0 self-start sm:self-center"
      >
        <div class="w-8 h-8  text-white rounded-full flex items-center justify-center 
           transition-colors shadow-md hover:shadow-lg">
          
        </div>
      </NuxtLink>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Rewind } from 'lucide-vue-next';

const route = useRoute();
const groupID = route.query.groupID || '';  // Retrieve groupID from query parameters
const typeID = route.params.id;
const CategoryData = ref([]);
const GroupData = ref([]);

const breadcrumbs = ref([
  { text: 'จัดการหมวดหมู่', link: '/category' },
  { text: '', link: '' },  // Placeholder for dynamic group name and link
  { text: '', link: '' }, // Hardcoded for type name, replace with dynamic if needed
  { text: 'เพิ่ม', link: '' } // Hardcoded for type name, replace with dynamic if needed
]);
const { $axios } = useNuxtApp();

const fetchCategory = async () => {
  try {
    const response = await $axios.get(`/category/${groupID}`);
    const data = await response.data;
    CategoryData.value = data;
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

const fetchGroup = async () => {
  try {
    const response = await $axios.get(`/account_group_get/${typeID}`);
    const data = await response.data;
    GroupData.value = data.account_group_by_id;
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

onMounted(() => {
  fetchCategory();
  fetchGroup();
});

watch(CategoryData, (newData) => {
  if (newData.length > 0) {
    breadcrumbs.value[1].text = newData[0].account_category_name;
    breadcrumbs.value[1].link = `/group/${groupID}`;
  }
});

watch(GroupData, (newData) => {
  if (newData.length > 0) {
    breadcrumbs.value[2].text = newData[0].account_group_name;
    breadcrumbs.value[2].link = `/type/${typeID}?groupID=${groupID}`; // Correct query string format
  }
});

</script>