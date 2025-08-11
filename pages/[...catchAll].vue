<template>
    <div class=" flex flex-col items-center justify-center p-6 space-y-6 text-center min-h-[400px]">
        <NuxtImg src="./undraw_chat-bot_c8iw.svg" alt="" />
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sky-600">
            Oops! Page not found
        </h1>
        <p class="text-gray-600 text-base sm:text-lg">
            ขออภัย! ไม่พบหน้าที่คุณต้องการ
        </p>
        <Button @click="$router.go(-1)"
            class="mt-4 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            กลับหน้าหลัก
        </Button>
    </div>
</template>
<script setup>
</script>