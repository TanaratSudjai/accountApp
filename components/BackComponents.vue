<template>
  <div class="" @click="goBack">
    <div class="">
      <NuxtImg src="./back.svg" class="w-5 h-5 cursor-pointer text-black" />
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
