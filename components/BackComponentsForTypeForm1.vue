<template>
  <header
    class="sticky top-0 z-50 w-full bg-white backdrop-blur-md border-b-2 border-[#46cb79] shadow-sm"
  >
    <div
      class="container mx-auto px-4 py-3 flex sm:flex-row items-center justify-between"
    >
      <!-- Back Button -->
      <NuxtLink @click="goback" class="mb-2 sm:mb-0 self-start sm:self-center">
        <div class="p-2 hover:bg-[#111827] rounded-full transition-colors">
          <Rewind name="heroicons:arrow-left" class="w-5 h-5 text-[#46cb79]" />
        </div>
      </NuxtLink>

      <div v-if="groupID === '' && groupIDGroup === undefined && typeID === undefined" class="flex items-center flex-wrap justify-center space-x-2 mb-2 sm:mb-0">
        <NuxtLink
            class="text-[#46cb79] hover:text-[#308a53] transition-colors"
          >
            จัดการหมวดหมู่
          </NuxtLink>
      </div>

      <div v-if="groupID === '' && groupIDGroup != null && typeID != null" class="flex items-center flex-grow justify-center space-x-2">
        <template v-for="(crumb, index) in breadcrumbsForGroup" :key="index">
          <NuxtLink
            v-if="crumb.link"
            :to="crumb.link"
            class="text-[#46cb79] hover:text-[#308a53] transition-colors"
          >
            {{ crumb.text }}
          </NuxtLink>
          <span v-else class="text-gray-500">{{ crumb.text }}</span>

          <span
            v-if="index < breadcrumbsForGroup.length - 1"
            class="text-gray-400 mx-1"
          >
            /
          </span>
        </template>
      </div>

      <!-- Breadcrumbs -->
      <div v-if="groupIDGroup != undefined && typeID != undefined && groupID != ''"
        class="flex items-center flex-wrap justify-center space-x-2 mb-2 sm:mb-0"
      >
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <NuxtLink
            v-if="crumb.link"
            :to="crumb.link"
            class="text-[#46cb79] hover:text-[#308a53] transition-colors"
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
      

      <!-- Add Button -->
      <div v-if="typeID === undefined || groupID === '' ">
        <NuxtLink class="mb-2 sm:mb-0 self-start sm:self-center"></NuxtLink>
      </div>
      <div v-else>
        <NuxtLink
          :to="`/type/addType/${typeID}?groupID=${groupID}`"
          class="mb-2 sm:mb-0 self-start sm:self-center"
        >
          <div
            class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
          >
            <DiamondPlus name="heroicons:plus" class="w-5 h-5" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Rewind, DiamondPlus } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const groupID = route.query.groupID || ""; // Retrieve groupID from query parameters
const typeID = route.params.id;
const groupIDGroup = route.params.id;
const { api } = useApi();
const CategoryData = ref([]);
const GroupData = ref([]);
const OtherGroupData = ref([])

const breadcrumbs = ref([
  { text: "จัดการหมวดหมู่", link: "/category" },
  { text: "", link: "" }, // Placeholder for dynamic group name and link
  { text: "", link: "" }, // Hardcoded for type name, replace with dynamic if needed
]);

const breadcrumbsForGroup = ref([
  { text: "จัดการหมวดหมู่", link: "/category" },
  { text: "", link: "" },
]);

const fetchCategory = async () => {
  try {
    const response = await api.get(`/category/${groupID}`);
    CategoryData.value = response.data;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching group data:", error);
    }

  }
};


const fetchGroup = async () => {
  try {
    const response = await api.get(`/account_group_get/${typeID}`);
    GroupData.value = response.data.account_group_by_id;
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

const fetchOtherGroup = async () => {
  try {
    const response = await api.get(`/category/${groupIDGroup}`);
    OtherGroupData.value = response.data;
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

onMounted(() => {
  fetchCategory();
  fetchGroup();
  fetchOtherGroup();
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
    breadcrumbs.value[2].link = `/type/${typeID}?groupID=${groupID}`
  }
});

watch(OtherGroupData, (newData) => {
  if (newData.length > 0) {
    breadcrumbsForGroup.value[1].text = newData[0].account_category_name;
    breadcrumbsForGroup.value[1].link = `/group/${groupIDGroup}`;
  }
});

const goback = () => {

  const path = "/category"
  if (route.path === path) {
    router.push("/home");
    return;
  }
  router.back();

};

</script>
