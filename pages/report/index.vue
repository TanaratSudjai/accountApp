<template>
  <div class="bg-white rounded-sm border border-gray-200 overflow-hidden mb-20">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
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
          <tr v-for="row in flattenedReport" :key="row.label">
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const { formatNumber } = useFormatNumber();
const report = ref([]);
const error = ref("");
const { $axios } = useNuxtApp();
const loading = ref(true);

const flattenedReport = ref([]);

const fetchReport = async () => {
  const response = await $axios.get("/getClosedAccount");

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
          const label = `${key} (${typeName})`;

          if (!typeSummary[key]) {
            typeSummary[key] = {
              label,
              values: {},
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

onMounted(() => {
  fetchReport();
});
</script>
