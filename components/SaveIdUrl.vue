<template>
  <div>
    <h1>Group ID: {{ groupId }}</h1>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const groupId = route.params.id;
</script>
