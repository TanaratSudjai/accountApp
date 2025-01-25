<template>
  <div class="flex flex-col font-noto bg-cyan-600 min-h-screen">
    <!-- Header -->
    <div
      class="flex flex-wrap justify-center items-center fixed top-0 left-0 w-full z-50 p-3 bg-white shadow-md"
    >
      <!-- logo stars -->
      <div class="w-[98%] md:w-[28%] lg:w-[28%]">
        <div class="font-sans pb-2 text-gray-400">
          ACCOUNT APPLICATION
        </div>
      </div>
      <div class="w-[98%] md:w-[28%] lg:w-[28%]">
        <ButtonRemove />
      </div>
    </div>

    <div class="p-2 pt-[100px]">
      <slot />
    </div>

  </div>
</template>

<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
