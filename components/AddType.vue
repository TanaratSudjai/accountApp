<template>
  <div class="h-screen flex items-start mt-10 justify-center px-4">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <button
          @click="goBack"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Rewind name="heroicons:arrow-left" class="w-6 h-6 text-gray-600" />
        </button>
        <div class="ml-4">
          <TypeGetName class="text-xl font-semibold text-gray-800" />
        </div>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Input Fields -->
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label
              for="typeName"
              class="block text-sm font-medium text-gray-700"
            >
              ชื่อประเภท
            </label>
            <input
              type="text"
              id="typeName"
              placeholder="กรุณากรอกชื่อประเภท"
              v-model="formData.account_type_name"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <label for="amount" class="block text-sm font-medium text-gray-700">
              จำนวนเงิน
            </label>
            <input
              type="text"
              id="amount"
              placeholder="กรุณากรอกจำนวนเงิน"
              v-model="formattedValue"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
            >
              คำอธิบาย
            </label>
            <input
              type="text"
              id="description"
              placeholder="กรุณากรอกคำอธิบาย"
              v-model="formData.account_type_description"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <!-- Type Selection -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700"
            >เลือกประเภท</label
          >
          <div class="flex gap-2 overflow-x-auto p-4 bg-gray-50 rounded-xl">
            <button
              v-for="type in typeData"
              :key="type.account_type_id"
              @click.prevent="toggleSelect(type)"
              :class="[
                'px-4 py-2 rounded-lg whitespace-nowrap transition-colors ',
                selected?.account_type_id === type.account_type_id
                  ? 'border border-green-400 bg-green-500 text-white'
                  : 'bg-white border border-gray-200 hover:bg-gray-50',
              ]"
            >
              {{ type.account_type_name }}
            </button>
          </div>
        </div>

        <!-- Icon Selection -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700"
            >เลือกไอคอน</label
          >
          <div class="overflow-x-auto">
            <div
              class="grid grid-column-3 auto-cols-max grid-flow-col gap-3 p-4 bg-gray-50 rounded-xl w-max"
            >
              <button
                v-for="icon in icons"
                :key="icon.account_icon_id"
                @click.prevent="toggleSelectIcon(icon)"
                :class="[
                  'w-12 h-12 relative p-2 rounded-xl aspect-square transition-all hover:scale-105',
                  selectedIcon?.account_icon_id === icon.account_icon_id
                    ? 'bg-green-500 shadow-lg'
                    : 'bg-white border border-gray-200',
                ]"
              >
                <img
                  :src="`/icon_folder/${icon.account_icon_name}`"
                  :alt="icon.account_icon_name"
                  class="w-full h-full object-cover rounded-lg"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          เพิ่มประเภท
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Rewind, DiamondPlus } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const groupID = route.params.id;
const categoryID = route.query.groupID;
const { $axios } = useNuxtApp();

// const formFields = [
//   {
//     id: "typeName",
//     label: "ชื่อประเภท",
//     type: "text",
//     placeholder: "กรุณากรอกชื่อประเภท",
//     modelKey: "account_type_name",
//   },
//   {
//     id: "amount",
//     label: "จำนวนเงิน",
//     type: "text",
//     placeholder: "กรุณากรอกจำนวนเงิน",
//     modelKey: "account_type_value",
//   },
//   {
//     id: "description",
//     label: "คำอธิบาย",
//     type: "text",
//     placeholder: "กรุณากรอกคำอธิบาย",
//     modelKey: "account_type_description",
//   },
// ];

const icons = ref(); //เก็บข้อมูลไอคอน
const fetchIcon = async () => {
  //นำข้อมูลไอคอนมา
  try {
    const response = await $axios.get(`/get_icons/${categoryID}`);
    const data = await response.data;
    icons.value = data.data;
  } catch (error) {
    console.log("No data", error);
  }
};

const formData = ref({
  //ฟอร์มเตรียมส่ง
  account_type_name: "",
  account_type_value: "",
  account_type_description: "",
  account_type_from_id: null,
  account_type_icon: null,
  account_group_id: groupID,
  account_category_id: categoryID,
});
// formattedValue
const formattedValue = computed({
  get: () => {
    let value = formData.value.account_type_value || ""; // ตรวจสอบค่าให้แน่ใจว่าไม่เป็น null/undefined
    let numericValue = value.toString().replace(/,/g, "");
    return numericValue && !isNaN(numericValue)
      ? Number(numericValue).toLocaleString("en-US")
      : "";
  },
  set: (newValue) => {
    if (!newValue) {
      formData.value.account_type_value = ""; // ถ้าเป็นค่าว่างให้เก็บเป็น ""
      return;
    }

    let numericValue = newValue.toString().replace(/,/g, ""); // ตรวจสอบว่าเป็น string ก่อน replace
    formData.value.account_type_value = !isNaN(numericValue)
      ? numericValue
      : "";
  },
});
// -------------------------------------------------------------------------------------

const selected = ref(null); //เก็บ account_type_id
const toggleSelect = (type) => {
  //เลือกและยกเลืกการเลือก account_type_id
  selected.value =
    selected.value?.account_type_id === type.account_type_id ? null : type;
};

const selectedIcon = ref(null); //เก็บ account_icon_id
const toggleSelectIcon = (icon) => {
  //เลือกและยกเลืกการเลือก account_icon_id
  selectedIcon.value =
    selectedIcon.value?.account_icon_id === icon.account_icon_id ? null : icon;
};

watch(selected, (newVal) => {
  formData.value.account_type_from_id = newVal ? newVal.account_type_id : null;
});

// Watch `selectedIcon` and update formData.account_type_icon
watch(selectedIcon, (newVal) => {
  formData.value.account_type_icon = newVal ? newVal.account_icon_id : null;
});

const typeData = ref([]); //เก็บข้อมูล type ไว้ใช้ในการกำหนด account_type_from_id
const fetchTypeData = async () => {
  //นำข้อมูล account_type มา
  try {
    const response = await $axios.get(`/account_type_get`);
    const data = await response.data;
    typeData.value = data.account_type;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

const goBack = () => {
  //ปุ่มย้อนกลับ
  router.back();
};

const submitForm = async () => {
  try {
    const response = await $axios.post("/account_type_create", {
      account_type_name: formData.value.account_type_name,
      account_type_value: formData.value.account_type_value,
      account_type_description: formData.value.account_type_description,
      account_type_from_id: formData.value.account_type_from_id,
      account_type_icon: formData.value.account_type_icon,
      account_group_id: formData.value.account_group_id,
      account_category_id: formData.value.account_category_id,
    });

    const result = response.data;

    // Reset formData correctly
    formData.value = {
      account_type_name: "",
      account_type_value: "",
      account_type_description: "",
      account_type_from_id: null, // Use null instead of empty string
      account_type_icon: null,
      account_group_id: null,
      account_category_id: null,
    };

    selected.value = null;
    selectedIcon.value = null;
    fetchType();
  } catch (error) {
    console.log("Error creating account group:", error.response?.data || error);
  }
};

const TypeData = ref([]);
const fetchType = async () => {
  try {
    const response = await $axios.get(`/account_type_get/${groupID}`);
    const data = await response;
    TypeData.value = data.account_type;
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

onMounted(async () => {
  fetchType();
  fetchTypeData();
  fetchIcon();
});
</script>
