<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-gray-900">ตรวจสอบความถูกต้อง</h1>
        <div class="mt-2 h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">ประเภท</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">สถานะเงิน</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">แก้ไข</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(transition, index) in transition_data" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{transition.account_type_name}}
                </td>
                <td class="px-6 py-4">
                  <div :class="['inline-flex items-center px-4 py-2 rounded-full',
                      transition.account_type_total < transition.account_type_sum
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    ]">
                    <span class="text-sm font-medium">
                      {{transition.account_type_total}}
                    </span>
                    <svg v-if="transition.account_type_total < transition.account_type_sum" class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M21,11a1,1,0,0,0-1,1v2.59l-6.29-6.3a1,1,0,0,0-1.42,0L9,11.59,3.71,6.29A1,1,0,0,0,2.29,7.71l6,6a1,1,0,0,0,1.42,0L13,10.41,18.59,16H16a1,1,0,0,0,0,2h5a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,17V12A1,1,0,0,0,21,11Z" />
                    </svg>
                    <svg v-else class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M3,11a1,1,0,0,1,1-1H4v2.59l6.29-6.3a1,1,0,0,1,1.42,0L15,9.59l5.29-5.3a1,1,0,0,1,1.42,1.42l-6,6a1,1,0,0,1-1.42,0L11,8.41,5.41,14H8a1,1,0,0,1,0,2H3a1,1,0,0,1-.38-.08,1,1,0,0,1-.54-.54A1,1,0,0,1,2,15V12A1,1,0,0,1,3,11Z" />
                    </svg>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <button
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    popovertarget="modal-s">
                    เส้นทาง
                  </button>

                  <div id="modal-s" popover class="rounded-lg shadow-xl">
                    <div class="bg-white p-6 w-72 space-y-4">
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border-l-4 border-yellow-500 transition-colors duration-200"
                        @Click="banklocation()">
                        ธนาคาร
                      </button>
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border-l-4 border-green-500 transition-colors duration-200"
                        @Click="incomelocation()">
                        รายได้
                      </button>
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 border-l-4 border-red-500 transition-colors duration-200"
                        @Click="expenselocation()">
                        รายจ่าย
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
    console.log(data.result);
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


