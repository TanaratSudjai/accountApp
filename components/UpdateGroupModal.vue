<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white/90 p-6 rounded-lg shadow-lg w-full mx-5 md:w-[60%]">
      <h2 class="text-lg font-semibold mb-4">Update Account Type</h2>
      <form @submit.prevent="updateAccountType">
        <label class="block text-sm text-gray-800">
          ชื่อกลุ่ม:
          <input
            type="text"
            v-model="localAccountGroup.account_group_name"
            class="mt-1 w-full border border-gray-300 px-2 py-1 rounded"
            required
          />
        </label>

        <div class="mt-4 flex justify-end">
          <button
            type="button"
            class="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            @click="close"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
          >
            ยืนยันการเเก้ไข
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

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
  console.log(localAccountGroup.value.account_group_id);
  console.log(localAccountGroup.value.account_group_name);
  try {
    const response = await fetch(
      `/account_group_update/${localAccountGroup.value.account_group_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localAccountGroup.value), // Use localAccountType here
      }
    );

    if (response.ok) {
      const updatedData = await response.json();
      emit("update", updatedData);
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
</script>
