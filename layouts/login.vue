<template>
  <div class="h-screen flex flex-col justify-center items-center bg-gray-700">
    <div class="container mx-auto p-4 lg:w-[40%] xl:w-[40%]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
