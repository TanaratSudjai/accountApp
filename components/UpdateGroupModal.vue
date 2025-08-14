<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
    <div class="bg-white p-4 rounded-lg shadow-lg  w-[60%] md:w-[300px]">
      <h2 class="text-lg text-sky-600 font-semibold mb-4">แก้ไขหรืออัพเดตกลุ่มบัญชี</h2>
      <form @submit.prevent="updateAccountType">
        <label class="block text-sm text-gray-600">
          ชื่อกลุ่ม
        </label>
        <input type="text" v-model="localAccountGroup.account_group_name"
          class="w-full px-2 py-1 md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none "
          required />

        <div class="mt-4 flex justify-end">
          <button type="button" class="mr-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg"
            @click="close">
            ยกเลิก
          </button>
          <button type="submit" class="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg">
            <SquarePen class="inline-block mr-2 w-4 h-4" />
            อัพเดต
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {
  SquarePen
} from "lucide-vue-next";
import { ref, watch } from "vue";
const { $api } = useNuxtApp();

const props = defineProps({
  show: Boolean,
  accountGroup: Object,
});

const emit = defineEmits(["update", "close"]);

const localAccountGroup = ref({ ...props.accountGroup });

watch(
  () => props.accountGroup,
  (newValue) => {
    localAccountGroup.value = { ...newValue };
  }
);

const updateAccountType = async () => {

  try {
    const response = await $api.put(`/account_group_update/${localAccountGroup.value.account_group_id}`, {
      account_group_name: localAccountGroup.value.account_group_name,
    });

    emit("update", response.data);
    close();
  } catch (error) {
    console.log("Error:", error);
  }
};

const close = () => {
  emit("close");
};
</script>
