<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-gray-900">ตรวจสอบความถูกต้อง</h1>
        <div class="mt-2 h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      <div class="flex bg-white rounded-lg shadow-lg overflow-hidden justify-around">
        <div class="overflow-x-auto">
          <h1 class="text-center py-4">รายรับ รายจ่าย</h1>
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  ประเภท
                </th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  รายรับ
                </th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  รายจ่าย
                </th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  แก้ไข
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="transition in transition_data.filter(
                  (i) =>
                    i.account_category_id === 4 || i.account_category_id === 5
                )"
                :key="transition.account_type_id"
                class="hover:bg-gray-50 transition-colors duration-200 justify-center"
              >
                <td class="px-6 py-4 text-sm text-gray-900 flex justify-center">
                  {{ transition.account_type_name }}
                </td>
                <td class="px-6 py-4">
                  <div v-if="transition.account_category_id === 4"
                    :class="[
                      'flex justify-center items-center px-4 py-2 rounded-full',
                      transition.account_type_total <
                      transition.account_type_sum
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800',
                    ]"
                  >
                    <span class="text-sm font-medium">
                      {{ transition.account_type_total }}
                    </span>
                    
                  </div>
                </td>
                <td>
                  <div v-if="transition.account_category_id === 5"
                    :class="[
                      'flex justify-center items-center px-4 py-2 rounded-full bg-red-100 text-red-800',
                      transition.account_type_total <
                      transition.account_type_sum
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800',
                    ]"
                  >
                    <span class="text-sm font-medium">
                      {{ transition.account_type_total }}
                    </span>
                    
                  </div>
                </td>
                <td class="px-6 py-4 flex justify-center">
                  <button
                    class="flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="goToPath(transition.account_category_id)"
                  >
                    เส้นทาง
                  </button>

                  <div id="modal-s" popover class="rounded-lg shadow-xl">
                    <div class="bg-white p-6 w-72 space-y-4">
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border-l-4 border-yellow-500 transition-colors duration-200"
                        @Click="banklocation()"
                      >
                        ธนาคาร
                      </button>
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border-l-4 border-green-500 transition-colors duration-200"
                        @Click="incomelocation()"
                      >
                        รายได้
                      </button>
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 border-l-4 border-red-500 transition-colors duration-200"
                        @Click="expenselocation()"
                      >
                        รายจ่าย
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="overflow-x-auto">
          <h1 class="text-center py-4">ทรัพย์สินส่วนตัว</h1>
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  ประเภท
                </th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  เพิ่ม
                </th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  ลด
                </th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900">
                  แก้ไข
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
              v-for="transition in transition_data.filter(
                  (i) =>
                    i.account_category_id === 1 || i.account_category_id === 2 || i.account_category_id === 7
                )"
                :key="transition.account_type_id"
                class="hover:bg-gray-50 transition-colors duration-200 justify-center"
              >
                <td class="px-6 py-4 text-sm text-gray-900 flex justify-center">
                  {{ transition.account_type_name }}
                </td>
                <td class="px-6 py-4">
                  <div v-if="transition.account_type_total >
                      transition.account_type_sum"
                    :class="[
                      'flex justify-center items-center px-4 py-2 rounded-full',
                      transition.account_type_total <
                      transition.account_type_sum
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800',
                    ]"
                  >
                    <span class="text-sm font-medium">
                      {{ transition.account_type_total }}
                    </span>
                  </div>
                </td>

                <td class="px-6 py-4">
                  <div  v-if="transition.account_type_total <
                      transition.account_type_sum"
                    :class="[
                      'flex justify-center items-center px-4 py-2 rounded-full',
                      transition.account_type_total <
                      transition.account_type_sum
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800',
                    ]"
                  >
                    <span class="text-sm font-medium">
                      {{ transition.account_type_total }}
                    </span>
                    
                    
                  </div>
                </td>
                <td class="px-6 py-4 flex justify-center">
                  <button
                  @click="goToPath(transition.account_category_id)"
                    class="flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    เส้นทาง
                  </button>

                  <div id="modal-s" popover class="rounded-lg shadow-xl">
                    <div class="bg-white p-6 w-72 space-y-4">
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border-l-4 border-yellow-500 transition-colors duration-200"
                        @Click="banklocation()"
                      >
                        ธนาคาร
                      </button>
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border-l-4 border-green-500 transition-colors duration-200"
                        @Click="incomelocation()"
                      >
                        รายได้
                      </button>
                      <button
                        class="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 border-l-4 border-red-500 transition-colors duration-200"
                        @Click="expenselocation()"
                      >
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
