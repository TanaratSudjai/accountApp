<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo or Brand name -->
        <div class="flex-shrink-0 flex items-center">
          <span class="text-xl font-bold">Accounting</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-4">
          <div
            v-for="item in menuItems"
            :key="item.name"
            class="relative"
            @mouseenter="item.hasDropdown && setActiveDropdown(item.name)"
          >
            <button
              class="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
            >
              {{ item.name }}
              <ChevronDown v-if="item.hasDropdown" class="ml-1 h-4 w-4" />
            </button>

            <div
              v-if="item.hasDropdown && activeDropdown === item.name"
              class="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div class="py-1">
                <a
                  v-for="subItem in categories[item.name]"
                  :key="subItem"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ subItem }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <component :is="isOpen ? X : Menu" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <div v-for="item in menuItems" :key="item.name">
          <button
            @click="item.hasDropdown && toggleDropdown(item.name)"
            class="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-between"
          >
            {{ item.name }}
            <ChevronDown v-if="item.hasDropdown" class="ml-1 h-4 w-4" />
          </button>

          <div
            v-if="item.hasDropdown && activeDropdown === item.name"
            class="pl-4 space-y-1"
            @mouseenter="item.hasDropdown && setActiveDropdown(item.name)"
            @mouseleave="setActiveDropdown(null)"
          >
            <a
              v-for="subItem in categories[item.name]"
              :key="subItem"
              href="#"
              class="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 text-sm"
            >
              {{ subItem }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { Menu, X, ChevronDown } from "lucide-vue-next";

const isOpen = ref(false);
const activeDropdown = ref(null);

const setActiveDropdown = (name) => {
  activeDropdown.value = name;
};

const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name;
};

const categories = {
  จัดการหมวดหมู่: [
    "สินทรัพย์",
    "หนี้สิน",
    "ส่วนของเจ้าของ",
    "รายได้",
    "ค่าใช้จ่าย",
  ],
  เปิด: ["รายจ่าย", "รายได้"],
};

const menuItems = [
  { name: "จัดการหมวดหมู่", hasDropdown: true },
  { name: "เปิดบัญชี", hasDropdown: false },
  { name: "เปิด", hasDropdown: true },
  { name: "ลูกหนี้ เจ้าหนี้", hasDropdown: false },
  { name: "ธนาคาร", hasDropdown: false },
  { name: "สรุป", hasDropdown: false },
  { name: "บันทึกรายการทั่วไป", hasDropdown: false },
];
</script>
