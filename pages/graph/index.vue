<template>
  <BackComponents />
  <div class="min-h-screen pb-20">
    <div class="max-w-6xl mx-auto">
      <!-- Main Container with responsive grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <!-- Calendar Section -->
        <div class="w-full">
          <div class="bg-white rounded-md  p-2 sm:p-6 transition-shadow">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              ปฏิทิน
            </h2>
            <div class="calendar-container">
              <FullCalendar :options="calendarOptions" ref="calendarRef" />
            </div>
          </div>

          <!-- Selected Date Display -->
          <div v-if="selectedYear" class="">
            <!-- Expense Display -->
            <div class="bg-red-50 border-l-4 border-red-500 p-1 md:p-3   flex justify-between items-center ">
              <div class="flex items-center">
                <div class="text-red-700">
                  <svg class="w-4 h-4 md:w-5 md:h-5  mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-semibold text-xs md:text-md lg:text-lg ">รายจ่าย:</span>
                  <span v-if="
                    selectedDay !== 'ทั้งเดือน' && selectedDay !== 'ทั้งปี'
                  " class="ml-2 text-red-900 font-normal text-xs md:text-md lg:text-lg">
                    {{ (totalExpenseDay ?? 0).toLocaleString() }} บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งเดือน'"
                    class="ml-2 text-red-900 font-normal text-xs md:text-md lg:text-lg">
                    {{ (totalExpenseMonth ?? 0).toLocaleString() }} บาท
                  </span>
                  <span v-else class="ml-2 text-red-900 font-normal text-xs md:text-md lg:text-lg">
                    {{ (totalExpenseYear ?? 0).toLocaleString() }} บาท
                  </span>
                </div>
              </div>
              <p class="text-lg sm:text-xl font-normal text-gray-800  text-xs md:text-md lg:text-lg">
                <span v-if="selectedDay === 'ทั้งปี'">{{ selectedYear }}</span>
                <span v-else-if="selectedDay === 'ทั้งเดือน'">{{ selectedYear }}-{{
                  String(selectedMonth).padStart(2, "0")
                }}</span>
                <span v-else>{{ selectedYear }}-{{
                  String(selectedMonth).padStart(2, "0")
                }}-{{ String(selectedDay).padStart(2, "0") }}</span>
              </p>
            </div>

            <!-- Income Display -->
            <div class="bg-green-50 border-l-4 border-green-500  p-1 md:p-3 ">
              <div class="flex items-center">
                <div class="text-green-700 ">
                  <svg class="w-4 h-4 md:w-5 md:h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-semibold text-sm sm:text-base text-xs md:text-md lg:text-lg">รายรับ:</span>
                  <span v-if="
                    selectedDay !== 'ทั้งเดือน' && selectedDay !== 'ทั้งปี'
                  " class="ml-2 text-green-900 font-normal text-xs md:text-md lg:text-lg">
                    {{ (totalIncomeDay ?? 0).toLocaleString() }} บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งเดือน'"
                    class="ml-2 text-green-900 font-normal text-xs md:text-md lg:text-lg">
                    {{ (totalIncomeMonth ?? 0).toLocaleString() ?? 0 }} บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งปี'"
                    class="ml-2 text-green-900 font-normal text-xs md:text-md lg:text-lg">
                    {{ (totalIncomeYear ?? 0).toLocaleString() ?? 0 }} บาท
                  </span>
                </div>
              </div>
            </div>

            <!-- Net Balance Display -->
            <div class="bg-blue-50 border-l-4 border-blue-500  p-1 md:p-3  ">
              <div class="flex items-center">
                <div class="text-blue-700">
                  <svg class="w-4 h-4 md:w-5 md:h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-semibold text-sm sm:text-base  text-xs md:text-md lg:text-lg">สุทธิ:</span>
                  <span v-if="
                    selectedDay !== 'ทั้งเดือน' && selectedDay !== 'ทั้งปี'
                  " class="ml-2 font-bold  text-xs md:text-md lg:text-lg" :class="totalIncomeDay - totalExpenseDay >= 0
                    ? 'text-green-900'
                    : 'text-red-900'
                    ">
                    {{
                      (totalIncomeDay - totalExpenseDay ?? 0).toLocaleString()
                    }}
                    บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งเดือน'" class="ml-2 font-bold  text-xs md:text-md lg:text-lg"
                    :class="totalIncomeMonth - totalExpenseMonth >= 0
                      ? 'text-green-900'
                      : 'text-red-900'
                      ">
                    {{
                      (
                        totalIncomeMonth - totalExpenseMonth ?? 0
                      ).toLocaleString()
                    }}
                    บาท
                  </span>
                  <span v-else class="ml-2 font-bold " :class="totalIncomeYear - totalExpenseYear >= 0
                    ? 'text-green-900'
                    : 'text-red-900'
                    ">
                    {{
                      (totalIncomeYear - totalExpenseYear ?? 0).toLocaleString()
                    }}
                    บาท
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="w-full">
          <div class="bg-white rounded  p-4 sm:p-6 transition-shadow">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-0">
                กราฟ
                <span v-if="selectedDay === 'ทั้งปี'">ปี {{ selectedYear || "-" }}</span>
                <span v-else-if="selectedDay === 'ทั้งเดือน'">เดือน {{ selectedMonth || "-" }} ปี
                  {{ selectedYear || "-" }}</span>
                <span v-else>วันที่ {{ selectedDay || "-" }} เดือน
                  {{ selectedMonth || "-" }} ปี {{ selectedYear || "-" }}</span>
              </h2>
            </div>

            <!-- Filter Controls -->
            <div class="flex flex-row gap-1 mb-6 items-end">
              <div class="flex-1">
                <label class="block  text-xs md:text-md lg:text-lg font-medium text-gray-700 mb-1">เดือน</label>
                <select v-model="selectedMonthForChart"
                  class="w-full border border-gray-300 rounded-lg  bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option v-for="month in months" :key="month.value" :value="month.value">
                    {{ month.name }}
                  </option>
                </select>
              </div>

              <div class="flex-1">
                <label class="block  text-xs md:text-md lg:text-lg font-medium text-gray-700 mb-1">ปี</label>
                <select v-model="selectedYearForChart"
                  class="w-full border border-gray-300 rounded-lg  bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>

              <div class="flex-1">
                <button @click="fetchChartData"
                  class="w-full bg-sky-600 text-white px-2 py-1.5 rounded-lg hover:bg-sky-700 transition-colors text-xs">
                  ค้นหา
                </button>
              </div>
            </div>

            <!-- Chart Content -->
            <div class="chart-container space-y-8">
              <!-- Expense Chart -->
              <div v-if="pieChartDataExpense.datasets[0].data.length" class="w-full">
                <h3 class="text-lg font-semibold text-red-700 mb-4 text-center">
                  รายจ่าย
                </h3>
                <div class="relative max-w-md mx-auto">
                  <Pie :data="pieChartDataExpense" :options="pieChartOptions" />
                </div>
              </div>

              <!-- Income Chart -->
              <div v-if="pieChartDataIncome.datasets[0].data.length" class="w-full">
                <h3 class="text-lg font-semibold text-green-700 mb-4 text-center">
                  รายรับ
                </h3>
                <div class="relative max-w-md mx-auto">
                  <Pie :data="pieChartDataIncome" :options="pieChartOptions" />
                </div>
              </div>

              <!-- No Data Message -->
              <div v-if="
                !pieChartDataExpense.datasets[0].data.length &&
                !pieChartDataIncome.datasets[0].data.length
              " class="text-center py-12">
                <div class="text-gray-400 mb-4">
                  <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                    </path>
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
import { ref, reactive, onMounted } from "vue";
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

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const calendarRef = ref(null);

const totalExpenseDay = ref(0);
const totalExpenseMonth = ref(0);
const totalExpenseYear = ref(0);
const totalIncomeDay = ref(0);
const totalIncomeMonth = ref(0);
const totalIncomeYear = ref(0);

const calendarEvents = ref([]);
const calendarEventsIncome = ref([]);
const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

const pieChartDataExpense = ref({
  labels: [],
  datasets: [{ label: "Expense Distribution", data: [], backgroundColor: [] }],
});
const pieChartDataIncome = ref({
  labels: [],
  datasets: [{ label: "Income Distribution", data: [], backgroundColor: [] }],
});
const pieChartOptions = {
  responsive: true,
  plugins: { legend: { position: "bottom" } },
};

const selectedMonthForChart = ref(new Date().getMonth() + 1);
const selectedYearForChart = ref(new Date().getFullYear());

const months = [
  { name: "ทั้งปี", value: 0 },
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
for (let y = currentYear; y >= currentYear - 10; y--) years.push(y);

const { $api } = useApi();

async function fetchDashboardData(year, month, day = null) {
  try {
    const params = day
      ? { year, month, day }
      : month === 0
        ? { year }
        : { year, month };

    if (day === null) {
      selectedDay.value = "ทั้งเดือน";
    } else if (month === 0) {
      selectedDay.value = "ทั้งปี";
    } else {
      selectedDay.value = day;
    }
    const data = await $api("/get_dashboard_data", { params });

    // Calendar events
    calendarEvents.value = (data.dailyExpenseTotals || []).map((day) => ({
      title: `${day.total}`,
      date: day.date,
    }));
    calendarEventsIncome.value = (data.dailyIncomeTotals || []).map((day) => ({
      title: `${day.total}`,
      date: day.date,
    }));

    // Pie chart data
    pieChartDataExpense.value = {
      labels: (data.expenseChart || []).map((e) => e.account_type_name),
      datasets: [
        {
          label: "Expense Distribution",
          data: (data.expenseChart || []).map((e) => Number(e.total_expense)),
          backgroundColor: [
            "#FF6384",
            "#FF4757",
            "#FF3838",
            "#FF5722",
            "#E74C3C",
            "#C0392B",
            "#A93226",
            "#922B21",
          ],
        },
      ],
    };

    // Pie chart data for Income
    pieChartDataIncome.value = {
      labels: (data.incomeChart || []).map((e) => e.account_type_name),
      datasets: [
        {
          label: "Income Distribution",
          data: (data.incomeChart || []).map((e) => Number(e.total_income)),
          backgroundColor: [
            "#4CAF50",
            "#66BB6A",
            "#81C784",
            "#A5D6A7",
            "#2E7D32",
            "#388E3C",
            "#43A047",
            "#4CAF50",
          ],
        },
      ],
    };

    // Merge both expense and income events with custom classes
    const expenseEvents = (data.dailyExpenseTotals || []).map((day) => ({
      title: `${day.total} ฿`,
      date: day.date,
      className: "expense-event",
    }));

    const incomeEvents = (data.dailyIncomeTotals || []).map((day) => ({
      title: `${day.total} ฿`,
      date: day.date,
      className: "income-event",
    }));

    // Combine them for the calendar
    calendarEvents.value = [...expenseEvents, ...incomeEvents];

    // Totals for display
    // Yearly
    // Totals for display
    if (day) {
      // Daily totals
      totalExpenseDay.value = (data.expenseChart || []).reduce(
        (sum, e) => sum + Number(e.total_expense),
        0
      );
      totalIncomeDay.value = (data.incomeChart || []).reduce(
        (sum, e) => sum + Number(e.total_income),
        0
      );
      totalExpenseMonth.value = 0;
      totalIncomeMonth.value = 0;
      totalExpenseYear.value = 0;
      totalIncomeYear.value = 0;
    } else if (month === 0) {
      // Yearly totals
      totalExpenseYear.value = (data.monthYearExpenseTotals || []).reduce(
        (sum, e) => sum + Number(e.total),
        0
      );
      totalIncomeYear.value = (data.monthYearIncomeTotals || []).reduce(
        (sum, e) => sum + Number(e.total),
        0
      );
      totalExpenseMonth.value = 0;
      totalIncomeMonth.value = 0;
      totalExpenseDay.value = 0;
      totalIncomeDay.value = 0;
    } else {
      // Monthly totals (default case)
      totalExpenseMonth.value = (data.monthYearExpenseTotals || []).reduce(
        (sum, e) => sum + Number(e.total),
        0
      );
      totalIncomeMonth.value = (data.monthYearIncomeTotals || []).reduce(
        (sum, e) => sum + Number(e.total),
        0
      );
      totalExpenseYear.value = 0;
      totalIncomeYear.value = 0;
      totalExpenseDay.value = 0;
      totalIncomeDay.value = 0;
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Reset all on error
    calendarEvents.value = [];
    calendarEventsIncome.value = [];
    pieChartDataExpense.value = {
      labels: [],
      datasets: [
        { label: "Expense Distribution", data: [], backgroundColor: [] },
      ],
    };
    pieChartDataIncome.value = {
      labels: [],
      datasets: [
        { label: "Income Distribution", data: [], backgroundColor: [] },
      ],
    };
    totalExpenseDay.value = 0;
    totalExpenseMonth.value = 0;
    totalExpenseYear.value = 0;
    totalIncomeDay.value = 0;
    totalIncomeMonth.value = 0;
    totalIncomeYear.value = 0;
  }
}

// Use this for your "ค้นหา" button
const fetchChartData = async () => {
  if (selectedMonthForChart.value === 0) {
    selectedDay.value = "ทั้งปี";
    selectedMonth.value = null;
    selectedYear.value = selectedYearForChart.value;
  } else {
    selectedDay.value = "ทั้งเดือน";
    selectedMonth.value = selectedMonthForChart.value;
    selectedYear.value = selectedYearForChart.value;
  }
  await fetchDashboardData(
    selectedYearForChart.value,
    selectedMonthForChart.value
  );

  // Update calendar view when a specific month is selected
  if (
    selectedMonthForChart.value !== 0 &&
    calendarRef.value &&
    typeof calendarRef.value.getApi === "function"
  ) {
    const calendarApi = calendarRef.value.getApi();
    if (calendarApi && typeof calendarApi.gotoDate === "function") {
      calendarApi.gotoDate(
        new Date(selectedYearForChart.value, selectedMonthForChart.value - 1, 1)
      );
    }
  }
};

const handleDateClick = (info) => {
  // info.dateStr is in 'YYYY-MM-DD' format
  const [year, month, day] = info.dateStr.split("-").map(Number);

  selectedYear.value = year;
  selectedMonth.value = month;
  selectedDay.value = day;

  // Optionally update the filter controls to match
  selectedYearForChart.value = year;
  selectedMonthForChart.value = month;

  // Pass day as the third argument!
  fetchDashboardData(year, month, day);
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: calendarEvents,
  dateClick: handleDateClick,
});

// Initial load
// Initial load
onMounted(async () => {
  const today = new Date();
  selectedDay.value = null; // no specific day
  selectedMonth.value = today.getMonth() + 1; // current month
  selectedYear.value = today.getFullYear();

  selectedMonthForChart.value = selectedMonth.value;
  selectedYearForChart.value = selectedYear.value;

  await fetchDashboardData(selectedYear.value, selectedMonth.value);
});
</script>

<style scoped>
::v-deep(.expense-event) {
  background-color: #fef2f2 !important;
  color: red !important;
  border: none !important;
}

::v-deep(.expense-event .fc-event-title),
::v-deep(.expense-event .fc-list-event-title) {
  color: #b91c1c !important;
}

::v-deep(.income-event) {
  background-color: #f0fdf4 !important;
  color: white !important;
  border: none !important;
}

::v-deep(.income-event .fc-event-title),
::v-deep(.income-event .fc-list-event-title) {
  color: #15803d !important;
}

/* ปรับขนาดปกติสำหรับ desktop */
:deep(.fc-button) {
  font-size: 0.875rem;
  /* 14px */
  padding: 0.4rem 0.75rem;
  background-color: oklch(58.8% 0.158 241.966);
  border: oklch(58.8% 0.158 241.966);
}

:deep(.fc-daygrid-day-number) {
  font-size: 0.9rem;
  /* 14.4px */
  font-weight: 500;
}

:deep(.fc-event-title) {
  font-size: 0.85rem;
  /* 13.6px */
  line-height: 1.2;
}

:deep(.fc-toolbar-title) {
  font-size: 1.25rem;
  /* 20px */
  font-weight: 600;
}

/* Responsive: ปรับขนาดฟอนต์และปุ่มสำหรับจอเล็ก */
@media (max-width: 640px) {
  :deep(.fc-button) {
    font-size: 0.75rem;
    /* 12px */
    padding: 0.25rem 0.5rem;
  }

  :deep(.fc-daygrid-day-number) {
    font-size: 0.75rem;
    /* 12px */
  }

  :deep(.fc-event-title) {
    font-size: 0.7rem;
    /* 11.2px */
  }

  :deep(.fc-toolbar-title) {
    font-size: 1rem;
    /* 16px */
  }
}
</style>
