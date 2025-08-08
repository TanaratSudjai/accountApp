<template>
  <BackComponents />
  <div class="min-h-screen p-4 pb-20">
    <div class="max-w-7xl mx-auto">
      <!-- Main Container with responsive grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <!-- Calendar Section -->
        <div class="w-full">
          <div class="bg-white rounded-md border border-gray-200 p-4 sm:p-6 transition-shadow">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              ปฏิทิน
            </h2>
            <div class="calendar-container">
              <FullCalendar :options="calendarOptions" ref="calendarRef" />
            </div>
          </div>

          <!-- Selected Date Display -->
          <div v-if="selectedDay && selectedYear" class="mt-4 space-y-4">
            <!-- Expense Display -->
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div class="flex items-center">
                <div class="text-red-700">
                  <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-semibold text-sm sm:text-base">รายจ่าย:</span>
                  <span v-if="
                    selectedDay !== 'ทั้งเดือน' && selectedDay !== 'ทั้งปี'
                  " class="ml-2 text-red-900 font-bold">
                    {{ (totalExpenseDay ?? 0).toLocaleString() }} บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งเดือน'" class="ml-2 text-red-900 font-bold">
                    {{ (totalExpenseMonth ?? 0).toLocaleString() }} บาท
                  </span>
                  <span v-else class="ml-2 text-red-900 font-bold">
                    {{ (totalExpenseYear ?? 0).toLocaleString() }} บาท
                  </span>
                </div>
              </div>
              <p class="text-lg sm:text-xl font-bold text-gray-800 mt-1">
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
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div class="flex items-center">
                <div class="text-green-700">
                  <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-semibold text-sm sm:text-base">รายรับ:</span>
                  <span v-if="
                    selectedDay !== 'ทั้งเดือน' && selectedDay !== 'ทั้งปี'
                  " class="ml-2 text-green-900 font-bold">
                    {{ (totalIncomeDay ?? 0).toLocaleString() }} บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งเดือน'" class="ml-2 text-green-900 font-bold">
                    {{ (totalIncomeMonth ?? 0).toLocaleString() ?? 0 }} บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งปี'" class="ml-2 text-green-900 font-bold">
                    {{ (totalIncomeYear ?? 0).toLocaleString() ?? 0 }} บาท
                  </span>
                </div>
              </div>
            </div>

            <!-- Net Balance Display -->
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div class="flex items-center">
                <div class="text-blue-700">
                  <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-semibold text-sm sm:text-base">สุทธิ:</span>
                  <span v-if="
                    selectedDay !== 'ทั้งเดือน' && selectedDay !== 'ทั้งปี'
                  " class="ml-2 font-bold" :class="totalIncomeDay - totalExpenseDay >= 0
                        ? 'text-green-900'
                        : 'text-red-900'
                      ">
                    {{ ((totalIncomeDay - totalExpenseDay) ?? 0).toLocaleString() }}
                    บาท
                  </span>
                  <span v-else-if="selectedDay === 'ทั้งเดือน'" class="ml-2 font-bold" :class="totalIncomeMonth - totalExpenseMonth >= 0
                      ? 'text-green-900'
                      : 'text-red-900'
                    ">
                    {{
                      ((totalIncomeMonth - totalExpenseMonth) ?? 0).toLocaleString()
                    }}
                    บาท
                  </span>
                  <span v-else class="ml-2 font-bold" :class="totalIncomeYear - totalExpenseYear >= 0
                      ? 'text-green-900'
                      : 'text-red-900'
                    ">
                    {{ ((totalIncomeYear - totalExpenseYear) ?? 0).toLocaleString() }}
                    บาท
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="w-full">
          <div class="bg-white rounded border border-gray-200 p-4 sm:p-6 transition-shadow">
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
            <div class="flex flex-col sm:flex-row gap-3 mb-6 items-end">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">เดือน</label>
                <select v-model="selectedMonthForChart"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option v-for="month in months" :key="month.value" :value="month.value">
                    {{ month.name }}
                  </option>
                </select>
              </div>

              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">ปี</label>
                <select v-model="selectedYearForChart"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>

              <div class="flex-1">
                <button @click="fetchChartData"
                  class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
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
import { ref, reactive, onMounted, watch, computed } from "vue";
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

// Separate totals for expense and income
const totalExpenseDay = ref(0);
const totalExpenseMonth = ref(0);
const totalExpenseYear = ref(0);
const totalIncomeDay = ref(0);
const totalIncomeMonth = ref(0);
const totalIncomeYear = ref(0);

const { $axios } = useNuxtApp();
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Refs and state
const calendarEvents = ref([]);
const calendarEventsIncome = ref([]);
const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

// Separate chart data for expense and income
const pieChartDataExpense = ref({
  labels: [],
  datasets: [
    {
      label: "Expense Distribution",
      data: [],
      backgroundColor: [],
    },
  ],
});

const pieChartDataIncome = ref({
  labels: [],
  datasets: [
    {
      label: "Income Distribution",
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
for (let y = currentYear; y >= currentYear - 10; y--) {
  years.push(y);
}
const calendarRef = ref(null);

// Replace the existing fetchChartData function
const fetchChartData = async () => {
  // Set selectedDay for chart context
  if (selectedMonthForChart.value === 0) {
    selectedDay.value = "ทั้งปี";
    selectedMonth.value = null;
    selectedYear.value = selectedYearForChart.value;
  } else {
    selectedDay.value = "ทั้งเดือน";
    selectedMonth.value = selectedMonthForChart.value;
    selectedYear.value = selectedYearForChart.value;
  }

  await Promise.all([
    fetchExpensesInChart(
      selectedYearForChart.value,
      selectedMonthForChart.value
    ),
    fetchIncomeInChart(selectedYearForChart.value, selectedMonthForChart.value),
    setIncome(selectedYearForChart.value, selectedMonthForChart.value),
    setExpense(selectedYearForChart.value, selectedMonthForChart.value),
  ]);

  // Update calendar view when a specific month is selected
  if (selectedMonthForChart.value !== 0 && calendarRef.value) {
    const calendarApi = calendarRef.value.getApi();
    calendarApi.gotoDate(
      new Date(selectedYearForChart.value, selectedMonthForChart.value - 1, 1)
    );
  }
};

// Fetch expense chart data - FIXED VERSION
const fetchExpensesInChart = async (year, month) => {
  try {
    // Only send month if not "ทั้งปี"
    const paramsChart = month === 0 ? { year } : { year, month };
    const { data } = await $axios.get("/expense_chart", { params: paramsChart });

    // Check if there's any data
    if (data && data.length > 0) {
      pieChartDataExpense.value = {
        labels: data.map((e) => e.account_type_name),
        datasets: [
          {
            label: "Expense Distribution",
            data: data.map((e) => Number(e.total_expense)),
            backgroundColor: data.map(
              (_, i) =>
                [
                  "#FF6384",
                  "#FF4757",
                  "#FF3838",
                  "#FF5722",
                  "#E74C3C",
                  "#C0392B",
                  "#A93226",
                  "#922B21",
                ][i % 8]
            ),
          },
        ],
      };
    } else {
      // No data found - clear the chart
      pieChartDataExpense.value = {
        labels: [],
        datasets: [
          { label: "Expense Distribution", data: [], backgroundColor: [] },
        ],
      };
    }

    // Update selected period
    selectedDay.value = month === 0 ? "ทั้งปี" : "ทั้งเดือน";
    selectedMonth.value = month === 0 ? null : month;
    selectedYear.value = year;

    // Reset totals first
    totalExpenseDay.value = 0;
    totalExpenseMonth.value = 0;
    totalExpenseYear.value = 0;

    // Only fetch and calculate totals if there's chart data
    if (data && data.length > 0) {
      const { data: allDays } = await $axios.get(
        "/MonthAndYear_expense_totals",
        { params: paramsChart }
      );

      if (month === 0) {
        totalExpenseYear.value = allDays.reduce(
          (sum, e) => sum + Number(e.total),
          0
        );
      } else {
        totalExpenseMonth.value = allDays.reduce(
          (sum, e) => sum + Number(e.total),
          0
        );
      }
    }
  } catch (error) {
    console.error("Error fetching expense chart:", error);
    pieChartDataExpense.value = {
      labels: [],
      datasets: [
        { label: "Expense Distribution", data: [], backgroundColor: [] },
      ],
    };
    // Reset totals on error
    totalExpenseDay.value = 0;
    totalExpenseMonth.value = 0;
    totalExpenseYear.value = 0;
  }
};

// Fetch income chart data - FIXED VERSION
const fetchIncomeInChart = async (year, month) => {
  try {
    // Only send month if not "ทั้งปี"
    const paramsChart = month === 0 ? { year } : { year, month };
    const { data } = await $axios.get("/income_chart", { params: paramsChart });

    // Check if there's any data
    if (data && data.length > 0) {
      pieChartDataIncome.value = {
        labels: data.map((e) => e.account_type_name),
        datasets: [
          {
            label: "Income Distribution",
            data: data.map((e) => Number(e.total_expense)),
            backgroundColor: data.map(
              (_, i) =>
                [
                  "#4CAF50",
                  "#66BB6A",
                  "#81C784",
                  "#A5D6A7",
                  "#2E7D32",
                  "#388E3C",
                  "#43A047",
                  "#4CAF50",
                ][i % 8]
            ),
          },
        ],
      };
    } else {
      // No data found - clear the chart
      pieChartDataIncome.value = {
        labels: [],
        datasets: [
          { label: "Income Distribution", data: [], backgroundColor: [] },
        ],
      };
    }

    // Reset totals first
    totalIncomeDay.value = 0;
    totalIncomeMonth.value = 0;
    totalIncomeYear.value = 0;

    // Only fetch and calculate totals if there's chart data
    if (data && data.length > 0) {
      const { data: allDays } = await $axios.get(
        "/MonthAndYear_income_totals",
        { params: paramsChart }
      );

      if (month === 0) {
        totalIncomeYear.value = allDays.reduce(
          (sum, e) => sum + Number(e.total),
          0
        );
      } else {
        totalIncomeMonth.value = allDays.reduce(
          (sum, e) => sum + Number(e.total),
          0
        );
      }
    }
  } catch (error) {
    console.error("Error fetching income chart:", error);
    pieChartDataIncome.value = {
      labels: [],
      datasets: [
        { label: "Income Distribution", data: [], backgroundColor: [] },
      ],
    };
    // Reset totals on error
    totalIncomeDay.value = 0;
    totalIncomeMonth.value = 0;
    totalIncomeYear.value = 0;
  }
};

// Fetch charts for a specific day
const fetchExpensesForDay = async (year, month, day) => {
  try {
    const { data } = await $axios.get("/expense_chart", {
      params: { year, month, day },
    });

    if (data && data.length > 0) {
      pieChartDataExpense.value = {
        labels: data.map((e) => e.account_type_name),
        datasets: [
          {
            label: "Expense Distribution",
            data: data.map((e) => Number(e.total_expense)),
            backgroundColor: data.map(
              (_, i) =>
                [
                  "#FF6384",
                  "#FF4757",
                  "#FF3838",
                  "#FF5722",
                  "#E74C3C",
                  "#C0392B",
                  "#A93226",
                  "#922B21",
                ][i % 8]
            ),
          },
        ],
      };

      // Fetch monthly totals
      const { data: allDays } = await $axios.get("/daily_expense_totals", {
        params: { year, month },
      });
      totalExpenseMonth.value = allDays.reduce(
        (sum, e) => sum + Number(e.total),
        0
      );

      // Find total for the selected day
      const found = allDays.find((e) => {
        const d = new Date(e.date);
        return (
          d.getDate() === Number(day) &&
          d.getMonth() + 1 === Number(month) &&
          d.getFullYear() === Number(year)
        );
      });
      totalExpenseDay.value = found ? Number(found.total) : 0;
    } else {
      pieChartDataExpense.value = {
        labels: [],
        datasets: [
          { label: "Expense Distribution", data: [], backgroundColor: [] },
        ],
      };
      totalExpenseDay.value = 0;
      totalExpenseMonth.value = 0;
    }

    totalExpenseYear.value = 0;
  } catch (error) {
    console.error("Error fetching expense chart for day:", error);
    pieChartDataExpense.value = {
      labels: [],
      datasets: [
        { label: "Expense Distribution", data: [], backgroundColor: [] },
      ],
    };
    totalExpenseDay.value = 0;
    totalExpenseMonth.value = 0;
    totalExpenseYear.value = 0;
  }
};

const fetchIncomeForDay = async (year, month, day) => {
  try {
    const { data } = await $axios.get("/income_chart", {
      params: { year, month, day },
    });

    if (data && data.length > 0) {
      pieChartDataIncome.value = {
        labels: data.map((e) => e.account_type_name),
        datasets: [
          {
            label: "Income Distribution",
            data: data.map((e) => Number(e.total_expense)),
            backgroundColor: data.map(
              (_, i) =>
                [
                  "#4CAF50",
                  "#66BB6A",
                  "#81C784",
                  "#A5D6A7",
                  "#2E7D32",
                  "#388E3C",
                  "#43A047",
                  "#4CAF50",
                ][i % 8]
            ),
          },
        ],
      };

      // Fetch monthly income totals
      const { data: allDays } = await $axios.get("/daily_income_totals", {
        params: { year, month },
      });
      totalIncomeMonth.value = allDays.reduce(
        (sum, e) => sum + Number(e.total),
        0
      );

      // Find total for the selected day
      const found = allDays.find((e) => {
        const d = new Date(e.date);
        return (
          d.getDate() === Number(day) &&
          d.getMonth() + 1 === Number(month) &&
          d.getFullYear() === Number(year)
        );
      });
      totalIncomeDay.value = found ? Number(found.total) : 0;
    } else {
      pieChartDataIncome.value = {
        labels: [],
        datasets: [
          { label: "Income Distribution", data: [], backgroundColor: [] },
        ],
      };
      totalIncomeDay.value = 0;
      totalIncomeMonth.value = 0;
    }

    totalIncomeYear.value = 0;
  } catch (error) {
    console.error("Error fetching income chart for day:", error);
    pieChartDataIncome.value = {
      labels: [],
      datasets: [
        { label: "Income Distribution", data: [], backgroundColor: [] },
      ],
    };
    totalIncomeDay.value = 0;
    totalIncomeMonth.value = 0;
    totalIncomeYear.value = 0;
  }
};

// Fetch total expenses for each day in the current month to show on calendar
const fetchDailyTotals = async () => {
  try {
    const { data } = await $axios.get("/daily_expense_totals");
    calendarEvents.value = data.map((day) => ({
      title: `${day.total}`,
      date: day.date,
    }));
  } catch (error) {
    console.error("Error fetching daily expense totals:", error);
  }
};

const fetchIncomeDailyTotals = async () => {
  try {
    const { data } = await $axios.get("/daily_income_totals");
    calendarEventsIncome.value = data.map((day) => ({
      title: `${day.total}`,
      date: day.date,
    }));
  } catch (error) {
    console.error("Error fetching daily income totals:", error);
  }
};

// FIXED - More robust setIncome function
const setIncome = async (year, month) => {
  try {
    const params = {};
    if (selectedDay.value === "ทั้งปี") {
      params.year = year;
      // Do NOT set params.month
    } else if (selectedDay.value === "ทั้งเดือน") {
      params.year = year;
      params.month = month;
    } else {
      params.year = year;
      params.month = month;
      params.day = selectedDay.value;
    }

    const { data } = await $axios.get("/MonthAndYear_income_totals", {
      params,
    });

    // Reset all totals first
    totalIncomeDay.value = 0;
    totalIncomeMonth.value = 0;
    totalIncomeYear.value = 0;

    // Only set the appropriate total if data exists
    if (data && data.total !== undefined && data.total !== null) {
      if (selectedDay.value === "ทั้งปี") {
        totalIncomeYear.value = Number(data.total) || 0;
      } else if (selectedDay.value === "ทั้งเดือน") {
        totalIncomeMonth.value = Number(data.total) || 0;
      } else {
        totalIncomeDay.value = Number(data.total) || 0;
      }
    }
  } catch (error) {
    console.error("Error fetching incomes:", error);
    // Reset all on error
    totalIncomeDay.value = 0;
    totalIncomeMonth.value = 0;
    totalIncomeYear.value = 0;
  }
};

const setExpense = async (year, month) => {
  try {
    const params = {};
    if (selectedDay.value === "ทั้งปี") {
      params.year = year;
      // Do NOT set params.month
    } else if (selectedDay.value === "ทั้งเดือน") {
      params.year = year;
      params.month = month;
    } else {
      params.year = year;
      params.month = month;
      params.day = selectedDay.value;
    }

    const { data } = await $axios.get("/MonthAndYear_expense_totals", {
      params,
    });

    // Reset all
    totalExpenseDay.value = 0;
    totalExpenseMonth.value = 0;
    totalExpenseYear.value = 0;

    if (selectedDay.value === "ทั้งปี") {
      totalExpenseYear.value = data.total;
    } else if (selectedDay.value === "ทั้งเดือน") {
      totalExpenseMonth.value = data.total;
    } else {
      totalExpenseDay.value = data.total;
    }
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};

const allCalendarEvents = computed(() => {
  return [
    ...calendarEvents.value.map((e) => ({
      ...e,
      className: "expense-event",
    })),
    ...calendarEventsIncome.value.map((e) => ({
      ...e,
      className: "income-event",
    })),
  ];
});

// Date click handler
const onDateClick = async (info) => {
  const clickedDate = new Date(info.dateStr);
  selectedDay.value = clickedDate.getDate();
  selectedMonth.value = clickedDate.getMonth() + 1;
  selectedYear.value = clickedDate.getFullYear();

  await Promise.all([
    fetchExpensesForDay(
      selectedYear.value,
      selectedMonth.value,
      selectedDay.value
    ),
    fetchIncomeForDay(
      selectedYear.value,
      selectedMonth.value,
      selectedDay.value
    ),
  ]);
};

// Calendar config
const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: allCalendarEvents,
  dateClick: onDateClick,
  initialDate: new Date(
    selectedYearForChart.value,
    selectedMonthForChart.value - 1,
    1
  ),
});

// Initial load
onMounted(async () => {
  const today = new Date();
  selectedDay.value = today.getDate();
  selectedMonth.value = today.getMonth() + 1;
  selectedYear.value = today.getFullYear();

  await Promise.all([
    fetchDailyTotals(),
    fetchIncomeDailyTotals(),
    fetchExpensesForDay(
      selectedYear.value,
      selectedMonth.value,
      selectedDay.value
    ),
    fetchIncomeForDay(
      selectedYear.value,
      selectedMonth.value,
      selectedDay.value
    ),
    fetchExpensesInChart(
      selectedYearForChart.value,
      selectedMonthForChart.value
    ),
    fetchIncomeInChart(selectedYearForChart.value, selectedMonthForChart.value),
    // setIncome(selectedYearForChart.value, selectedMonthForChart.value),
    // setExpense(selectedYearForChart.value, selectedMonthForChart.value)
  ]);
});
</script>
<style scoped>
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
