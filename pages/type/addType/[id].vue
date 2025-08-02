<template>
  <!-- <ClientOnly>
    <AddTypeComponents></AddTypeComponents>
  </ClientOnly> -->
  <BackComponents/>
  <AddType></AddType>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const groupID = route.params.id;
</script>
