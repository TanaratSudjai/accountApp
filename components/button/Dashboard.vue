<template>
    <button @click="gotoDashboard"
      class=" bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
      ไปยังหน้ารายการตรวจสอบ
    </button>
</template>

<script setup>
import { useRouter } from "vue-router";
const route = useRouter();

function gotoDashboard() {
  route.push("/dashboard_submit_transition");
}
</script>
