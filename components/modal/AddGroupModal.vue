<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

        <!-- Modal container -->
        <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <Transition name="slide-up">
            <div v-if="show"
              class="relative transform overflow-hidden rounded-lg bg-white text-left text-sky-600 transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="p-5 flex justify-between items-center border-b border-gray-200">
                <h3 class="text-lg font-bold font-normal">
                  เพิ่มกลุ่มบัญชีใหม่
                </h3>
                <button @click="$emit('close')" class="text-gray-400  transition-colors">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal body -->
              <div class="bg-white px-6 py-4">
                <form @submit.prevent="submitForm">
                  <div class="mb-4">
                    <label for="account_group_name"
                      class="block text-sm text-gray-600 font-medium mb-2">ชื่อกลุ่ม</label>
                    <input id="account_group_name" v-model="formData.account_group_name" type="text"
                      class="w-full px-2 py-1 md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none "
                      placeholder="กรุณากรอกชื่อกลุ่ม" />
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm text-gray-600 font-medium mb-2">ประเภท</label>
                    <div
                      class="w-full px-2 py-1 md:px-3 md:py-2 border-b border-sky-400    transition-colors  focus:outline-none ">
                      <HooksGroupName :category-id="formData.account_category_id" /> 
                    </div>
                  </div>

                  <!-- Modal footer -->
                  <div class="flex justify-end space-x-3 mt-6">
                    <button type="button" @click="$emit('close')"
                      class="rounded-md border bg-gray-600 border-gray-200 px-2 py-1 md:px-3 md:py-2 text-sm font-medium text-white hover:bg-gray-500 transition-colors">
                      ยกเลิก
                    </button>
                    <button type="submit"
                      class="rounded-md bg-sky-600 px-2 py-1 md:px-3 md:py-2 text-sm font-medium text-white hover:bg-sky-500 transition-colors">
                      <SaveAll class="inline-block mr-2"  size="16"/>
                      บันทึก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {
  SaveAll
} from "lucide-vue-next";
import { reactive, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  categoryID: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(["close", "submitted"]);

const { $axios } = useNuxtApp();

const formData = reactive({
  account_group_name: "",
  account_category_id: props.categoryID,
});

watch(formData, (newVal) => { }, { deep: true });

const submitForm = async () => {
  try {
    await $axios.post("/account_group_create", {
      account_group_name: formData.account_group_name,
      account_category_id: formData.account_category_id,
    });
    formData.account_group_name = "";
    emit("submitted");
    emit("close");
  } catch (error) {
    const { logger } = await import('~/utils/logger');
    logger.error("Error creating account group", error);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
