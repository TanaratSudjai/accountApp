<template>

  <div class="w-full bg-white p-4 rounded-lg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  income: number[];
  expense: number[];
  mounth: number[];
}>();

console.log("Props:", props.income, props.expense, props.mounth);

import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (canvas.value) {
    const labels = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    new Chart(canvas.value, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "รายได้",
            data: props.income,
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            borderColor: "rgba(34, 197, 94, 1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
          {
            label: "รายจ่าย",
            data: props.expense,
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "รายได้และรายจ่ายรายเดือน",
            font: { size: 18 },
          },
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue} บาท`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (v) => v + " บาท",
            },
          },
        },
      },
    });
  }
});
</script>
