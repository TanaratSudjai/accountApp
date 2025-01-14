<template>
    <ClientOnly>
        <AddGroupComponents></AddGroupComponents>
    </ClientOnly>
    <AddGroup></AddGroup>
</template>
<script setup>
const route = useRoute();
const categoryID = route.params.id;
</script>