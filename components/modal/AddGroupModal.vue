<template>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <!-- Background overlay -->
          <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" @click="$emit('close')"></div>
          
          <!-- Modal container -->
          <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            <Transition name="slide-up">
              <div 
                v-if="show"
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-700"
              >
                <!-- Modal header -->
                <div class="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
                  <h3 class="text-lg font-medium text-[#1f2937]">เพิ่มกลุ่มบัญชีใหม่</h3>
                  <button 
                    @click="$emit('close')" 
                    class="text-gray-400 hover:text-[#1f2937] transition-colors"
                  >
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- Modal body -->
                <div class="bg-white px-6 py-4">
                  <form @submit.prevent="submitForm">
                    <div class="mb-4">
                      <label for="account_group_name" class="block text-sm font-medium text-[#46cb79] mb-2">ชื่อกลุ่ม</label>
                      <input 
                        id="account_group_name"
                        v-model="formData.account_group_name"
                        type="text" 
                        class="w-full rounded-lg border border-gray-600 bg-white px-3 py-2 text-white focus:border-[#46cb79] focus:outline-none focus:ring-1 focus:ring-[#46cb79]"
                        placeholder="กรุณากรอกชื่อกลุ่ม"
                      />
                    </div>
                    
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-[#46cb79] mb-2">ประเภท</label>
                      <div class="bg-white rounded-lg border border-gray-600 px-3 py-2 text-gray-300">
                        <GetgroupName :category-id="formData.account_category_id" />
                      </div>
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        @click="$emit('close')"
                        class="rounded-lg border bg-gray-400 border-gray-600  px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="submit"
                        class="rounded-lg bg-[#46cb79] px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#3ba962] transition-colors"
                      >
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
  import { reactive, watch } from 'vue';
  import GetgroupName from "~/components/GetgroupName.vue";
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    categoryID: {
      type: [Number, String],
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'submitted']);
  
  const { $axios } = useNuxtApp();
  
  const formData = reactive({
    account_group_name: "",
    account_category_id: props.categoryID,
  });
  
  watch(
    formData,
    (newVal) => {
      console.log("Form Data Updated:", newVal);
    },
    { deep: true }
  );
  
  const submitForm = async () => {
    try {
      const response = await $axios.post(
        "/account_group_create",
        {
          account_group_name: formData.account_group_name,
          account_category_id: formData.account_category_id,
        },
      );
      console.log("Account group created successfully:", response.data);
      formData.account_group_name = "";
      emit('submitted');
      emit('close');
    } catch (error) {
      console.log(error, "Error creating account group:");
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