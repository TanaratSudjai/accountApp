<template>
  <div
    @click.self="closeModal"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-1000 opacity-100 ease-linear min-h-screen px-4 py-12 sm:px-6 lg:px-8"
  >
    <div
      class="bg-white p-6 rounded shadow-lg relative z-10 w-full max-w-lg mx-auto transform transition-all duration-1000 opacity-100 ease-linear"
    >
      <div class="flex justify-center mb-6">
        <h1 class="text-2xl mb-3">First Group</h1>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label htmlFor="phone" class="text-gray-800 text-sm mb-2 block">
            ชื่อสินทรัพย์
          </label>
          <input
            v-model="formData.account_type_name"
            type="text"
            id="name"
            class="w-full border px-3 py-2 rounded outline-[#eed43d]"
            placeholder="Enter account type name"
          />
        </div>

        <div class="mb-4">
          <label class="text-gray-800 text-sm mb-2 block" for="amount"
            >จำนวนเงิน :</label
          >
          <input
            v-model="formData.account_type_amount"
            type="number"
            id="amount"
            class="w-full border px-3 py-2 rounded outline-[#eed43d]"
            placeholder="Enter amount"
          />
        </div>

        <div class="mb-4">
          <label class="text-gray-800 text-sm mb-2 block" for="description"
            >รายละเอียดรายการ :</label
          >
          <textarea
            v-model="formData.account_type_description"
            id="description"
            class="w-full border px-3 py-2 rounded outline-[#eed43d]"
            placeholder="Enter description"
          ></textarea>
        </div>

        <button
          @click="submitForm"
          type="submit"
          class="w-full bg-[#3b3939] hover:bg-[#080707] text-white py-3 rounded-md mb-2 transition duration-300 ease-in-out"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emits = defineEmits(["close", "updateFormData"]);

const formData = ref({
  account_type_name: "",
  account_type_amount: "",
  account_type_description: "",
  account_group_id: "",
  account_category_id: 2,
});

const submitForm = () => {
  emits("updateFormData", formData.value);
  closeModal();
};

const closeModal = () => {
  emits("close");
};

const resetText = () => {
  formData.value = {
    account_type_name: "",
    account_type_amount: "",
    account_type_description: "",
    account_group_id: "",
  };
};
</script>
