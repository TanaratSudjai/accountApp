<script setup>
import { House, TrendingUp, TrendingDown, Building2, Clock } from 'lucide-vue-next';

import { useMenuLocalStorage } from '~/composables/menuLocalStorage';
const { menuState } = useMenuLocalStorage();
console.log("state menu : ", menuState.value);
</script>
<template>
  <footer class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
    <div class="max-w-md mx-auto ">
      <nav class="flex justify-between items-center">

        <!-- Pending -->
        <NuxtLink to="/dashboard_submit_transition"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-sky-50 active:bg-sky-100 group relative"
          :class="{ 'text-sky-600': $route.path === '/dashboard_submit_transition' }">
          <div class="relative">
            <Clock name="lucide:clock" size="22"
              :class="$route.path === '/dashboard_submit_transition' ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-700'" />
            <!-- Optional badge for pending count -->
            <!-- <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span> -->
          </div>
          <span class="text-xs mt-1 font-medium"
            :class="$route.path === '/dashboard_submit_transition' ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-700'">
            ตรวจสอบ
          </span>
        </NuxtLink>
        <!-- Income -->
        <NuxtLink :to="menuState ? '/transection_income' : ''" :disabled="!menuState"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{ 'text-green-600': $route.path === '/transection_income', 'opacity-50 pointer-events-none': !menuState }
            ">
          <TrendingUp name="lucide:trending-up" size="22"
            :class="$route.path === '/transection_income' ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'" />
          <span class="text-xs mt-1 font-medium"
            :class="$route.path === '/transection_income' ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'">
            รายได้
          </span>
        </NuxtLink>

        <!-- Home -->
        <NuxtLink to="/home"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{ 'text-sky-600': $route.path === '/home' }">
          <House name="lucide:home" size="22"
            :class="$route.path === '/home' ? 'text-sky-600' : 'text-gray-500 group-hover:text-gray-700'" />
          <span class="text-xs mt-1 font-medium"
            :class="$route.path === '/home' ? 'text-sky-600' : 'text-gray-500 group-hover:text-gray-700'">
            หน้าหลัก
          </span>
        </NuxtLink>

        <!-- Expense -->
        <NuxtLink :to="menuState ? '/transection_expense' : ''"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{
            'text-red-600': $route.path === '/transection_expense',
            'opacity-50 pointer-events-none': !menuState
          }">
          <TrendingDown name="lucide:trending-down" size="22"
            :class="$route.path === '/transection_expense' ? 'text-red-600' : 'text-gray-500 group-hover:text-gray-700'" />
          <span class="text-xs mt-1 font-medium"
            :class="$route.path === '/transection_expense' ? 'text-red-600' : 'text-gray-500 group-hover:text-gray-700'">
            รายจ่าย
          </span>
        </NuxtLink>


        <!-- Bank -->
        <NuxtLink to="/transitionbank"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{ 'text-purple-600': $route.path === '/transitionbank' }">
          <Building2 name="lucide:building-2" size="22"
            :class="$route.path === '/transitionbank' ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'" />
          <span class="text-xs mt-1 font-medium"
            :class="$route.path === '/transitionbank' ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'">
            ธนาคาร
          </span>
        </NuxtLink>


      </nav>
    </div>
  </footer>
</template>

<style scoped>
/* Optional: Add safe area padding for devices with home indicators */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  footer {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
