<template>
  <footer class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
    <div class="max-w-md mx-auto px-4">
      <nav class="flex justify-between items-center py-2">
        
        <!-- Pending -->
        <NuxtLink
          to="/dashboard_submit_transition"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group relative"
          :class="{ 'text-orange-600': $route.path === '/dashboard_submit_transition' }"
        >
          <div class="relative">
            <Clock 
              name="lucide:clock" 
              size="22" 
              :class="$route.path === '/dashboard_submit_transition' ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-700'"
            />
            <!-- Optional badge for pending count -->
            <!-- <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span> -->
          </div>
          <span 
            class="text-xs mt-1 font-medium"
            :class="$route.path === '/dashboard_submit_transition' ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-700'"
          >
            Pending
          </span>
        </NuxtLink>
        <!-- Income -->
        <NuxtLink
          to="/transection_income"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{ 'text-green-600': $route.path === '/transection_income' }"
        >
          <TrendingUp 
            name="lucide:trending-up" 
            size="22" 
            :class="$route.path === '/transection_income' ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'"
          />
          <span 
            class="text-xs mt-1 font-medium"
            :class="$route.path === '/transection_income' ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'"
          >
            Income
          </span>
        </NuxtLink>

        <!-- Home -->
        <NuxtLink
          to="/home"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{ 'text-blue-600': $route.path === '/home' }"
        >
          <House 
            name="lucide:home" 
            size="22" 
            :class="$route.path === '/home' ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'"
          />
          <span 
            class="text-xs mt-1 font-medium"
            :class="$route.path === '/home' ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'"
          >
            Home
          </span>
        </NuxtLink>

        <!-- Expense -->
        <NuxtLink
          to="/transection_expense"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{ 'text-red-600': $route.path === '/transection_expense' }"
        >
          <TrendingDown 
            name="lucide:trending-down" 
            size="22" 
            :class="$route.path === '/transection_expense' ? 'text-red-600' : 'text-gray-500 group-hover:text-gray-700'"
          />
          <span 
            class="text-xs mt-1 font-medium"
            :class="$route.path === '/transection_expense' ? 'text-red-600' : 'text-gray-500 group-hover:text-gray-700'"
          >
            Expense
          </span>
        </NuxtLink>

        <!-- Bank -->
        <NuxtLink
          to="/transitionbank"
          class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
          :class="{ 'text-purple-600': $route.path === '/transitionbank' }"
        >
          <Building2 
            name="lucide:building-2" 
            size="22" 
            :class="$route.path === '/transitionbank' ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'"
          />
          <span 
            class="text-xs mt-1 font-medium"
            :class="$route.path === '/transitionbank' ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'"
          >
            Bank
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

<script setup>
import { House,TrendingUp,TrendingDown,Building2,Clock } from 'lucide-vue-next';
</script>