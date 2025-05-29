```vue
<template>
  <div class="min-h-screen bg-gray-50 p-4 pb-20">
    <div class="max-w-7xl mx-auto">
      <!-- Main Container with responsive grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <!-- Calendar Section -->
        <div class="w-full">
          <div
            class="bg-white shadow-lg rounded-xl p-4 sm:p-6 transition-shadow hover:shadow-xl"
          >
            <h2
              class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center"
            >
              ปฏิทิน
            </h2>
            <div class="calendar-container">
              <FullCalendar :options="calendarOptions" />
            </div>
          </div>

          <!-- Selected Date Display -->
          <div
            v-if="selectedDay && selectedMonth && selectedYear"
            class="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"
          >
            <div class="flex items-center">
              <div class="text-blue-700">
                <svg
                  class="w-5 h-5 mr-2 inline"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="font-semibold text-sm sm:text-base"
                  >วันที่เลือก:</span
                >
                <span
                  v-if="selectedDay !== 'ทั้งเดือน' && selectedDay !== 'ทั้งปี'"
                  class="ml-2 text-blue-900 font-bold"
                >
                  {{ totalDay.toLocaleString() }} บาท
                </span>
                <span
                  v-else
                  class="ml-2 text-blue-900 font-bold"
                >
                  {{ totalAllMonth.toLocaleString() }} บาท
                </span>
              </div>
            </div>
            <p class="text-lg sm:text-xl font-bold text-gray-800 mt-1">
              <span v-if="selectedDay === 'ทั้งปี'">{{ selectedYear }}</span>
              <span v-else-if="selectedDay === 'ทั้งเดือน'">{{ selectedYear }}-{{ String(selectedMonth).padStart(2, '0') }}</span>
              <span v-else>{{ selectedYear }}-{{ String(selectedMonth).padStart(2, '0') }}-{{ String(selectedDay).padStart(2, '0') }}</span>
            </p>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="w-full">
          <div
            class="bg-white shadow-lg rounded-xl p-4 sm:p-6 transition-shadow hover:shadow-xl"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
            >
              <h2
                class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-0"
              >
                กราฟ
                <span v-if="selectedDay === 'ทั้งปี'">ปี {{ selectedYear || '-' }}</span>
                <span v-else-if="selectedDay === 'ทั้งเดือน'">เดือน {{ selectedMonth || '-' }} ปี {{ selectedYear || '-' }}</span>
                <span v-else>วันที่ {{ selectedDay || '-' }} เดือน {{ selectedMonth || '-' }} ปี {{ selectedYear || '-' }}</span>
              </h2>
            </div>

            <!-- Filter Controls -->
            <div class="flex flex-col sm:flex-row gap-3 mb-6 items-end">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >เดือน</label
                >
                <select
                  v-model="selectedMonthForChart"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option
                    v-for="month in months"
                    :key="month.value"
                    :value="month.value"
                  >
                    {{ month.name }}
                  </option>
                </select>
              </div>

              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >ปี</label
                >
                <select
                  v-model="selectedYearForChart"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>

              <div class="flex-1">
                <button
                  @click="fetchChartData"
                  class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  ค้นหา
                </button>
              </div>
            </div>

            <!-- Chart Content -->
            <div class="chart-container">
              <div v-if="pieChartData.datasets[0].data.length" class="w-full">
                <div class="relative max-w-md mx-auto">
                  <Pie :data="pieChartData" :options="pieChartOptions" />
                </div>
              </div>

              <div v-else class="text-center py-12">
                <div class="text-gray-400 mb-4">
                  <svg
                    class="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-600 mb-2">
                  ไม่มีข้อมูล
                </h3>
                <p class="text-gray-500">ไม่มีการทำรายการในวันที่เลือก</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

const totalAllMonth = ref(0);
const totalDay = ref(0);

const { $axios } = useNuxtApp();
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Refs and state
const calendarEvents = ref([]);
const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

// Initialize pieChartData as a ref with a new object to ensure reactivity
const pieChartData = ref({
  labels: [],
  datasets: [
    {
      label: "Expense Distribution",
      data: [],
      backgroundColor: [],
    },
  ],
});

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
  },
};

const selectedMonthForChart = ref(new Date().getMonth() + 1);
const selectedYearForChart = ref(new Date().getFullYear());

const months = [
  { name: "ทั้งปี", value: 0 }, // Added "All Year" option
  { name: "มกราคม", value: 1 },
  { name: "กุมภาพันธ์", value: 2 },
  { name: "มีนาคม", value: 3 },
  { name: "เมษายน", value: 4 },
  { name: "พฤษภาคม", value: 5 },
  { name: "มิถุนายน", value: 6 },
  { name: "กรกฎาคม", value: 7 },
  { name: "สิงหาคม", value: 8 },
  { name: "กันยายน", value: 9 },
  { name: "ตุลาคม", value: 10 },
  { name: "พฤศจิกายน", value: 11 },
  { name: "ธันวาคม", value: 12 },
];

const years = [];
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= currentYear - 10; y--) {
  years.push(y);
}

// Watch and fetch month-based chart (disabled to rely on button click)
watch([selectedMonthForChart, selectedYearForChart], ([month, year]) => {
  // Removed automatic fetch to rely on button
});

const fetchChartData = async () => {
  await fetchExpensesInChart(selectedYearForChart.value, selectedMonthForChart.value);
};

const fetchExpensesInChart = async (year, month) => {
  try {
    // Prepare API params: exclude month if "ทั้งปี" (month === 0)
    const params = month === 0 ? { year } : { year, month };
    const { data } = await $axios.get("/expense_chart", { params });

    // Replace the entire pieChartData.value to ensure reactivity
    pieChartData.value = {
      labels: data.map((e) => e.account_type_name),
      datasets: [
        {
          label: "Expense Distribution",
          data: data.map((e) => Number(e.total_expense)),
          backgroundColor: data.map(
            (_, i) =>
              [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#9CCC65",
                "#FF7043",
                "#8E24AA",
                "#00ACC1",
                "#F4511E",
              ][i % 8]
          ),
        },
      ],
    };

    selectedDay.value = month === 0 ? "ทั้งปี" : "ทั้งเดือน";
    selectedMonth.value = month === 0 ? null : month;
    selectedYear.value = year;

    // Fetch all daily totals for the month or year
    const { data: allDays } = await $axios.get("/daily_expense_totals", {
      params,
    });
    // Sum all days for the month or year
    totalAllMonth.value = allDays.reduce((sum, e) => sum + Number(e.total), 0);
    totalDay.value = 0;
  } catch (error) {
    console.error("Error fetching pie chart:", error);
    // Reset chart data if error occurs
    pieChartData.value = {
      labels: [],
      datasets: [{ label: "Expense Distribution", data: [], backgroundColor: [] }],
    };
  }
};

// Fetch pie chart for a specific day
const fetchExpenses = async (year, month, day) => {
  try {
    const { data } = await $axios.get("/expense_chart", {
      params: { year, month, day },
    });

    // Replace the entire pieChartData.value to ensure reactivity
    pieChartData.value = {
      labels: data.map((e) => e.account_type_name),
      datasets: [
        {
          label: "Expense Distribution",
          data: data.map((e) => Number(e.total_expense)),
          backgroundColor: data.map(
            (_, i) =>
              [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#9CCC65",
                "#FF7043",
                "#8E24AA",
                "#00ACC1",
                "#F4511E",
              ][i % 8]
          ),
        },
      ],
    };

    // Fetch all daily totals for the month
    const { data: allDays } = await $axios.get("/daily_expense_totals", {
      params: { year, month },
    });
    totalAllMonth.value = allDays.reduce((sum, e) => sum + Number(e.total), 0);

    // Find total for the selected day
    const found = allDays.find((e) => {
      const d = new Date(e.date);
      return (
        d.getDate() === Number(day) &&
        d.getMonth() + 1 === Number(month) &&
        d.getFullYear() === Number(year)
      );
    });
    totalDay.value = found ? Number(found.total) : 0;
  } catch (error) {
    console.error("Error fetching pie chart:", error);
    // Reset chart data if error occurs
    pieChartData.value = {
      labels: [],
      datasets: [{ label: "Expense Distribution", data: [], backgroundColor: [] }],
    };
  }
};

// Fetch total expenses for each day in the current month to show on calendar
const fetchDailyTotals = async () => {
  try {
    const { data } = await $axios.get("/daily_expense_totals");
    calendarEvents.value = data.map((day) => ({
      title: `${day.total}`,
      date: day.date, // YYYY-MM-DD format
    }));
  } catch (error) {
    console.error("Error fetching daily totals:", error);
  }
};

// Date click handler
const onDateClick = async (info) => {
  const clickedDate = new Date(info.dateStr);
  selectedDay.value = clickedDate.getDate();
  selectedMonth.value = clickedDate.getMonth() + 1;
  selectedYear.value = clickedDate.getFullYear();

  await fetchExpenses(
    selectedYear.value,
    selectedMonth.value,
    selectedDay.value
  );
};

// Calendar config
const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: calendarEvents,
  dateClick: onDateClick,
});

// Initial load
onMounted(async () => {
  const today = new Date();
  selectedDay.value = today.getDate();
  selectedMonth.value = today.getMonth() + 1;
  selectedYear.value = today.getFullYear();

  await fetchDailyTotals();
  await fetchExpenses(
    selectedYear.value,
    selectedMonth.value,
    selectedDay.value
  );
  await fetchExpensesInChart(
    selectedYearForChart.value,
    selectedMonthForChart.value
  );
});
</script>
```