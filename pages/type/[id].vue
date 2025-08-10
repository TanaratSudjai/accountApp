<template>
  <BackComponents />
  <div
    v-if="!TypeData || TypeData.length === 0"
    class="flex flex-col items-center justify-center p-12 text-center mx-4 mt-6"
  >
    <div
      class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm"
    >
      <svg
        class="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        ></path>
      </svg>
    </div>
    <h3 class="text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 mb-3">
      ไม่มีประเภท
    </h3>
    <p class="text-gray-500 text-md md:text-lg lg:text-xl">
      เริ่มต้นด้วยการเพิ่มประเภทใหม่
    </p>
    <NuxtLink
      :to="`/type/addType/${typeID}?groupID=${groupIDforAdd}`"
      class="border-2 border-dashed border-sky-200 hover:border-sky-400 bg-white hover:bg-sky-50 rounded-2xl p-8 shadow-sm hover:shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 group"
    >
      <div
        class="rounded-full w-10 h-10 bg-sky-100 group-hover:bg-sky-200 flex justify-center items-center mb-4 shadow-sm transition-colors duration-300"
      >
        <Plus class="w-8 h-8 text-sky-600" />
      </div>
      <span class="text-sky-600 font-semibold text-lg">เพิ่มประเภทใหม่</span>
      <span class="text-gray-500 text-sm mt-1">คลิกเพื่อเริ่มต้น</span>
    </NuxtLink>
  </div>

  <div v-else class="flex w-full justify-center mt-3 px-4">
    <div class="w-full max-w-6xl">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-lg md:text-2xl lg:text-3xl font-bold text-sky-600 mb-2">
          รายการประเภท
        </h1>
        <p class="text-gray-600">จัดการและดูข้อมูลประเภทบัญชีของคุณ</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1">
        <div
          v-for="Type in TypeData"
          :key="Type.account_type_id"
          class="bg-white rounded-lg border border-gray-200 hover:border-sky-200 p-3 transition-all duration-300 hover:-translate-y-1 group"
        >
          <!-- Header with Icon and Title -->
          <div class="flex items-start mb-6">
            <div class="relative mr-4">
              <img
                :src="`/icon_folder/${Type.account_icon_name}`"
                alt="icon"
                class="w-10 h-10 rounded-2xl object-cover border-2 border-sky-100 shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <div
                class="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            <div class="flex-1">
              <h3
                class="text-md md:text-lg lg:text-xl font-bold text-sky-600 mb-1 group-hover:text-sky-700 transition-colors duration-300"
              >
                {{ Type.account_type_name }}
              </h3>
              <div
                class="flex items-center text-xs text-gray-500 bg-gray-50 rounded-full w-fit"
              >
                <svg
                  class="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  ></path>
                </svg>
                Code: {{ Type.account_type_id }}
              </div>
            </div>
          </div>

          <!-- Information Cards -->
          <div class="space-y-1">
            <!-- Value Card -->
            <div
              class="bg-gradient-to-r from-sky-50 to-sky-50 border border-sky-100 rounded-xl p-2"
            >
              <div class="flex justify-between items-center">
                <span
                  class="text-sky-700 font-semibold text-xs sm:text-md md:text-lg lg:text-xl"
                  >ค่าตั้งต้น</span
                >
                <span
                  class="font-bold text-xs sm:text-md md:text-lg lg:text-xl text-sky-800"
                >
                  {{ formatNumber(Type.account_type_value) }}
                </span>
              </div>
            </div>

            <!-- Description Card -->
            <div class="bg-gray-50 border border-gray-100 rounded-xl p-2">
              <div class="flex items-start">
                <svg
                  class="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <span
                    class="text-gray-600 font-medium text-xs sm:text-md md:text-lg lg:text-xl block"
                    >รายละเอียด</span
                  >
                  <span
                    class="text-gray-800 text-xs sm:text-md md:text-lg lg:text-xl"
                    >{{
                      Type.account_type_description || "ไม่มีรายละเอียด"
                    }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Type Card -->
            <div class="bg-blue-50 border border-blue-100 rounded-xl p-2">
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 text-blue-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <div>
                  <span
                    class="text-blue-600 font-medium text-xs sm:text-md md:text-lg lg:text-xl block"
                    >ประเภท</span
                  >
                  <span
                    class="text-blue-800 font-semibold text-xs sm:text-md md:text-lg lg:text-xl"
                    >{{ getAccountTypeName(Type.account_type_from_id) }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-1 mt-2 border-t border-gray-100">
            <button
              @click="deleteFormData(Type.account_type_id)"
              class="text-md md:text-lg lg:text-xl flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105 flex-1"
            >
              <Trash2 class="w-4 h-4 mr-2" />
              ลบ
            </button>
            <button
              @click="openUpdateModal(Type)"
              class="text-md md:text-lg lg:text-xl flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105 flex-1"
            >
              <Pencil class="w-4 h-4 mr-2" />
              แก้ไข
            </button>
          </div>

          <!-- Hover accent line -->
          <div
            class="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-sky-400 to-sky-600 group-hover:w-20 transform -translate-x-1/2 transition-all duration-300 rounded-t-full"
          ></div>
        </div>

        <NuxtLink
          :to="`/type/addType/${typeID}?groupID=${groupIDforAdd}`"
          class="border-2 border-dashed border-sky-200 hover:border-sky-400 bg-white hover:bg-sky-50 rounded-2xl p-8 shadow-sm hover:shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 h-full min-h-[240px] group"
        >
          <div
            class="rounded-full w-16 h-16 bg-sky-100 group-hover:bg-sky-200 flex justify-center items-center mb-4 shadow-sm transition-colors duration-300"
          >
            <Plus class="w-8 h-8 text-sky-600" />
          </div>
          <span
            class="text-sky-600 font-semibold text-xs sm:text-md md:text-lg lg:text-xl"
            >เพิ่มประเภทใหม่</span
          >
          <span
            class="text-gray-500 text-xs sm:text-md md:text-lg lg:text-xl mt-1"
            >คลิกเพื่อเริ่มต้น</span
          >
        </NuxtLink>
      </div>

      <!-- Modal Component -->
      <UpdateTypeModal
        :show="showUpdateModal"
        :accountType="selectedAccountType"
        :account_type_from_id="formData.account_type_from_id"
        @update="handleUpdate"
        @close="showUpdateModal = false"
      />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { Pencil, Trash2, Plus } from "lucide-vue-next";
import { useAlert } from "~/composables/showAlert";

// resigter state
const { confirmAlert } = useAlert();
const route = useRoute();
const groupID = route.params.id;
const { $api } = useApi();
const typeID = route.params.id;
const groupIDforAdd = route.query.groupID || "";
const { formatNumber } = useFormatNumber();

const getAccountTypeName = (id) => {
  const account = typeDataID.value.find((type) => type.account_type_id === id);
  return account ? account.account_type_name : "ยังไม่ได้เลือก";
};

const formData = ref({
  account_type_name: "",
  account_type_value: "",
  account_type_description: "",
  account_type_from_id: "",
  account_type_icon: "",
  account_group_id: groupID,
});

const typeDataID = ref([]);
const TypeData = ref([]);

const fetchType = async () => {
  try {
    const data = await $api(`/account_type_get/${groupID}`);
    TypeData.value = data.account_type;
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

const deleteFormData = async (account_type_id) => {
  try {
    const result = await confirmAlert(
      "ยืนยันการลบ",
      "คุณแน่ใจหรือไม่ว่าต้องการลบประเภทนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้"
    );

    console.log("Result:", result);

    if (result.isConfirmed) {
      await $api(`/account_type_del/${account_type_id}`, {
        method: "DELETE",
      });

      TypeData.value = TypeData.value.filter(
        (Type) => Type.account_type_id !== account_type_id
      );
      await fetchType();
    }
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};
const showUpdateModal = ref(false);
const selectedAccountType = ref({});

const openUpdateModal = (Type) => {
  selectedAccountType.value = { ...Type };
  showUpdateModal.value = true;
};

const handleUpdate = async (updatedData) => {
  TypeData.value = TypeData.value.map((Type) =>
    Type.account_type_id === updatedData.account_type_id ? updatedData : Type
  );
  formData.value.account_type_from_id = updatedData.account_type_from_id;
  await fetchType();
};

onMounted(async () => {
  await fetchType();
});
</script>
