<template>
  <BackComponents />
  <div class="bg-white max-w-7xl mx-auto overflow-hidden p-3">
    <div class="overflow-x-auto">
      <div class="">
        <div class="flex gap-2 justify-between items-center">
          <div class="flex gap-2">
            <button v-if="page === `report`" @click="hideZeroRows = !hideZeroRows"
              class="text-nowrap px-2 py-1 border-b-2 border-sky-600 text-gray-700 hover:bg-sky-20 hover:text-sky-700  text-xs md:text-md lg:text-lg">
              {{ hideZeroRows ? "แสดงทั้งหมด" : "ซ่อนแถวที่เป็นศูนย์" }}
            </button>
            <button @click="page = page === 'report' ? 'graph' : 'report'"
              class="text-nowrap px-2 py-1 border-b-2 border-sky-600 text-gray-700 hover:bg-sky-20 hover:text-sky-700  text-xs md:text-md lg:text-lg">
              {{ page === "report" ? "ดูกราฟรายงาน" : "ดูตารางรายงาน" }}
            </button>
          </div>
          <div class="" v-if="page == 'report'">
            <button
              class="px-0.5 py-1 bg-sky-600 text-white rounded text-xs md:text-md lg:text-lg flex justify-center items-center gap-1">
              <FileDown color="white" :size="18" />
              <span class="px-0.5 py-1 bg-sky-600 text-white rounded text-xs">Export ใบรายงาน</span>
            </button>
          </div>
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
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              รายการทั้งหมด
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              1
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              2
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              3
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              4
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              5
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              6
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              7
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              8
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              9
            </th>
            <th class="p-1 md:p-2 lg:p-3  font-normal text-gray-900 border-b text-nowrap text-xs text-left">
              10
            </th>
            <th class="p-1 md:p-2 lg:p-3 text-xs font-normal text-gray-900 border-b text-nowrap  text-left">
              11
            </th>
            <th class="p-1 md:p-2 lg:p-3 text-xs font-normal text-gray-900 border-b text-nowrap text-left">
              12
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody>
          <tr v-for="(row, index) in filteredReport" :key="row.label" :class="[
            'transition-colors duration-200 text-nowrap text-xs text-left',
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
          ]">
            <!-- Label เช่น 1_6_7+64+90 (เงินสด) -->
            <td class="px-3 py-2 border-r font-normal text-xs text-left">
              {{ row.label }}
            </td>

            <!-- เดือนที่ 1 ถึง 12 -->
            <td v-for="month in 12" :key="month" class="px-3 py-2 border-r text-right text-xs">
              {{ formatNumber(row.values[month] || 0) }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- graph -->
      <div v-else class="mt-2">
        <p class="text-gray-500 text-center mb-4">กราฟรายงานจะถูกแสดงที่นี่</p>
        <div class="">
          <data-graph-report :income="income_graph" :expense="expense_graph" :mounth="mounth_value"></data-graph-report>
        </div>
        <div class="mt-3 p-2 md:mt-6 md:p-3 bg-white  rounded-lg">
          <h2 class="text-md md: text-md md:text-lg lg:text-xl lg:text-xl font-semibold text-gray-800 mb-4">
            วิธีการอ่านและวิเคราะห์กราฟรายได้และรายจ่ายทางการบัญชี
          </h2>
          <p class="text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            กราฟรายได้และรายจ่ายเป็นเครื่องมือสำคัญในการวิเคราะห์สถานะทางการเงินของธุรกิจหรือบุคคล
            ช่วยให้เข้าใจภาพรวมของการเงินได้อย่างชัดเจนและรวดเร็ว บทความนี้จะอธิบายวิธีการดูและวิเคราะห์กราฟอย่างง่าย ๆ
            เพื่อให้คุณสามารถตีความข้อมูลได้อย่างมีประสิทธิภาพ
          </p>

          <h3 class="text-md md: text-md md:text-lg lg:text-xl lg:text-xl font-medium text-gray-700 mt-6 mb-3">1.
            ทำความเข้าใจส่วนประกอบของกราฟ</h3>
          <p class="text-gray-600 mb-3 text-md md:text-lg lg:text-xl">
            กราฟรายได้และรายจ่ายมักประกอบด้วยองค์ประกอบหลักดังนี้</p>
          <ul
            class="list-disc list-inside text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl text-xs md:text-md lg:text-lg">
            <li><strong>แกน X (แนวนอน):</strong> มักแสดงช่วงเวลา เช่น เดือน ไตรมาส หรือปี</li>
            <li><strong>แกน Y (แนวตั้ง):</strong> แสดงจำนวนเงิน เช่น รายได้หรือรายจ่าย (หน่วยเป็นบาท, ดอลลาร์,
              หรือสกุลเงินอื่น)</li>
            <li><strong>เส้นหรือแท่งกราฟ:</strong>
              <ul class="list-circle list-inside ml-4">
                <li>เส้น/แท่งสีหนึ่งอาจแทน <strong>รายได้ (Income)</strong></li>
                <li>อีกสีหนึ่งอาจแทน <strong>รายจ่าย (Expense)</strong></li>
                <li>บางกราฟอาจแสดง <strong>กำไรสุทธิ (Net Profit)</strong> ซึ่งคำนวณจาก รายได้ - รายจ่าย</li>
              </ul>
            </li>
          </ul>

          <h3 class="font-medium text-gray-700 mt-6 mb-3 text-md md:text-lg lg:text-xl">2. ขั้นตอนการวิเคราะห์กราฟ</h3>
          <h4 class="text-xs md:text-md lg: text-md md:text-lg lg:text-xl font-medium text-gray-600 mt-4 mb-2">
            ขั้นตอนที่ 1: ดูภาพรวมของกราฟ</h4>
          <ul class="list-disc list-inside text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            <li>ตรวจสอบช่วงเวลาที่กราฟครอบคลุม เช่น กราฟแสดงข้อมูลรายเดือนหรือรายปี</li>
            <li>สังเกตแนวโน้มของเส้นหรือแท่งกราฟ:
              <ul class="list-circle list-inside ml-4">
                <li>รายได้เพิ่มขึ้นหรือลดลงในช่วงเวลาใด</li>
                <li>รายจ่ายมีการเปลี่ยนแปลงอย่างไร</li>
                <li>มีช่วงเวลาใดที่รายจ่ายสูงกว่ารายได้หรือไม่</li>
              </ul>
            </li>
          </ul>

          <h4 class="text-xs md:text-md lg: text-md md:text-lg lg:text-xl font-medium text-gray-600 mt-4 mb-2">
            ขั้นตอนที่ 2: เปรียบเทียบรายได้และรายจ่าย</h4>
          <ul class="list-disc list-inside text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            <li>ดูว่ารายได้และรายจ่ายมีความสัมพันธ์กันอย่างไร</li>
            <li>หากรายได้สูงกว่ารายจ่าย แปลว่าธุรกิจหรือการเงินส่วนบุคคลมีกำไร</li>
            <li>หากรายจ่ายสูงกว่ารายได้ อาจบ่งชี้ถึงปัญหาการเงินที่ต้องแก้ไข</li>
          </ul>

          <h4 class="text-xs md:text-md lg: text-md md:text-lg lg:text-xl font-medium text-gray-600 mt-4 mb-2">
            ขั้นตอนที่ 3: วิเคราะห์จุดผิดปกติ</h4>
          <p class="text-gray-600 mb-4">
            สังเกตจุดที่กราฟมีการเปลี่ยนแปลงอย่างมาก เช่น รายได้พุ่งสูงขึ้นหรือรายจ่ายเพิ่มขึ้นกะทันหัน วิเคราะห์สาเหตุ
            เช่น การเพิ่มขึ้นของยอดขาย หรือค่าใช้จ่ายพิเศษ (เช่น ค่าซ่อมบำรุง)
          </p>

          <h4 class="text-xs md:text-md lg: text-md md:text-lg lg:text-xl font-medium text-gray-600 mt-4 mb-2">
            ขั้นตอนที่ 4: ใช้กราฟในการตัดสินใจ</h4>
          <ul class="list-disc list-inside text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            <li>หากรายจ่ายสูงเกินไป อาจต้องพิจารณาลดค่าใช้จ่ายที่ไม่จำเป็น</li>
            <li>หากรายได้เพิ่มขึ้นอย่างต่อเนื่อง อาจเป็นโอกาสในการขยายธุรกิจหรือลงทุนเพิ่ม</li>
          </ul>

          <h3 class=" text-md md:text-lg lg:text-xl font-medium text-gray-700 mt-6 mb-3">3. ตัวอย่างการตีความกราฟ</h3>
          <p class="text-gray-600 mb-3">สมมติว่ากราฟแสดงข้อมูลรายเดือน:</p>
          <ul class="list-disc list-inside text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            <li>เดือนมกราคม: รายได้ 100,000 บาท, รายจ่าย 80,000 บาท → กำไร 20,000 บาท</li>
            <li>เดือนกุมภาพันธ์: รายได้ 120,000 บาท, รายจ่าย 90,000 บาท → กำไร 30,000 บาท</li>
            <li>เดือนมีนาคม: รายได้ 90,000 บาท, รายจ่าย 100,000 บาท → ขาดทุน 10,000 บาท</li>
          </ul>
          <p class="text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            จากตัวอย่าง:
          <ul class="list-disc list-inside text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            <li>เดือนกุมภาพันธ์มีกำไรสูงสุด ควรวิเคราะห์ว่าอะไรทำให้รายได้เพิ่มขึ้น</li>
            <li>เดือนมีนาคมขาดทุน ควรตรวจสอบสาเหตุของรายจ่ายที่สูงขึ้น เช่น ค่าใช้จ่ายที่ไม่คาดคิด</li>
          </ul>
          </p>

          <h3 class=" text-md md:text-lg lg:text-xl font-medium text-gray-700 mt-6 mb-3">4. เคล็ดลับเพิ่มเติม</h3>
          <ul class="list-disc list-inside text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            <li><strong>เปรียบเทียบกับงบประมาณ:</strong> หากมีงบประมาณที่ตั้งไว้
              เปรียบเทียบกราฟกับงบประมาณเพื่อดูว่าการเงินเป็นไปตามเป้าหมายหรือไม่</li>
            <li><strong>ใช้สีและป้ายกำกับ:</strong> ตรวจสอบว่ากราฟมีป้ายกำกับชัดเจน เช่น สีเขียวสำหรับรายได้
              สีแดงสำหรับรายจ่าย เพื่อให้อ่านง่าย</li>
            <li><strong>ตรวจสอบหน่วย:</strong> ตรวจสอบว่าหน่วยเงินและช่วงเวลาในกราฟถูกต้องหรือไม่
              เพื่อหลีกเลี่ยงการตีความผิด</li>
          </ul>

          <h3 class=" text-md md:text-lg lg:text-xl font-medium text-gray-700 mt-6 mb-3">5. การนำไปใช้จริง</h3>
          <p class="text-gray-600 mb-3">กราฟรายได้และรายจ่ายสามารถช่วยในการวางแผนการเงิน เช่น:</p>
          <ul class="list-disc list-inside text-gray-600 mb-4 text-xs md:text-md lg: text-md md:text-lg lg:text-xl">
            <li><strong>วางแผนงบประมาณ:</strong> ใช้ข้อมูลจากกราฟเพื่อกำหนดงบประมาณในอนาคต</li>
            <li><strong>ตรวจจับปัญหา:</strong> ช่วยระบุช่วงเวลาที่การเงินมีปัญหา เช่น รายจ่ายสูงเกินไป</li>
            <li><strong>สื่อสารกับทีม:</strong> ใช้กราฟในการนำเสนอข้อมูลทางการเงินให้ทีมหรือผู้มีส่วนได้ส่วนเสีย</li>
          </ul>

          <p class="text-gray-600">
            ด้วยการทำความเข้าใจและวิเคราะห์กราฟอย่างถูกต้อง
            คุณจะสามารถตัดสินใจทางการเงินได้อย่างมีประสิทธิภาพและนำไปสู่การบริหารการเงินที่ยั่งยืน
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { FileDown, } from "lucide-vue-next";


const { formatNumber } = useFormatNumber();
const report = ref([]);
const { api } = useApi();
const flattenedReport = ref([]);
const income_graph = ref<number[]>(Array(12).fill(0));
const expense_graph = ref<number[]>(Array(12).fill(0));
const mounth_value = ref<number[]>([]);
const page = ref("report");

const fetchReport = async () => {
  const response = await api.get("/getClosedAccount");
  const data = response.data;
  console.log("Response data:", data);

  income_graph.value = Array(12).fill(0);
  expense_graph.value = Array(12).fill(0);
  mounth_value.value = [];

  data.forEach((item: any) => {
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

  const parsed = data.map((item) => {
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
