<template>
  <div class="">
    <div class="">
      <NuxtImg @click="goBack" src="./back.svg" class="w-5 h-5 cursor-pointer text-black" />
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
