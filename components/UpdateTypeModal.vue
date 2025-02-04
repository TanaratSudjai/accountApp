<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-semibold mb-4">Update Account Type</h2>
      <form @submit.prevent="updateAccountType">
        <label class="block text-sm text-gray-800">
          ชื่อประเภท
          <input type="text" v-model="localAccountType.account_type_name"
            class="mt-1 w-full border border-gray-300 px-2 py-1 rounded" required />
        </label>
        <label class="block text-sm text-gray-800 mt-2">
          จำนวนเงิน
          <input type="text" v-model="localAccountType.account_type_value"
            class="mt-1 w-full border border-gray-300 px-2 py-1 rounded" />
        </label>
        <label class="block text-sm text-gray-800 mt-2">
          คำอธิบาย
          <input type="text" v-model="localAccountType.account_type_description"
            class="mt-1 w-full border border-gray-300 px-2 py-1 rounded" />
        </label>
        <div class="flex overflow-x-auto py-2 border-2 p-2 rounded-xl mb-2">

          <div v-for="type in typeData" :key="type.account_type_id" @click="toggleSelect(type)"
            class="flex p-2 rounded-xl border-1 justify-center items-center cursor-pointer">
            <div :class="[
              'p-2 rounded-xl w-[500%] text-center truncate',
              selected && selected.account_type_id === type.account_type_id ? 'bg-green-500' : 'bg-yellow-500'
            ]">
              {{ type.account_type_name }}
            </div>
          </div>
          
        </div>
        <div class="mt-4 flex justify-end">
          <button type="button" class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            @click="close">
            Cancel
          </button>
          <button type="submit" class="bg-[#eed43d] hover:bg-[#bba62f] text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const typeData = ref([]);
const { $axios } = useNuxtApp();

const fetchTypeData = async () => {
  try {
    const response = await $axios.get(`/account_type_get`);
    const data = await response.data;
    typeData.value = data.account_type;
  } catch (error) {
    console.log("Error fetching icons:", error);
  }
};



const setAccountType = (name) => {
  localAccountType.value.account_type_name = name;
};

const props = defineProps({
  show: Boolean,
  accountType: Object,
  account_type_from_id: String,  // Receive the account_type_from_id from the parent
});

const emit = defineEmits(["update", "close"]);

const localAccountType = ref({ ...props.accountType });

const selected = ref(localAccountType.account_type_from_id);
const toggleSelect = (type) => {
  if (selected.value && selected.value.account_type_id === type.account_type_id) {
    selected.value = null;
    localAccountType.value.account_type_from_id = "";
  } else {
    selected.value = type;
    localAccountType.value.account_type_from_id = type.account_type_id;
  }
};

watch(
  () => props.accountType,
  (newValue) => {
    localAccountType.value = { ...newValue };
  }
);
watch(
  () => props.account_type_from_id,
  (newValue) => {
    localAccountType.value.account_type_from_id = newValue;
  }
);

const updateAccountType = async () => {
  console.log(localAccountType.value.account_type_id);
  console.log(localAccountType.value.account_type_name);
  console.log(localAccountType.value.account_type_value);
  console.log(localAccountType.value.account_type_description);
  console.log(localAccountType.value.account_type_from_id);
  try {
    const response = await $axios.put(
      `/account_type_update/${localAccountType.value.account_type_id}`,
      {
        account_type_name : localAccountType.value.account_type_name, 
        account_type_value: localAccountType.value.accountType_value,
        account_type_description: localAccountType.value.account_type_description,
      }
    );

    if (response.status === 200 || response.status === 201) {
      emit("update", {
        ...localAccountType.value,
        account_type_from_id: localAccountType.value.account_type_from_id,  // Include updated account_type_from_id
      });
      selected.value = null;
      close();
    } else {
      console.error("Error updating account type");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const close = () => {
  emit("close");
};

onMounted(async () => {
  fetchTypeData();
})
</script>
