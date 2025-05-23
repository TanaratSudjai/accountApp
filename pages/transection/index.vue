<template>
  <div class="mx-auto max-w-4xl rounded-lg min-h-screen">
    <div class="flex flex-col min-h-screen w-full mb-[150px]">
      <!-- Header -->
      <div class="mb-2 bg-gray-800 p-1 rounded-lg text-center">
        <div class="font-medium text-green-400">การตั้งค่าเปิดบัญชี</div>
      </div>
      <!-- ------------------------------------------------------------------------------------------------------------------------------ -->
      <!-- Icon Selector -->
      <div
        class="container rounded-lg mb-2 p-2 shadow-md flex flex-col bg-gray-800"
      >
        <p class="text-green-400 px-2 bg-gray-700 rounded-xl my-1">สินทรัพย์</p>
        <div class="flex flex-col overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div
              v-for="icon in IconData.filter(
                (i) => i.account_category_id === 1
              )"
              :key="icon.account_type_id"
            >
              <div
                v-if="icon.account_category_id === 1"
                :class="[
                  'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105',
                  selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                    ? 'bg-gray-400 ring-4 ring-gray-200'
                    : icon.account_category_id === 1
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : 'bg-gray-100',
                ]"
                @click="toggleSelect(icon)"
              >
                <img
                  :src="`/icon_folder/${icon.account_icon_name}`"
                  alt="icon"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Selector -->
        <p class="text-green-400 px-2 bg-gray-700 rounded-xl my-1">หนี้สิน</p>
        <div class="flex overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div
              v-for="icon in IconData.filter(
                (i) => i.account_category_id === 2
              )"
              :key="icon.account_type_id"
            >
              <div
                v-if="icon.account_category_id === 2"
                :class="[
                  'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105 ',
                  selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                    ? 'bg-gray-400 ring-4 ring-gray-200'
                    : icon.account_category_id === 1
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : icon.account_category_id === 2
                    ? 'bg-purple-500 ring-4 ring-purple-300'
                    : 'bg-gray-100',
                ]"
                @click="toggleSelect(icon)"
              >
                <img
                  :src="`/icon_folder/${icon.account_icon_name}`"
                  alt="icon"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Selector -->
        <p class="text-green-400 px-2 bg-gray-700 rounded-xl my-1">ลูกหนี้</p>
        <div class="flex overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div
              v-for="icon in IconData.filter(
                (i) => i.account_category_id === 6
              )"
              :key="icon.account_type_id"
            >
              <div
                v-if="icon.account_category_id === 6"
                :class="[
                  'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105 ',
                  selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                    ? 'bg-gray-400 ring-4 ring-gray-200'
                    : icon.account_category_id === 6
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : 'bg-gray-100',
                ]"
                @click="toggleSelect(icon)"
              >
                <img
                  :src="`/icon_folder/${icon.account_icon_name}`"
                  alt="icon"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Selector -->
        <p class="text-green-400 px-2 bg-gray-700 rounded-xl my-1">ธนาคาร</p>
        <div class="flex overflow-x-auto scrollbar-hide">
          <div class="container flex justify-start p-2 space-x-4">
            <div
              v-for="icon in IconData.filter(
                (i) => i.account_category_id === 7
              )"
              :key="icon.account_type_id"
            >
              <div
                v-if="icon.account_category_id === 7"
                :class="[
                  'rounded-full flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 transform hover:scale-105',
                  selectedIcon &&
                  selectedIcon.account_type_id === icon.account_type_id
                    ? 'bg-gray-400 ring-4 ring-gray-200'
                    : icon.account_category_id === 7
                    ? 'bg-yellow-500 ring-4 ring-yellow-300'
                    : 'bg-gray-100',
                ]"
                @click="toggleSelect(icon)"
              >
                <img
                  :src="`/icon_folder/${icon.account_icon_name}`"
                  alt="icon"
                  class="w-12 h-12 rounded-full object-cover"
                />
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
      <div class="bg-gray-800 p-2 rounded-lg shadow-md mb-2">
        <p
          class="text-gray-400 px-2 bg-gray-700 rounded-xl my-2 py-2 ring ring-gray-600"
        >
          ประเภทบัญชี :
          <span class="text-green-400 font-semibold">{{
            selectedIcon?.account_type_name || "กรุณาเลือกประเภทบัญชี"
          }}</span>
        </p>
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="ตั้งจำนวนเงิน"
            class="flex-1 gap-2 text-white bg-gray-700 border-none text-sm border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
            v-model="accountTypeValue"
          />
          <button
            @click="handleOkClick"
            :disabled="isButtonDisabled"
            :class="[
              'px-6 font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center bg-green-500',
              isButtonDisabled
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-800 text-white cursor-pointer',
            ]"
          >
            เพิ่ม
          </button>
        </div>
        <!-- Summary Section -->
        <div class="grid grid-cols-3 mt-2 gap-2">
          <!-- Sumone -->
          <div
            v-if="sumone.length === 0"
            class="p-3 rounded-xl border-l-4 border border-yellow-300 bg-yellow-50 font-semibold text-center"
          >
            0
          </div>
          <div
            v-for="sumone_s in sumone"
            :key="sumone_s.account_transition_id"
            class="p-3 rounded-xl border-l-4 border border-yellow-300 bg-yellow-50 font-semibold text-center"
          >
            {{
              Number(sum_cat_one_six_seven) +
              Number(sumone_s.total_transition_value)
            }}
          </div>

          <!-- Sumtwo -->
          <div
            v-if="sumtwo.length === 0"
            class="p-3 rounded-xl border-l-4 border border-purple-300 bg-purple-50 font-semibold text-center"
          >
            0
          </div>
          <div
            v-for="sumtwo_s in sumtwo"
            :key="sumtwo_s.total_transition_value"
            class="p-3 rounded-xl border-l-4 border border-purple-300 bg-purple-50 font-semibold text-center"
          >
            {{ Number(sum_cat_two) + Number(sumtwo_s.total_transition_value) }}
          </div>

          <!-- Differences -->
          <div
            v-if="sumtwo.length === 0 && sumone.length === 0"
            class="p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-center"
          >
            0
          </div>
          <div
            v-for="(difference, index) in differences"
            :key="index"
            class="p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-center"
          >
            {{ Number(difference) }}
          </div>
        </div>
      </div>

      <!-- Transactions List -->
      <div
        class="bg-gray-800 min-h-[200px] rounded-xl shadow-md overflow-hidden mb-2"
      >
        <div class="text-center p-2 font-medium text-green-400">
          รายการธุรกรรมการเปิดบัญชี
        </div>

        <!-- Group One -->
        <div class="p-4">
          <div class="space-y-3">
            <div
              v-for="group_one in groupOne"
              :key="group_one.account_transition_id"
              class="flex justify-between p-4 border-l-4 border border-yellow-300 rounded-xl bg-yellow-50 hover:shadow-md transition-shadow"
            >
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
            <div
              v-for="group_two in groupTwo"
              :key="group_two.account_transition_id"
              class="flex justify-between p-4 border-l-4 border border-purple-300 rounded-xl bg-purple-50 hover:shadow-md transition-shadow"
            >
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
        class="fixed bottom-4 left-4 right-4 border mb-20 border-green-400 bg-gray-700 hover:bg-gray-500 hover:text-black hover:border-black text-green-400 font-semibold py-4 rounded-xl shadow-lg transition-colors duration-300 sm:static sm:mb-8"
        @click="submitDifferences()"
      >
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
    console.log("Success:", data);
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
    onSubmitTransition();

    await $axios.post(`/sumbittrantision_suminsert`, {
      account_transition_value: differences.value,
    });

    await fetchTransition();
    groupOneTransition();
    groupTwoTransition();
    fetchsumone();
    fetchsumtwo();
    router.push({ path: "/" });
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};
// -------------------------------------------------------------------------------------

const fetchsumone = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/getSumGropOne`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    sumone.value = data;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};

const fetchfund = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/total_fund`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data; // No need to await .data
    sum_cat_one_six_seven.value =
      data.get_sum_cat_one_six_seven[0]?.total_owner ?? "0.00";
    sum_cat_two.value = data.get_sum_cat_two[0]?.total_debt ?? "0.00";
    sum_cat_three.value = data.get_sum_cat_three[0]?.total_fund ?? "0.00";

    console.log("1,6,7", sum_cat_one_six_seven.value);
    console.log("2", sum_cat_two.value);
    console.log("3", sum_cat_three.value);
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};

const fetchsumtwo = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/getSumGropTwo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    // console.log("data sum group two", data);
    sumtwo.value = data;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};

const fetchTransition = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/transitions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data.res_transition;
    // console.log("transition of user session : ", data);
    transition.value = data.res_transition;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};

const groupOneTransition = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/getGropOne`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    groupOne.value = data;
  } catch (error) {
    console.error("Error fetching transition group One:", error);
  }
};

const groupTwoTransition = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/getGropTwo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    groupTwo.value = data;
  } catch (error) {
    console.error("Error fetching transition group Two:", error);
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
watch(accountTypeValue, (newValue, oldValue) => {
  let numericValue = newValue.replace(/,/g, ""); // เอาคอมม่าออกก่อน
  if (!isNaN(numericValue) && numericValue !== "") {
    accountTypeValue.value = Number(numericValue).toLocaleString("en-US");
  }
});
// -------------------------------------------------------------------------------------

const fetchIcon = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(`/menu_icon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data.data_menu;
    IconData.value = data;
    console.log(IconData.value);
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

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
  console.log(accountTypeValue.value);
  console.log(sumoneForCategory2.value);
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
  console.log(accountTypeId);
  console.log(accountTypeValue);
  console.log(accountCategoryID);
  try {
    const response = await $axios.post(`/transition`, {
      account_type_id: accountTypeId,
      account_transition_value: accountTypeValue,
      account_category_from_id: accountCategoryID,
    });
    if (!response.status === 200 || !response.status === 201) {
      throw new Error("Network response was not ok");
    }
    fetchTransition(), groupOneTransition();
    groupTwoTransition();
    fetchsumone();
    fetchsumtwo();
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
    fetchIcon(),
    fetchTransition(),
    groupOneTransition(),
    groupTwoTransition(),
    fetchsumone(),
    fetchsumtwo(),
    fetchfund(),
  ]);
});
</script>
