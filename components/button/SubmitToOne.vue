<script setup>

const { $axios } = useNuxtApp();

const router = useRouter()

const onSubmit = async () => {
  try {
      const response = await $axios.put(
        `/sumbitPerDay`
      );
      if(response.status === 200 || response.status === 201){
       router.push("/dasktop")

      } else {
        console.log("Submit failed");
      }
    } catch (error) {
      console.log("error updating account important", error);
    }
};
</script>

<template>
  <div>
    <div class="flex w-full gap-2 justify-center">
      <button
        @click="onSubmit"
        class="bg-blue-300 p-4 rounded-xl w-full font-bold text-white hover:bg-blue-400 transition-colors duration-200"
      >
        ยืนยันการทำรายการ
      </button>
    </div>
  </div>
</template>
