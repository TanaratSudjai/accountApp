<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click="closeModal"
  >
    <div class="min-h-screen px-4 text-center">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
        aria-hidden="true"
      />

      <!-- Modal -->
      <div
        class="inline-block w-full max-w-md p-3 my-4 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button
            @click="closeModal"
            class="p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
          >
            <Icon name="lucide:x" class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <!-- Transaction Details -->
        <div class="space-y-4 mb-6">
          <div class="bg-gray-50 p-4 rounded-lg space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">ชื่อรายการ</span>
              <span class="font-medium text-gray-900">{{
                account_type_name
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">ค่าเงินที่มีอยู่</span>
              <span class="font-medium text-gray-900"
                >฿ {{ formatNumber(computedAccountTypeTotal) }}</span
              >
            </div>
          </div>

          <!-- Category Selection -->
          <div class="space-y-2 mb-6">
            <label class="block text-sm font-medium text-gray-700">
              เลือกประเภท
            </label>
            <input
              type="hidden"
              v-model="updatedAccountTypeId"
              name="category"
              id="category"
            />
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="cat in categorys"
                :key="cat.account_type_id"
                @click="
                  selectCategory(cat);
                  getAccountTypeTotal(cat);
                "
                :class="[
                  'flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-gray-50',
                  updatedAccountTypeId === cat.account_type_id
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200',
                ]"
              >
                <img
                  :src="`/icon_folder/${cat.account_icon_name}`"
                  :alt="cat.account_icon_name"
                  class="w-8 h-8 object-cover rounded-lg"
                />
                <span
                  class="flex justify-between items-center text-sm font-medium text-gray-700"
                >
                  {{ cat.account_type_name }}
                  {{ formatNumber(cat.account_type_total) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Amount Input -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              กรอกจำนวนเงินที่ต้องการ:
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-500">฿</span>
              </div>
              <input
                v-model="updatedValue"
                type="number"
                class="block w-full pl-8 pr-4 py-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm transition-colors duration-200"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between space-x-3">
          <div>
            <span
              v-if="
                account_category_id === 5 && updatedValue > computedAccountTypeTotal
              "
              class="text-red-500 text-sm"
            >
              จำนวนเงินไม่พอ
            </span>
          </div>

          <div class="flex space-x-3">
            <button
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              ยกเลิก
            </button>
            <button
              v-if="account_category_id === 5"
              @click="updateValue"
              :class="{
                'bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200': true,
                'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50':
                  account_category_id === 5 && isSubmitDisabled,
                'bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500':
                  !isSubmitDisabled,
              }"
              :disabled="account_category_id === 5 && isSubmitDisabled"
            >
              ยืนยัน
            </button>
            <button
              v-if="account_category_id === 4"
              @click="updateValue"
              :class="{
                'bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200': true,
                'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50':
                  isSubmitDisabledIncome,
                'bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500':
                  !isSubmitDisabledIncome,
              }"
              :disabled="isSubmitDisabledIncome"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted } from "vue";
const categorys = ref([]);
const { $axios } = useNuxtApp();
const { formatNumber } = useFormatNumber();
// Fetch category data
const { data: category, error } = await useAsyncData(
  "fetch transitions",
  async () => {
    const result_category = await $axios.get("/get_type_from_id");
    categorys.value = result_category.data.result || [];
  }
);

const props = defineProps({
  show: Boolean,
  account_type_name: String,
  account_type_value: Number,
  account_type_id: Number,
  account_type_from_id: Number,
  account_category_id: Number,
});

const emits = defineEmits(["close", "update"]);

const updatedValue = ref(props.account_type_value);

const updatedAccountTypeId = ref(props.account_type_from_id);
const updatedAccountCategoryId = ref(null); // New ref to hold the selected account_category_id

// Function to select a category
const selectCategory = (cat) => {
  updatedAccountTypeId.value = cat.account_type_id; // Set the selected account type ID
  updatedAccountCategoryId.value = cat.account_category_id; // Set the selected account category ID
};

const AccountTypeTotal = ref(0);
const getAccountTypeTotal = (cat) => {
  AccountTypeTotal.value = parseFloat(cat.account_type_total) || 0; // Convert to number
};

const updateValue = () => {
  emits("update", {
    account_type_id: props.account_type_id,
    account_type_value: parseFloat(updatedValue.value.toString().replace(/,/g, "")),
    account_type_from_id: updatedAccountTypeId.value,
    account_category_id: props.account_category_id, // Include the selected account_category_id
  });
  closeModal();
};

const closeModal = async () => {
  emits("close");
};

const isSubmitDisabled = computed(() => {
  return (
    updatedValue.value < 0 ||
    updatedValue.value === 0 ||
    updatedValue.value === null ||
    updatedValue.value === undefined ||
    updatedValue.value === "" ||
    updatedAccountTypeId.value === null ||
    updatedValue.value > computedAccountTypeTotal.value // Disable if updatedValue is greater than AccountTypeTotal
  );
});
const isSubmitDisabledIncome = computed(() => {
  return (
    updatedValue.value < 0 ||
    updatedValue.value === 0 ||
    updatedValue.value === null ||
    updatedValue.value === undefined ||
    updatedValue.value === "" ||
    updatedAccountTypeId.value === null
  );
});

onMounted(() => {
});

// formattedValue updatedValue to 10,000 => 10,000.00 updatedValue input tag

// watch(updatedValue, (newCats) => {
//   const defaultCat = newCats.find(
//     (cat) => cat.account_type_id === props.account_type_from_id
//   );
//   if (defaultCat) {
//     AccountTypeTotal.value = parseFloat(defaultCat.account_type_total) || 0;
//     updatedAccountCategoryId.value = defaultCat.account_category_id;
//   }
//   // const numericValue = newValue.replace(/,/g, "");
//   // // Only update the internal value without formatting

//   // if (/^\d+(\.\d+)?$/.test(numericValue)) {
//   //   updatedValue.value = Number(numericValue).toLocaleString("en-US", {
//   //     minimumFractionDigits: 0,
//   //     maximumFractionDigits: 2,
//   //   });
//   // }
// });

const computedAccountTypeTotal = computed(() => {
  const selectedCat = categorys.value.find(
    (cat) => cat.account_type_id === updatedAccountTypeId.value
  );
  return parseFloat(selectedCat?.account_type_total) || 0;
});

</script>
