<template>
  <BackComponents />
  <div class="container mx-auto max-w-3xl   rounded-lg min-h-screen">
    <div class="flex flex-col items-center w-full min-h-screen w-full mb-[150px]">
      <!-- Header -->
      <div class="mb-2  p-1  text-center border-b border-gray-200  w-full">
        <div class="font-medium text-sky-600">การตั้งค่าเปิดบัญชี</div>
      </div>
      <!-- ------------------------------------------------------------------------------------------------------------------------------ -->
      <!-- Icon Selector -->
      <div class="container mx-auto mb-2 p-2  flex flex-col border border-gray-200 rounded-lg ">
        <p class="text-sky-600 px-2  border-b border-gray-200  my-1">สินทรัพย์</p>
        <div class="flex flex-col overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div v-for="icon in IconData.filter(
              (i) => i.account_category_id === 1
            )" :key="icon.account_type_id">
              <div v-if="icon.account_category_id === 1" :class="[
                'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105',
                selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                  ? 'bg-gray-400 ring-4 ring-gray-200'
                  : icon.account_category_id === 1
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : 'bg-gray-100',
              ]" @click="toggleSelect(icon)">
                <img :src="`/icon_folder/${icon.account_icon_name}`" alt="icon"
                  class="w-12 h-12 rounded-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Selector -->
        <p class="text-sky-600 px-2 border-b border-gray-200 my-1">หนี้สิน</p>
        <div class="flex overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div v-for="icon in IconData.filter(
              (i) => i.account_category_id === 2
            )" :key="icon.account_type_id">
              <div v-if="icon.account_category_id === 2" :class="[
                'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105 ',
                selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                  ? 'bg-gray-400 ring-4 ring-gray-200'
                  : icon.account_category_id === 1
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : icon.account_category_id === 2
                      ? 'bg-purple-500 ring-4 ring-purple-300'
                      : 'bg-gray-100',
              ]" @click="toggleSelect(icon)">
                <img :src="`/icon_folder/${icon.account_icon_name}`" alt="icon"
                  class="w-12 h-12 rounded-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Selector -->
        <p class="text-sky-600 px-2  border-b border-gray-200  my-1">ลูกหนี้</p>
        <div class="flex overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div v-for="icon in IconData.filter(
              (i) => i.account_category_id === 6
            )" :key="icon.account_type_id">
              <div v-if="icon.account_category_id === 6" :class="[
                'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105 ',
                selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                  ? 'bg-gray-400 ring-4 ring-gray-200'
                  : icon.account_category_id === 6
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : 'bg-gray-100',
              ]" @click="toggleSelect(icon)">
                <img :src="`/icon_folder/${icon.account_icon_name}`" alt="icon"
                  class="w-12 h-12 rounded-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Selector -->
        <p class="text-sky-600 px-2  border-b border-gray-200  my-1">ธนาคาร</p>
        <div class="flex overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div v-for="icon in IconData.filter(
              (i) => i.account_category_id === 7
            )" :key="icon.account_type_id">
              <div v-if="icon.account_category_id === 7" :class="[
                'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105',
                selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                  ? 'bg-gray-400 ring-4 ring-gray-200'
                  : icon.account_category_id === 7
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : 'bg-gray-100',
              ]" @click="toggleSelect(icon)">
                <img :src="`/icon_folder/${icon.account_icon_name}`" alt="icon"
                  class="w-12 h-12 rounded-full object-cover" />
              </div>
            </div>
          </div>
        </div>
        <!-- ------------------------------------------------------------------------------------------------------------------------------ -->

        <!-- Selected Icon Display -->
        <!-- <div class="p-4 pt-5 border border-cyan-600 rounded-lg">
          <h2 class="text-center text-lg font-semibold text-gray-700">
            {{ selectedIcon?.account_type_name || "กรุณาเลือกประเภทบัญชี" }}
          </h2>
        </div> -->
      </div>

      <!-- Input Section -->
      <div class="bg-white p-2  mb-2 w-full">
        <p class="text-gray-400 px-2  rounded-md my-2 py-2">
          ประเภทบัญชี :
          <span class="text-sky-600 font-semibold">{{
            selectedIcon?.account_type_name || "กรุณาเลือกประเภทบัญชี"
          }}</span>
        </p>
        <div class="flex gap-2">
          <input type="text" placeholder="ตั้งจำนวนเงิน"
            class="flex-1 gap-2 text-black  text-sm border border-gray-200 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            v-model="accountTypeValue" />
          <button @click="handleOkClick" :disabled="isButtonDisabled" :class="[
            'px-6 font-semibold rounded-md transition-colors duration-300 flex items-center justify-center bg-sky-500',
            isButtonDisabled
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-sky-500 hover:bg-sky-800 text-white cursor-pointer',
          ]">
            เพิ่ม
          </button>
        </div>
        <!-- Summary Section -->
        <div class="grid grid-cols-3 mt-2 gap-2 w-full">
          <!-- Sumone -->
          <div v-if="sumone.length === 0"
            class="p-3 rounded-md border-l-4 border border-yellow-300 bg-yellow-50 font-semibold text-center">
            0
          </div>
          <div v-for="sumone_s in sumone" :key="sumone_s.account_transition_id"
            class="p-3 rounded-md border-l-4 border border-yellow-300 bg-yellow-50 font-semibold text-center">
            {{ formatNumber(Number(sum_cat_one_six_seven) + Number(sumone_s.total_transition_value)) }}
          </div>

          <!-- Sumtwo -->
          <div v-if="sumtwo.length === 0"
            class="p-3 rounded-md border-l-4 border border-purple-300 bg-purple-50 font-semibold text-center">
            0
          </div>
          <div v-for="sumtwo_s in sumtwo" :key="sumtwo_s.total_transition_id"
            class="p-3 rounded-md border-l-4 border border-purple-300 bg-purple-50 font-semibold text-center">
            {{ formatNumber(Number(sum_cat_two) + Number(sumtwo_s.total_transition_value)) }}
          </div>

          <!-- Differences -->
          <div v-if="sumtwo.length === 0 && sumone.length === 0"
            class="p-3 rounded-md border border-gray-200 bg-gray-50 font-semibold text-center">
            0
          </div>
          <div v-for="(difference, index) in differences" :key="index"
            class="p-3 rounded-md border border-gray-200 bg-gray-50 font-semibold text-center">
            {{ formatNumber(Number(difference)) }}
          </div>
        </div>
      </div>

      <!-- Transactions List -->
      <div class="bg-white min-h-[200px] border rounded-lg border-gray-200 overflow-hidden mb-2 w-full">
        <div class="text-center p-2 font-medium text-sky-600">
          รายการธุรกรรมการเปิดบัญชี
        </div>

        <!-- Group One -->
        <div class="p-4">
          <div class="space-y-3">
            <div v-for="group_one in groupOne" :key="group_one.account_transition_id"
              class="flex justify-between p-4 border-l-4 border border-yellow-300 rounded-md bg-yellow-50 hover:shadow-md transition-shadow">
              <span class="font-semibold text-gray-800">
                {{ group_one.account_type_name }}
              </span>
              <span class="font-bold text-yellow-700">
                {{ formatNumber(group_one.account_transition_value) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Group Two -->
        <div class="p-4">
          <div class="space-y-3">
            <div v-for="group_two in groupTwo" :key="group_two.account_transition_id"
              class="flex justify-between p-4 border-l-4 border border-purple-300 rounded-md bg-purple-50 hover:shadow-md transition-shadow">
              <span class="font-semibold text-gray-800">
                {{ group_two.account_type_name }}
              </span>
              <span class="font-bold text-purple-700">
                {{ formatNumber(group_two.account_transition_value) }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- Submit Button -->
      <button
        class="bg-sky-500 text-white bottom-4 w-full left-4 right-4 mb-20 shadow-md  bg-gray-200 text-black font-semibold py-4 rounded-md shadow-lg transition-colors duration-300 sm:static sm:mb-8"
        @click="submitDifferences()">
        ยืนยันการเปิดบัญชี
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: auto;
  scrollbar-width: thin;
}

.scrollbar-hide::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.scrollbar-hide::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollbar-hide::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.scrollbar-hide::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
const { $axios } = useNuxtApp();
const IconData = ref([]);
const transition = ref([]);
const selectedIcon = ref(null);
const groupOne = ref([]);
const groupTwo = ref([]);
const sumone = ref([]);
const sumtwo = ref([]);
const sum_cat_one_six_seven = ref([]);
const sum_cat_two = ref([]);
const sum_cat_three = ref([]);

const { formatNumber } = useFormatNumber();

const onSubmitTransition = async () => {
  try {
    const response = await $axios.put(`/transitionsubmit`);

    const data = await response.data;
  } catch (error) {
    // console.error("Error fetching transition:", error.message);
    throw error;
  }
};
// -------------------------------------------------------------------------------------
const differences = computed(() => {
  return sumone.value.map((sumone_s, index) => {
    const sumtwo_s = sumtwo.value[index] || { total_transition_value: 0 };

    const sumoneValue = parseFloat(sumone_s.total_transition_value || 0) +
      parseFloat(sum_cat_one_six_seven.value || 0);
    const sumtwoValue = parseFloat(sumtwo_s.total_transition_value || 0) +
      parseFloat(sum_cat_two.value || 0);
    const sumthreeValue = parseFloat(sum_cat_three.value || 0);

    return sumoneValue - sumtwoValue;
  });
});

const router = useRouter();

const submitDifferences = async () => {
  try {
    await $axios.post(`/sumbittrantision_suminsert`, {
      account_transition_value: differences.value,
    });
    await onSubmitTransition();
    await fetchTransition();
    await fetchDataTransitionOpen();
    router.push({ path: "/" });
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};
// -------------------------------------------------------------------------------------

const fetchDataTransitionOpen = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/transition-summary`);
    const data = response.data.data;

    // Set all data from single API response
    groupOne.value = data.groupOneTransitions;
    groupTwo.value = data.groupTwoTransitions;
    sumone.value = [{ total_transition_value: data.sumGroupOne }];
    sumtwo.value = [{ total_transition_value: data.sumGroupTwo }];
    IconData.value = data.menuData;

    // Set fund summary data
    sum_cat_one_six_seven.value = data.threeTypeSummary.total_owner;
    sum_cat_two.value = data.threeTypeSummary.total_debt;
    sum_cat_three.value = data.threeTypeSummary.total_fund;

  } catch (error) {
    console.error("Error fetching transition data:", error);
  }
};


const fetchTransition = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/transitions`);
    const data = await response.data.data;
    transition.value = data.data;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};


const accountTypeValue = computed({
  get() {
    return selectedIcon.value ? selectedIcon.value.account_type_value : "";
  },
  set(value) {
    if (selectedIcon.value) {
      selectedIcon.value.account_type_value = value;
    }
  },
});

// formattedValue
watch(accountTypeValue, (newValue) => {
  const numericValue = newValue.replace(/,/g, "");

  // เฉพาะกรณีที่ค่าพิมพ์สมบูรณ์เท่านั้น ค่อย format
  if (/^\d+(\.\d+)?$/.test(numericValue)) {
    accountTypeValue.value = Number(numericValue).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
});

// -------------------------------------------------------------------------------------



const toggleSelect = (icon) => {
  if (
    selectedIcon.value &&
    selectedIcon.value.account_type_id === icon.account_type_id
  ) {
    selectedIcon.value = null;
  } else {
    selectedIcon.value = icon;
  }
};

const sumoneForCategory2 = computed(() => {
  const item = sumone.value.find((item) => item.account_category_id === 1);
  return item ? parseFloat(item.total_transition_value) : 0;
});

const isButtonDisabled = computed(() => {
  const value = parseFloat(accountTypeValue.value) || 0;
  return (
    selectedIcon.value &&
    selectedIcon.value.account_category_id === 2 &&
    value > differences.value
  );
});

const updateAccountTransition = async (
  accountTypeId,
  accountTypeValue,
  accountCategoryID
) => {
  try {
    const response = await $axios.post(`/transition`, {
      account_type_id: accountTypeId,
      account_transition_value: accountTypeValue,
      account_category_from_id: accountCategoryID,
    });
    if (!response.status === 200 || !response.status === 201) {
      throw new Error("Network response was not ok");
    }
    await fetchTransition();
    await fetchDataTransitionOpen();
  } catch (error) {
    console.log("Error updating account transition:", error);
  }
};

const handleOkClick = () => {
  // เอาคอมม่าออก ก่อนส่งไป db
  let rawValue = accountTypeValue.value.replace(/,/g, "");
  if (selectedIcon.value) {
    updateAccountTransition(
      selectedIcon.value.account_type_id,
      rawValue,
      selectedIcon.value.account_category_id
    );
    accountTypeValue.value = "";
  } else {
    console.warn("No icon selected");
  }
};

onMounted(async () => {
  await Promise.all([
    fetchDataTransitionOpen(),
    fetchTransition(),
  ]);
});
</script>
