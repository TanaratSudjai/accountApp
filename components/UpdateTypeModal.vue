<template>
  <div v-if="show" class="fixed inset-0 z-50">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

    <!-- Modal Container -->
    <div class="relative mt-12 flex items-center justify-center">
      <!-- Modal Content -->
      <div class="relative w-full max-w-xs md:max-w-md bg-white rounded-lg ">
        <!-- Header -->
        <div class="p-2 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div class="text-lg md:text-xl lg:text-2xl font-semibold text-sky-600">อัพเดตประเภท</div>
            <div class="cursor-pointer  hover:bg-gray-100 rounded-full transition-colors" @click="close">
              <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="p-6">
          <form @submit.prevent="updateAccountType">
            <!-- Input Fields -->
            <div class="space-y-2.5">
              <!-- Name Input -->
              <div>
                <div class="text-xs md:text-sm lg:text-md font-medium text-gray-700">
                  ชื่อประเภท
                </div>
                <div class="relative">
                  <input type="text" v-model="localAccountType.account_type_name"
                    class="w-full px- 0-1 md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none  "
                    required />
                </div>
              </div>

              <!-- Amount Input -->
              <div>
                <div class="text-xs md:text-sm lg:text-md font-medium text-gray-700">
                  จำนวนเงิน
                </div>
                <div class="relative">
                  <input type="text" v-model="localAccountType.account_type_value"
                    class="w-full px-0.5  md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none  " />
                </div>
              </div>

              <!-- Description Input -->
              <div>
                <div class="text-sm font-medium text-gray-700 ">
                  คำอธิบาย
                </div>
                <div class="relative">
                  <input type="text" v-model="localAccountType.account_type_description" placeholder="คำอธิบายเพิ่มเติม"
                    class="w-full px-0. 5 md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none " />
                </div>
              </div>

              <!-- Type Selection -->
              <div v-if="categoryID != 1 && categoryID != 7">
                <div class="text-sm font-medium text-gray-700 ">
                  เลือกประเภท
                </div>
                <div class="flex gap-2 overflow-x-auto ">
                  <div v-for="type in typeData" :key="type.account_type_id" @click="toggleSelect(type)" :class="[
                    'px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ',
                    selected &&
                      selected.account_type_id === type.account_type_id
                      ? 'bg-yellow-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]">
                    {{ type.account_type_name }}
                  </div>
                </div>
              </div>

              <!-- Icon Selection -->
              <div>
                <div class="text-sm font-medium text-gray-700 ">
                  เลือกไอคอน
                </div>
                <div class="relative">
                  <div class="overflow-x-auto">
                    <div
                      class="grid grid-rows-3 grid-column-3 auto-cols-max grid-flow-col gap-3 p-1 bg-gray-50 rounded-xl w-max">
                      <div v-for="icon in icons" :key="icon.account_icon_id" @click="toggleSelectIcon(icon)" :class="[
                        'w-12 h-12 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105',
                        selectedIcon?.account_icon_id === icon.account_icon_id
                          ? 'bg-sky-600 shadow-lg ring-2 ring-sky-300 ring-offset-2'
                          : 'bg-white hover:bg-gray-100 border border-gray-200',
                      ]">
                        <div class="p-2 h-full">
                          <img :src="`/icon_folder/${icon.account_icon_name}`" :alt="icon.account_icon_name"
                            class="w-full h-full object-cover rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex items-center justify-end gap-3 mt-3">
              <div
                class="px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm lg:text-md font-medium text-white bg-gray-500 border rounded-lg cursor-pointer hover:bg-gray-600 "
                @click="close">
                ยกเลิก
              </div>
              <div
                class="px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm lg:text-md font-medium text-white bg-sky-600 rounded-lg cursor-pointer hover:bg-sky-500 "
                @click="updateAccountType">
                ยืนยันการแก้ไข
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const categoryID = route.query.groupID;

const typeData = ref([]);
const { api } = useApi();

const fetchTypeData = async () => {
  try {
    const response = await api.get(`/account_type_get`);
    typeData.value = response.data.account_type;
  } catch (error) {
    console.log("Error fetching icons:", error);
  }
};

const icons = ref(); //เก็บข้อมูลไอคอน
const fetchIcon = async () => {
  //นำข้อมูลไอคอนมา
  try {
    const response = await api.get(`/get_icons/${categoryID}`);
    icons.value = response.data.data;
  } catch (error) {
    console.log("No data", error);
  }
};

const setAccountType = (name) => {
  localAccountType.value.account_type_name = name;
};

const props = defineProps({
  show: Boolean,
  accountType: Object,
  account_type_from_id: String, // Receive the account_type_from_id from the parent
});

const emit = defineEmits(["update", "close"]);

const localAccountType = ref({ ...props.accountType });

const selected = ref(localAccountType.account_type_from_id);
const toggleSelect = (type) => {
  if (
    selected.value &&
    selected.value.account_type_id === type.account_type_id
  ) {
    selected.value = null;
    localAccountType.value.account_type_from_id = "";
  } else {
    selected.value = type;
    localAccountType.value.account_type_from_id = type.account_type_id;
  }
};
watch(
  () => props.account_type_from_id,
  (newValue) => {
    localAccountType.value.account_type_from_id = newValue;
  }
);

watch(
  () => props.accountType,
  (newValue) => {
    localAccountType.value = { ...newValue };
  }
);

const selectedIcon = ref(localAccountType.value.account_type_icon); //เก็บ account_icon_id
const toggleSelectIcon = (icon) => {
  // If the currently selected icon is the same as the clicked one, deselect it
  if (
    selectedIcon.value &&
    selectedIcon.value.account_icon_id === icon.account_icon_id
  ) {
    selectedIcon.value = null;
  } else {
    selectedIcon.value = icon;
  }
};

watch(selectedIcon, (newVal) => {
  localAccountType.value.account_type_icon = newVal
    ? newVal.account_icon_id
    : null;
});

// formattedValue
watch(
  () => localAccountType.value.account_type_value, // ✅ ใช้ getter function
  (newValue, oldValue) => {
    if (!newValue) return; // ✅ ตรวจสอบค่า null หรือ undefined
    let numericValue = newValue.toString().replace(/,/g, ""); // ✅ แปลงเป็น string ก่อน
    if (!isNaN(numericValue) && numericValue !== "") {
      localAccountType.value.account_type_value =
        Number(numericValue).toLocaleString("en-US");
    }
  }
);
// -------------------------------------------------------------------------------------

const updateAccountType = async () => {
  const removeComma = (value) => {
    if (typeof value === "string") {
      return value.replace(/,/g, "");
    }
    return value;
  };

  try {
    await api.put(`/account_type_update/${localAccountType.value.account_type_id}`, {
      account_type_name: localAccountType.value.account_type_name,
      account_type_value: localAccountType.value.account_type_value?.replace(
        /,/g,
        ""
      ),
      account_type_from_id: parseInt(
        localAccountType.value.account_type_from_id
      ),
      account_type_description:
        localAccountType.value.account_type_description,
      account_type_icon: localAccountType.value.account_type_icon
        ? parseInt(localAccountType.value.account_type_icon)
        : null,
    });

    emit("update", {
      ...localAccountType.value,
      account_type_from_id: localAccountType.value.account_type_from_id, // Include updated account_type_from_id
    });
    selected.value = null;
    selectedIcon.value = null;
    close();
  } catch (error) {
    console.log("Error:", error);
  }
};

const close = () => {
  emit("close");
};

onMounted(async () => {
  fetchTypeData();
  fetchIcon();
});
</script>
