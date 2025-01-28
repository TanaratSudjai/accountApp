<template>
  <button
    @click="onSubmit"
    class="bg-blue-300 p-4 rounded-xl w-full font-bold text-white"
  >
    SUBMIT
  </button>
</template>

<script setup>
const onSubmit = async () => {
  try {
    await fetch(
      `https://api-accountapp.onrender.com/api/transition_group_income_and_extend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Success");
  } catch (error) {
    console.error("Error fetching transition:", error.message);
  }
};
</script>
