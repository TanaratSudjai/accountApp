<template>
  <BackComponents />
  <div class="flex flex-col max-w-4xl mx-auto space-y-4 rounded-lg">
    <div v-if="loading"></div>

    <div v-else>
      <div class="header-text w-full flex justify-center items-center p-4">
        <h1 class="font-bold">ตรวจสอบความถูกต้อง</h1>
      </div>
      <table class="w-full text-center">
        <thead>
          <tr class="border-b-2 border-t-2">
            <th class="p-3">ประเภท</th>
            <th class="p-3">สถานะเงิน</th>
            <th class="p-3">แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transitions, index) in transition_data"
            :key="index"
            class="border-b text-center font-bold text-sm"
          >
            <td class="p-3">{{ transitions.account_type_name }}</td>
            
            <td class="p-3">
              <div
                v-if="
                  transitions.account_type_total < transitions.account_type_sum
                "
                class="bg-red-100 rounded-full p-3 w-full flex justify-center"
              >
              {{ transitions.account_type_total }}
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21,11a1,1,0,0,0-1,1v2.59l-6.29-6.3a1,1,0,0,0-1.42,0L9,11.59,3.71,6.29A1,1,0,0,0,2.29,7.71l6,6a1,1,0,0,0,1.42,0L13,10.41,18.59,16H16a1,1,0,0,0,0,2h5a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,17V12A1,1,0,0,0,21,11Z"
                  />
                </svg>
              </div>

              <div
                v-else
                class="bg-green-100 rounded-full p-3 w-full flex justify-center"
              >
              {{ transitions.account_type_total }}
                <img src="/chart-up.png" alt="" width="20" height="20" />
              </div>
            </td>
            <td>
              <button class="" popovertarget="modal-s">เส้นทาง</button>
              <!-- modals select edit form  -->
              <div id="modal-s" popover>
                <div
                  class="bg-white shadow-lg p-8 w-[300px] rounded-md h-auto flex flex-col gap-6"
                >
                  <button
                    @click="banklocation()"
                    class="p-4 bg-white border-l-yellow-500 border-4 rounded-lg shadow-lg"
                  >
                    ธนาคาร
                  </button>
                  <button
                    @click="incomelocation()"
                    class="p-4 bg-white border-l-green-500 border-4 rounded-lg shadow-lg"
                  >
                    รายได้
                  </button>
                  <button
                    @click="expenselocation()"
                    class="p-4 bg-white border-l-red-500 border-4 rounded-lg shadow-lg"
                  >
                    รายจ่าย
                  </button>
                </div>
              </div>
              <!-- end modals -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const transition_data = ref([]);
const loading = ref(true);
const fetchData = async () => {
  loading.value = true;
  const { data, error: fetchError } = await useFetch(
    "/dashboard"
  );

  if (fetchError.value) {
    console.error(fetchError.value);
    error.value = fetchError.value;
  } else {
    transition_data.value = data.value.result;
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
const banklocation = () => navigateTo("/transitionbank");
const incomelocation = () => navigateTo("/transection_income");
const expenselocation = () => navigateTo("/transection_expense");
</script>
