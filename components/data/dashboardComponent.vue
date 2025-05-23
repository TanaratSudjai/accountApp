<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900">ตรวจสอบความถูกต้อง</h1>
        <div class="mt-2 h-1 w-24 bg-indigo-600 mx-auto rounded-full"></div>
        <p class="mt-3 text-gray-600">รายงานสรุปทางการเงิน</p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Income & Expense Card -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 class="text-xl font-semibold text-white">รายรับ รายจ่าย</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">ประเภท</th>
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">รายรับ</th>
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">รายจ่าย</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="transition in transition_data.filter(
                    (i) => i.account_category_id === 4 || i.account_category_id === 5
                  )"
                  :key="transition.account_type_id"
                  class="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td class="px-6 py-4 text-sm text-gray-900">
                    <div class="flex items-center justify-start space-x-2">
                      <div 
                        class="w-3 h-3 rounded-full" 
                        :class="transition.account_category_id === 4 ? 'bg-green-500' : 'bg-red-500'"
                      ></div>
                      <span>{{ transition.account_type_name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div 
                      v-if="transition.account_category_id === 4"
                      :class="[
                        'flex justify-center items-center px-4 py-2 rounded-full text-sm font-medium',
                        parseInt(transition.account_type_total)  < parseInt(transition.account_type_sum) 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800',
                      ]"
                    >
                      {{ transition.account_type_difference }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div 
                      v-if="transition.account_category_id === 5"
                      :class="[
                        'flex justify-center items-center px-4 py-2 rounded-full text-sm font-medium',
                        parseInt(transition.account_type_total) > parseInt(transition.account_type_sum) 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800',
                      ]"
                    >
                      {{ transition.account_type_difference }}
                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Borrowing & Lending Card -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-4">
            <h2 class="text-xl font-semibold text-white">ยืมมา คืนไป / ให้ยืม ได้คืน</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">ประเภท</th>
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">ยืมมา / ให้ยืม</th>
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">คืนไป / ได้คืน</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="transition in transition_data.filter(
                    (i) => i.account_category_id === 2 || i.account_category_id === 6
                  )"
                  :key="transition.account_type_id"
                  class="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td class="px-6 py-4 text-sm text-gray-900">
                    <div class="flex items-center justify-start space-x-2">
                      <div 
                        class="w-3 h-3 rounded-full" 
                        :class="transition.account_category_id === 2 ? 'bg-amber-500' : 'bg-blue-500'"
                      ></div>
                      <span>{{ transition.account_type_name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div 
                      v-if="parseInt(transition.account_type_total) > parseInt(transition.account_type_sum)"
                      class="flex justify-center items-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium"
                    >
                      {{ Math.abs(transition.account_type_difference).toFixed(2) }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div 
                      v-if="parseInt(transition.account_type_total) < parseInt(transition.account_type_sum)"
                      class="flex justify-center items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
                    >
                      {{ Math.abs(transition.account_type_difference).toFixed(2) }}
                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Personal Assets Card -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 md:col-span-2">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
            <h2 class="text-xl font-semibold text-white">ทรัพย์สินส่วนตัว</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">ประเภท</th>
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">เพิ่มเป็น</th>
                  <th class="px-6 py-3 text-sm font-semibold text-gray-800 border-b">ลดเหลือ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="transition in transition_data.filter(
                    (i) => i.account_category_id === 1 || i.account_category_id === 7
                  )"
                  :key="transition.account_type_id"
                  class="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td class="px-6 py-4 text-sm text-gray-900">
                    <div class="flex items-center justify-start space-x-2">
                      <div 
                        class="w-3 h-3 rounded-full" 
                        :class="transition.account_category_id === 1 ? 'bg-emerald-500' : 'bg-teal-500'"
                      ></div>
                      <span>{{ transition.account_type_name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div 
                      v-if="parseInt(transition.account_type_total) > parseInt(transition.account_type_sum)"
                      class="flex justify-center items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium"
                    >
                      {{ transition.account_type_total }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div 
                      v-if="parseInt(transition.account_type_total) < parseInt(transition.account_type_sum)"
                      class="flex justify-center items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium"
                    >
                      {{ transition.account_type_total }}
                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Navigation Menu Modal -->
      <div id="modal-s" popover class="rounded-lg shadow-xl hidden">
        <div class="bg-white p-6 w-72 space-y-4 rounded-lg">
          <h3 class="font-medium text-gray-900 border-b pb-2">เลือกหมวดหมู่</h3>
          <button
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 border-l-4 border-amber-500 transition-colors duration-200 flex items-center space-x-2"
            @click="banklocation()"
          >
            <span class="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-amber-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1h12l3-1M3 6v7a2 2 0 002 2h14a2 2 0 002-2V6M3 18h18" />
              </svg>
            </span>
            <span>ธนาคาร</span>
          </button>
          <button
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border-l-4 border-green-500 transition-colors duration-200 flex items-center space-x-2"
            @click="incomelocation()"
          >
            <span class="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span>รายได้</span>
          </button>
          <button
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 border-l-4 border-red-500 transition-colors duration-200 flex items-center space-x-2"
            @click="expenselocation()"
          >
            <span class="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9l-7 7-4-4" />
              </svg>
            </span>
            <span>รายจ่าย</span>
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-8 flex justify-center">
        <ButtonSubmitToOne class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const transition_data = ref([]);
const loading = ref(true);
const { $axios } = useNuxtApp();

const goToPath = (category_id) =>{
  if(category_id === 7){
    router.push("/transitionbank")
  }
  if(category_id === 5){
    router.push("/transection_expense")
  }
  if(category_id === 4){
    router.push("/transection_income")
  }
}

// const fetchData = async () => {
//   loading.value = true;
//   const { data, error: fetchError } = await $axios.get(
//     "/dashboard"
//   );

//   if (fetchError.value) {
//     console.error(fetchError.value);
//     error.value = fetchError.value;
//   } else {
//     transition_data.value = data.value.result;
//   }

//   loading.value = false;
// };

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await $axios.get("/dashboard");

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    const data = response.data;
    transition_data.value = data.result;
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loading.value = false;
};

let intervalId;
fetchData();
// onMounted(() => {
//   fetchData();
//   intervalId = setInterval(fetchData, 2000);
// });

// onUnmounted(() => {
//   clearInterval(intervalId);
// });

const navigateTo = (path) => {
  router.push(path);
};

const activeModal = ref(null);

const openModal = (index) => {
  activeModal.value = activeModal.value === index ? null : index;
};
const banklocation = () => navigateTo("/transitionbank");
const incomelocation = () => navigateTo("/transection_income");
const expenselocation = () => navigateTo("/transection_expense");
</script>
