<template>
  <div class="p-3 border-b border-gray-100" @click="goBack">
    <div class="">
      <NuxtImg src="./back.svg" class="w-8 h-8 cursor-pointer text-black" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
