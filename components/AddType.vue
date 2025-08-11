<template>
  <div class="min-h-screen flex items-start justify-center ">
    <div class="w-full max-w-xs md:max-w-md lg:max-w-lg bg-white rounded-xl h-full p-2">
      <!-- Header -->
      <div class="flex items-center space-x-2 mb-4">
        <div class="">
          <TypeGetName class="text-xl md:text-2xl  font-semibold text-sky-600" />
        </div>
      </div>

      <form @submit.prevent="submitForm" class="space-y-3 h-full">
        <!-- Input Fields -->
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label for="typeName" class="block text-sm font-medium text-gray-700">
              ชื่อประเภท
            </label>
            <input type="text" id="typeName" placeholder="กรุณากรอกชื่อประเภท" v-model="formData.account_type_name"
              class="w-full px-2 py-1 md:px-3 md:py-2 border-b border-sky-400 focus:border-sky-500 focus:outline-none   transition-colors" />
            <label for="amount" class="block text-sm font-medium text-gray-700">
              จำนวนเงิน
            </label>
            <input type="text" id="amount" placeholder="กรุณากรอกจำนวนเงิน" v-model="formattedValue"
              class="w-full px-2 py-1 md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none " />
            <label for="description" class="block text-sm font-medium text-gray-700">
              คำอธิบาย
            </label>
            <input type="text" id="description" placeholder="กรุณากรอกคำอธิบาย"
              v-model="formData.account_type_description"
              class="w-full px-2 py-1 md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none " />
          </div>
        </div>

        <!-- Type Selection -->
        <div class="">
          <label class="block text-sm font-medium text-gray-700">เลือกประเภท</label>
          <div class="flex gap-2 overflow-x-auto p-1 rounded-xl">
            <button v-for="type in typeData" :key="type.account_type_id" @click.prevent="toggleSelect(type)" :class="[
              'px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm rounded-lg whitespace-nowrap transition-colors ',
              selected?.account_type_id === type.account_type_id
                ? 'border border-sky-400 bg-sky-600 text-white'
                : 'bg-white border border-gray-200 hover:bg-gray-50',
            ]">
              {{ type.account_type_name }}
            </button>
          </div>
        </div>

        <!-- Icon Selection -->
        <div class="">
          <label class="block text-sm font-medium text-gray-700">เลือกไอคอน</label>
          <div class="overflow-x-auto">
            <div class="grid grid-column-3 auto-cols-max grid-flow-col gap-3 p-1 bg-gray-50 rounded-xl w-max">
              <button v-for="icon in icons" :key="icon.account_icon_id" @click.prevent="toggleSelectIcon(icon)" :class="[
                'w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 relative p-2 rounded-xl aspect-square transition-all hover:scale-105',
                selectedIcon?.account_icon_id === icon.account_icon_id
                  ? 'bg-sky-600 '
                  : 'border border-gray-200',
              ]">
                <img :src="`/icon_folder/${icon.account_icon_name}`" :alt="icon.account_icon_name"
                  class="w-full h-full object-cover rounded-lg" />
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit"
          class="w-full bg-sky-600 text-white py-2 rounded-lg font-medium hover:bg-sky-500 hover:transition-colors hover:transform  hover:duration-200 ">
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
import { useAlert } from "~/composables/showAlert";

// resigter state
const { showAlert } = useAlert();
const router = useRouter();
const route = useRoute();
const groupID = route.params.id;
const categoryID = route.query.groupID;
const { api } = useApi();

const icons = ref(); //เก็บข้อมูลไอคอน
const fetchIcon = async () => {
  //นำข้อมูลไอคอนมา
  try {
    const response = await api.get(`/get_icons/${categoryID}`);
    icons.value = response.data.data;
  } catch (error) {
    
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
    const response = await api.get(`/account_type_get`);
    typeData.value = response.data.account_type;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching icons:", error);
    }
  }
};

const goBack = () => {
  //ปุ่มย้อนกลับ
  router.back();
};

const submitForm = async () => {
  try {
    const result = await api.post("/account_type_create", {
      account_type_name: formData.value.account_type_name,
      account_type_value: formData.value.account_type_value,
      account_type_description: formData.value.account_type_description,
      account_type_from_id: formData.value.account_type_from_id,
      account_type_icon: formData.value.account_type_icon,
      account_group_id: formData.value.account_group_id,
      account_category_id: formData.value.account_category_id,
    });

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
    showAlert(`เพิ่มเรียบร้อยแล้ว`, "ท่านสามารถเช็คได้โดยการกดกลัยบไปที่หน้าหมวดหมู่", `success`);
    fetchType();
  } catch (error) {
    console.error("Error creating account group:");
  }
};

const TypeData = ref([]);
const fetchType = async () => {
  try {
    const response = await api.get(`/account_type_get/${groupID}`);
    TypeData.value = response.data.account_type;
  } catch (error) {
    console.error("Error fetching group data:");
  }
};

onMounted(async () => {
  fetchType();
  fetchTypeData();
  fetchIcon();
});
</script>
