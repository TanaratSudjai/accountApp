<template>
  <div class="min-h-screen rounded-md flex flex-wrap w-full gap-2 justify-center p-2">
    <!-- Calendar -->
    <div class="bg-white shadow-2xl p-5 w-[98%] md:w-[48%] lg:w-[48%] rounded-md">
      <FullCalendar :events="calendarEvents" :options="calendarOptions" />
    </div>

    <!-- Pie Chart -->
    <div class="bg-white shadow-2xl p-5 w-[98%] md:w-[48%] lg:w-[48%] rounded-md">
      <Pie :data="pieChartData" :options="pieChartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

// Your sample data, convert total_expense to number
const expenses = [
  { total_expense: '600.00', account_type_name: 'ค่าน้ำมัน' },
  { total_expense: '860.00', account_type_name: 'ค่าไฟ' },
  { total_expense: '60.00', account_type_name: 'ค่าน้ำ' },
  { total_expense: '1750.00', account_type_name: 'ค่าบ้าน' },
  { total_expense: '50.00', account_type_name: 'ค่าอาหารเช้า' },
  { total_expense: '599.00', account_type_name: 'บัตรบัวหลวง' },
  { total_expense: '110.00', account_type_name: 'ค่าเน็ต' },
  { total_expense: '14.00', account_type_name: 'น้ำเปล่า' },
]

const pieChartData = ref({
  labels: expenses.map(e => e.account_type_name),
  datasets: [
    {
      label: 'Expense Distribution',
      data: expenses.map(e => Number(e.total_expense)),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#9CCC65',
        '#FF7043',
        '#8E24AA',
        '#00ACC1',
        '#F4511E',
      ],
    },
  ],
})

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
  },
}

// For calendar, assign all expenses on today's date as events
const today = new Date().toISOString().split('T')[0]

const calendarEvents = expenses.map((e) => ({
  title: `${e.account_type_name}: ${e.total_expense}`,
  date: today,
}))

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
}
</script>
<!-- 
<style>
@import url('/node_modules/@fullcalendar/core/index.global.css');
@import url('/node_modules/@fullcalendar/daygrid/index.global.css');
</style> -->
