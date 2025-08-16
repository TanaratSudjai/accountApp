<template>
  <div class="flex justify-center items-center">
    <div class="flex items-center justify-center mb-10 w-full flex-col max-w-3xl">
      <div class="rounded-2xl w-full">
        <DataGroup ref="dataGroupRef"></DataGroup>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const categoryID = route.query.id;
const emit = defineEmits(["submit_fetch"]);
const dataGroupRef = ref(null);

const formData = reactive({
  account_group_name: "",
  account_category_id: categoryID,
});

watch(formData, () => { }, { deep: true });


</script>
