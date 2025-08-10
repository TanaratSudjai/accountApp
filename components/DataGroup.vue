<template>
  <div class="pt-6 bg-white h-auto overflow-y-auto text-gray-800 p-2 rounded-md">
    <div v-if="!groupData || groupData.length === 0" class="text-center p-12 text-gray-500 font-medium">
      <div class="mb-8">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
            </path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">ไม่มีกลุ่ม</h3>
        <p class="text-gray-500 text-sm">เริ่มต้นด้วยการสร้างกลุ่มแรกของคุณ</p>
      </div>

      <div @click="openAddModal"
        class="border-2 border-dashed border-emerald-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 rounded-2xl p-8 shadow-sm hover:shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 h-full min-h-[240px] group">
        <div
          class="rounded-full w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 flex justify-center items-center mb-4 shadow-sm transition-colors duration-300">
          <Plus class="w-8 h-8 text-emerald-600" />
        </div>
        <span class="text-emerald-600 font-semibold text-lg">เพิ่มกลุ่มใหม่</span>
        <span class="text-gray-500 text-sm mt-1">คลิกเพื่อเริ่มต้น</span>
      </div>
    </div>

    <div v-else>
      <div class="mb-6">
        <span class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>รายการกลุ่ม</span>
          <GetgroupName />
        </span>
        <p class="text-gray-600">จัดการและดูข้อมูลกลุ่มของคุณ</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1">
        <div v-for="group in groupData" :key="group.account_group_id"
          class="border border-gray-200 rounded-lg bg-white p-2 transition-all duration-300 hover:border-sky-200 group">
          <div @click="goToPath(group.account_group_id, categoryID)" class="cursor-pointer">
            <div class="flex items-start justify-between ">
              <div class="flex-1">
                <div class="flex items-center mb-2 space-x-2">
                  <div class="w-3 h-3 bg-sky-500 rounded-full "></div>
                  <span class="text-sky-600 text-sm font-medium uppercase tracking-wide">กลุ่ม</span>
                </div>

                <h3 class="font-bold text-gray-800 text-lg mb-1  transition-colors">
                  {{ group.account_group_name }}
                </h3>

                <div class="flex items-center text-gray-500 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
                    </path>
                  </svg>
                  ID: {{ group.account_group_id }}
                </div>
              </div>
            </div>

            <div class="bg-sky-50 rounded-lg p-1">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 text-sm font-medium">จำนวนรวม</span>
                <div class="flex items-center">
                  <span class="text-md md:text-lg font-bold text-sky-600">{{
                    group.type_count
                  }}</span>
                  <span class="text-gray-500 text-sm ml-1">รายการ</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <div class="flex space-x-2">
              <button
                class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-md transition-all duration-200 text-sm font-medium transform"
                @click="deleteFormData(group.account_group_id)">
                <svg class="w-2 h-2 md:w-3 md:h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
                ลบ
              </button>
              <button
                class="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-md transition-all duration-200 text-sm font-medium transform"
                @click="openUpdateModal(group)">
                <svg class="w-2 h-2 md:w-3 md:h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
                แก้ไข
              </button>
            </div>
            <div class="text-xs text-gray-400">
              <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div @click="openAddModal"
          class="border-2 border-dashed border-sky-200 hover:border-sky-400 bg-white hover:bg-sky-50 rounded-2xl  shadow-sm hover:shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 p-8 group">
          <div
            class="rounded-full w-10 h-10 bg-sky-100 group-hover:bg-sky-200 flex justify-center items-center mb-4 shadow-sm transition-colors duration-300">
            <Plus class="w-8 h-8 text-sky-600" />
          </div>
          <span class="text-sky-600 font-semibold text-lg mb-1">เพิ่มกลุ่มใหม่</span>
          <span class="text-gray-500 text-sm text-center">คลิกเพื่อสร้างกลุ่มใหม่</span>
        </div>
      </div>
    </div>
  </div>

  <UpdateGroupModal :show="showUpdateModal" :accountGroup="selectedAccountGroup" @update="handleUpdate"
    @close="showUpdateModal = false" />
  <AddGroupModal :show="showAddModal" :categoryID="categoryID" @submitted="fetchGroup" @close="showAddModal = false" />
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import AddGroupModal from "/components/modal/AddGroupModal.vue";
import {
  Plus,
  ArrowLeft,
  Key,
  Store,
  Book,
  Users,
  User,
  Clock,
  Building,
  FolderOpen,
  FilePlus,
  FileMinus,
  BarChart2,
  Landmark,
  HandCoins,
  ChartNoAxesCombined,
  Grid2x2Plus,
  ArrowUpFromLine,
} from "lucide-vue-next";

import { onMounted, onBeforeUnmount } from "vue";
const { $api } = useApi();
const route = useRoute();
const categoryID = route.params.id;

const router = useRouter();
const groupData = ref([]);
const showAddModal = ref(false);
const openAddModal = () => {
  showAddModal.value = true;
};

const fetchGroup = async () => {
  try {
    const response = await $api(`/account_group_counttype/${categoryID}`);
    groupData.value = response.count_type_at_group;
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};


defineExpose({ fetchGroup });

onMounted(() => {
  // setInterval(() => {
  //   fetchGroup();
  // }, 1000);
  // Set interval to fetch every 2 seconds
  // setInterval(fetchGroup, 1000);
  fetchGroup();
  // Clear the interval when the component is unmounted
  // onBeforeUnmount(() => {
  //   clearInterval(intervalId);
  // });
});

const deleteFormData = async (account_group_id) => {
  try {
    await $api(`/account_group_del/${account_group_id}`, {
      method: "DELETE",
    });
    groupData.value = groupData.value.filter(
      (group) => group.account_group_id !== account_group_id
    );
    fetchGroup();
  } catch (error) {
    console.log("Error deleting group:", error);
  }
};

const showUpdateModal = ref(false);
const selectedAccountGroup = ref({});

const openUpdateModal = (group) => {
  selectedAccountGroup.value = { ...group };
  showUpdateModal.value = true;
};

const handleUpdate = (updatedData) => {
  groupData.value = groupData.value.map((group) =>
    group.account_group_id === updatedData.account_group_id
      ? updatedData
      : group
  );
  fetchGroup();
};

const goToPath = (account_group_id, categoryID) => {
  router.push(`/type/${account_group_id}?groupID=${categoryID}`)
};
</script>
