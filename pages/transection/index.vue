<template>
  <div class="mx-auto max-w-4xl rounded-lg min-h-screen">
    <div class="flex flex-col min-h-screen w-full">
      <!-- Header -->
      <div class="mb-2 bg-white p-5 rounded-lg text-center">
        <div class="font-medium">การตั้งค่าเปิดบัญชี</div>
      </div>

      <!-- Icon Selector -->
      <div class="bg-white rounded-lg shadow-md mb-2 p-5 flex flex-col gap-4">
        <div class="flex overflow-x-auto py-1 space-x-4 scrollbar-hide">
          <div
            v-for="icon in IconData"
            :key="icon.account_type_id"
            class="flex-shrink-0 flex flex-col items-center gap-2"
          >
            <div
              :class="[
                'rounded-full flex items-center justify-center w-16 h-16 cursor-pointer transition-all duration-300 transform hover:scale-105',
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
        <!-- Selected Icon Display -->
        <div class="p-4 pt-5 border border-cyan-600 rounded-lg">
          <h2 class="text-center text-lg font-semibold text-gray-700">
            {{ selectedIcon?.account_type_name || "กรุณาเลือกประเภทบัญชี" }}
          </h2>
        </div>
      </div>

      <!-- Input Section -->
      <div class="bg-white p-4 rounded-lg shadow-md mb-2">
        <div class="flex gap-3">
          <input
            type="text"
            placeholder="ตั้งจำนวนเงิน"
            class="flex-1 text-gray-800 text-sm border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            v-model="accountTypeValue"
          />
          <button
            @click="handleOkClick"
            :disabled="isButtonDisabled"
            :class="[
              'px-6 font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center',
              isButtonDisabled
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer',
            ]"
          >
            เพิ่ม
          </button>
        </div>
        <!-- Summary Section -->
        <div class="grid grid-cols-3 gap-3 mt-2">
          <!-- Sumone -->
          <div
            v-if="sumone.length === 0"
            class="p-3 rounded-xl border-l-4 border border-yellow-300 bg-yellow-50 font-semibold text-center"
          >
            0
          </div>
          <div
            v-for="sumone_s in sumone"
            :key="sumone_s.total_transition_value"
            class="p-3 rounded-xl border-l-4 border border-yellow-300 bg-yellow-50 font-semibold text-center"
          >
            {{ sumone_s.total_transition_value ?? 0 }}
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
            {{ sumtwo_s.total_transition_value ?? 0 }}
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
            {{ difference ?? 0 }}
          </div>
        </div>
      </div>

      <!-- Transactions List -->
      <div
        class="bg-white min-h-[200px] rounded-xl shadow-md overflow-hidden mb-16"
      >
        <div class="text-center p-2 font-medium">รายการธุรกรรมการเปิดบัญชี</div>

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
                {{ group_one.account_transition_value }}
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
                {{ group_two.account_transition_value }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        class="fixed bottom-4 left-4 right-4 border border-cyan-900 bg-white hover:bg-white text-cyan-600 font-semibold py-4 rounded-xl shadow-lg transition-colors duration-300 sm:static sm:mb-8"
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
import { ref, onMounted, computed } from "vue";
const { $axios } = useNuxtApp();
const IconData = ref([]);
const transition = ref([]);
const selectedIcon = ref(null);
const groupOne = ref([]);
const groupTwo = ref([]);
const sumone = ref([]);
const sumtwo = ref([]);


const onSubmitTransition = async () => {
  try {
    const response = await $axios.put(`transitionsubmit`);

    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error fetching transition:", error.message);
  }
};
// -------------------------------------------------------------------------------------
const differences = computed(() => {
  return sumone.value.map((sumone_s, index) => {
    const sumtwo_s = sumtwo.value[index] || { total_transition_value: 0 };
    // Ensure values are parsed as floats
    const sumoneValue = parseFloat(sumone_s.total_transition_value);
    const sumtwoValue = parseFloat(sumtwo_s.total_transition_value);
    return sumoneValue - sumtwoValue;
  });
});

const router = useRouter();

const submitDifferences = async () => {
  try {
    const response = await $axios.post(
      `/sumbittrantision_suminsert`,
      {
          account_transition_value: differences.value,
      }
    );
    if (response.ok) {
      onSubmitTransition();
    }
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
    const response = await $axios.get(
      `/getSumGropOne`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    sumone.value = data;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};

const fetchsumtwo = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await $axios.get(
      `/getSumGropTwo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await $axios.post(
      `/transition`,
      {
          account_type_id: accountTypeId,
          account_transition_value: accountTypeValue,
          account_category_from_id: accountCategoryID,
      }
    );
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
  if (selectedIcon.value) {
    updateAccountTransition(
      selectedIcon.value.account_type_id,
      accountTypeValue.value,
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
  ]);
});
</script>
