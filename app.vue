<template>
    <NuxtLayout>
        <NuxtPage :page-transition="{ name: 'slide', mode: 'out-in' }" />
    </NuxtLayout>
</template>

<script setup></script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
