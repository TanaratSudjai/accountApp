<script setup>

const onSubmit = async () => {
  try {
    await fetch(``);
    console.log("Success");
  } catch (error) {
    console.error("Error fetching transition:", error.message);
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
