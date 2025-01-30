<template>
  <div class="pt-2 h-auto overflow-y-auto">
    <div
      v-if="!groupData || groupData.length === 0"
      class="text-center p-4 text-gray-600"
    >
      ไม่มีกลุ่ม
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <NuxtLink
              class="hover:underline text-black"
            >
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
import { useRouter } from 'vue-router';

import { onMounted, onBeforeUnmount } from "vue";
const { $axios } = useNuxtApp();
const route = useRoute();
const categoryID = route.params.id;

const router = useRouter();
const groupData = ref([]);

const fetchGroup = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }
    const response = await $axios.get(
      `/account_group_counttype/${categoryID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    groupData.value = response.data.count_type_at_group;
    console.log(groupData.value);
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

onMounted(() => {
  // Set interval to fetch every 2 seconds
  // setInterval(fetchGroup, 1000);
  fetchGroup();
  // Clear the interval when the component is unmounted
  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
});

const deleteFormData = async (account_group_id) => {
  console.log(account_group_id);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }
    const response = await $axios.delete(
      `/account_group_del/${account_group_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      groupData.value = groupData.value.filter(
        (group) => group.account_group_id !== account_group_id
      );
      console.log("Group deleted successfully");
      fetchGroup();
    } else {
      console.error("Failed to delete group");
    }
  } catch (error) {
    console.error("Error deleting group:", error);
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

const goToPath = (account_group_id,categoryID) => {
  router.push(`/type/${account_group_id}?groupID=${categoryID}`)
    .then(() => {
      window.location.reload();
    });
}
</script>
