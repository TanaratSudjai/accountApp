<template>
  <div class="pt-2 h-auto overflow-y-auto">
    <div
      v-if="!groupData || groupData.length === 0"
      class="text-center p-4 text-gray-600"
    >
      ไม่มีกลุ่ม
    </div>

    <div v-else>
      <div
        v-if="categoryID == 1"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="group in groupData"
          :key="group.account_group_id"
          class="border border-gray-200 rounded-xl bg-white/85 p-4 shadow-md"
        >
          <div class="font-semibold text-lg">
            รหัส:
            <span class="font-normal">{{ group.account_group_id }}</span>
          </div>
          <button @click="goToPath(group.account_group_id, categoryID)">
            <NuxtLink class="hover:underline text-black">
              ชื่อ:
              <span class="font-normal">{{ group.account_group_name }}</span>
            </NuxtLink>
          </button>
          <div class="mt-2">
            จำนวน:
            <span class="font-semibold">{{ group.type_count }}</span>
          </div>
          <div class="flex border mt-4 justify-between">
            <div>
              <button
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                @click="deleteFormData(group.account_group_id)"
              >
                ลบ
              </button>
              <button
                class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 ml-2"
                @click="openUpdateModal(group)"
              >
                แก้ไข
              </button>
            </div>
            <div class="flex gap-2">
              <Landmark
                @click="updateImportant(group.account_group_id)"
                :class="[
                  'w-8 h-8 cursor-pointer',
                  group.account_type_important === 1
                    ? 'text-green-500'
                    : 'text-gray-50',
                ]"
              />

              <Users
                @click="updateImportant(group.account_group_id)"
                :class="[
                  'w-8 h-8 cursor-pointer',
                  group.account_type_important === 1
                    ? 'text-green-500'
                    : 'text-gray-50',
                ]"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="group in groupData"
          :key="group.account_group_id"
          class="border border-gray-200 rounded-xl bg-white/85 p-4 shadow-md"
        >
          <div class="font-semibold text-lg">
            รหัส:
            <span class="font-normal">{{ group.account_group_id }}</span>
          </div>
          <button @click="goToPath(group.account_group_id, categoryID)">
            <NuxtLink class="hover:underline text-black">
              ชื่อ:
              <span class="font-normal">{{ group.account_group_name }}</span>
            </NuxtLink>
          </button>
          <div class="mt-2">
            จำนวน:
            <span class="font-semibold">{{ group.type_count }}</span>
          </div>
          <div class="mt-4">
            <button
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              @click="deleteFormData(group.account_group_id)"
            >
              ลบ
            </button>
            <button
              class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 ml-2"
              @click="openUpdateModal(group)"
            >
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UpdateGroupModal
    :show="showUpdateModal"
    :accountGroup="selectedAccountGroup"
    @update="handleUpdate"
    @close="showUpdateModal = false"
  />
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import {
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
const { $axios } = useNuxtApp();
const route = useRoute();
const categoryID = route.params.id;

const router = useRouter();
const groupData = ref([]);

const fetchGroup = async () => {
  try {
    const response = await $axios.get(`/account_group_counttype/${categoryID}`);
    groupData.value = response.data.count_type_at_group;
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

const updateImportant = async (account_group_id) => {
  const account = groupData.value.find(
    (group) => group.account_group_id === account_group_id
  );
  console.log(account);

  if (account.account_type_important === 0) {
    try {
      const response = await $axios.put(
        `/account_type_important_one_update/${account_group_id}`
      );
      if(response.status === 200 || response.status === 201){
        fetchGroup();
      }
    } catch (error) {
      console.log("error updating account important", error);
    }
  } else {
    try {
      const response = await $axios.put(
        `/account_type_important_zero_update/${account_group_id}`
      );
      if(response.status === 200 || response.status === 201){
        fetchGroup();
      }
    } catch (error) {
      console.log("error updating account important", error);
    }
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
    const response = await $axios.delete(
      `/account_group_del/${account_group_id}`
    );
    if (response.status === 200 || response.status === 201) {
      groupData.value = groupData.value.filter(
        (group) => group.account_group_id !== account_group_id
      );
      console.log("Group deleted successfully");
      fetchGroup();
    } else {
      console.log("Failed to delete group");
    }
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
  console.log("Account type updated successfully:", updatedData);
  fetchGroup();
};

const goToPath = (account_group_id, categoryID) => {
  router.push(`/type/${account_group_id}?groupID=${categoryID}`).then(() => {
    window.location.reload();
  });
};
</script>
