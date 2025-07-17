<template>
  <div class="bg-white overflow-hidden mb-20 p-3">
    <div class="overflow-x-auto">
      <div class="mb-4">
        <div class="flex gap-2">
          <button
            v-if="page === `report`"
            @click="hideZeroRows = !hideZeroRows"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {{ hideZeroRows ? "แสดงทั้งหมด" : "ซ่อนแถวที่เป็นศูนย์" }}
          </button>
          <button
            @click="page = page === 'report' ? 'graph' : 'report'"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {{ page === "report" ? "ดูกราฟรายงาน" : "ดูตารางรายงาน" }}
          </button>
        </div>
        <p v-if="page == 'report'" class="text-sm text-gray-500 my-2">
          แสดง {{ filteredReport.length }} รายการ
        </p>
      </div>
      <table v-if="page == 'report'" class="w-full border-collapse">
        <!-- Table Header -->
        <!-- Table Header -->
        <thead>
          <tr class="">
            <th class="px-6 py-4 text-sm font-semibold text-gray-900 border-b">
              รายการทั้งหมด
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              1
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              2
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              3
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              4
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              5
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              6
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              7
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              8
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              9
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              10
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              11
            </th>
            <th
              class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
            >
              12
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody>
          <tr
            v-for="(row, index) in filteredReport"
            :key="row.label"
            :class="[
              'transition-colors duration-200',
              {
                'bg-yellow-50 hover:bg-yellow-100':
                  row.catId == 1 && index % 2 === 0,
                'bg-yellow-100 hover:bg-yellow-200':
                  row.catId == 1 && index % 2 !== 0,

                'bg-purple-50 hover:bg-purple-100':
                  row.catId == 2 && index % 2 === 0,
                'bg-purple-100 hover:bg-purple-200':
                  row.catId == 2 && index % 2 !== 0,

                'bg-blue-50 hover:bg-blue-100':
                  row.catId == 3 && index % 2 === 0,
                'bg-blue-100 hover:bg-blue-200':
                  row.catId == 3 && index % 2 !== 0,

                'bg-green-50 hover:bg-green-100':
                  row.catId == 4 && index % 2 === 0,
                'bg-green-100 hover:bg-green-200':
                  row.catId == 4 && index % 2 !== 0,

                'bg-pink-50 hover:bg-pink-100':
                  row.catId == 5 && index % 2 === 0,
                'bg-pink-100 hover:bg-pink-200':
                  row.catId == 5 && index % 2 !== 0,
              },
            ]"
          >
            <!-- Label เช่น 1_6_7+64+90 (เงินสด) -->
            <td class="px-6 py-4 border-r font-semibold">
              {{ row.label }}
            </td>

            <!-- เดือนที่ 1 ถึง 12 -->
            <td
              v-for="month in 12"
              :key="month"
              class="px-6 py-4 border-r text-right"
            >
              {{ formatNumber(row.values[month] || 0) }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- graph -->
      <div v-else class="p-4">
        <p class="text-gray-500">กราฟรายงานจะถูกแสดงที่นี่</p>

        <div class="p-2">
          <data-graph-report
            :income="income_graph"
            :expense="expense_graph"
            :mounth="mounth_value"
          >
          </data-graph-report>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const { formatNumber } = useFormatNumber();
const report = ref([]);
const error = ref("");
const { $axios } = useNuxtApp();
const loading = ref(true);
const flattenedReport = ref([]);
const income_graph = ref<number[]>(Array(12).fill(0));
const expense_graph = ref<number[]>(Array(12).fill(0));
const mounth_value = ref<number[]>([]);
const page = ref("report");

const fetchReport = async () => {
  const response = await $axios.get("/getClosedAccount");

  income_graph.value = Array(12).fill(0);
  expense_graph.value = Array(12).fill(0);
  mounth_value.value = [];

  response.data.forEach((item: any) => {
    const monthIndex = new Date(item.account_closing_time).getMonth();

    income_graph.value[monthIndex] = item.account_closing_income;
    expense_graph.value[monthIndex] = item.account_closing_expence;

    if (!mounth_value.value.includes(monthIndex + 1)) {
      mounth_value.value.push(monthIndex + 1);
    }
  });

  console.log("รายได้:", income_graph.value);
  console.log("รายจ่าย:", expense_graph.value);
  console.log("เดือนที่มีข้อมูล:", mounth_value.value);

  const parsed = response.data.map((item) => {
    return {
      ...item,
      parsed_data: JSON.parse(item.account_closing_data),
      month: new Date(item.account_closing_time).getMonth() + 1,
    };
  });

  report.value = parsed;

  // Build typeSummary
  const typeSummary = {};
  parsed.forEach((entry) => {
    const { month, parsed_data } = entry;

    parsed_data.forEach((category) => {
      const catId = category.account_category_id;
      const catName = category.account_category_name;

      category.groups.forEach((group) => {
        const groupId = group.group_id;
        const groupName = group.group_name;

        group.types.forEach((type) => {
          const typeId = type.type_id;
          const typeName = type.type_name;

          const key = `${catId}+${groupId}+${typeId}`;
          const label = `${typeName} (${catId})`;

          if (!typeSummary[key]) {
            typeSummary[key] = {
              label,
              values: {},
              catId: catId,
            };
          }

          typeSummary[key].values[month] =
            (typeSummary[key].values[month] || 0) + type.sum;
        });
      });
    });
  });

  flattenedReport.value = Object.values(typeSummary);
};

const hideZeroRows = ref(false);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const filteredReport = computed(() => {
  if (!hideZeroRows.value) {
    console.log("Showing all rows");
    return flattenedReport.value;
  }
  console.log("Filtering out zero rows");
  return flattenedReport.value.filter((row) => {
    console.log("Checking row:", row);
    return months.some((m) => row.values[m] > 0);
  });
});

onMounted(() => {
  fetchReport();
});

watch(filteredReport, (newVal) => {
  console.log("Filtered rows:", newVal.length);
});
</script>
