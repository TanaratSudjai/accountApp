<template>
  <canvas ref="canvas"></canvas>
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
            backgroundColor: "rgba(2, 132, 199, 0.1)",
            borderColor: "#0284C7",
            borderWidth: 1,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#0284C7",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "#0284C7",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 3,
          },
          {
            label: "ค่าใช้จ่าย",
            data: props.expense,
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderColor: "#EF4444",
            borderWidth: 1,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#EF4444",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "#fffff",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "รายได้และรายจ่ายรายเดือน",
            font: {
              size: 16,
              weight: 'bold',
              family: "Noto Sans Thai",
            },
            color: 'oklch(50% 0.134 242.749)',
            padding: {
              bottom: 2,
            },
          },
          legend: {
            position: "top",
            align: 'end',
            labels: {
              color: 'oklch(55.1% 0.027 264.364)',
              font: {
                size: 12,
                weight: '500',
              },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 29,
            },
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: 'oklch(55.1% 0.027 264.364)',
            bodyColor: 'oklch(55.1% 0.027 264.364)',
            borderColor: 'oklch(50% 0.134 242.749)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ฿${ctx.formattedValue}`,
              afterLabel: (ctx) => {
                const total = ctx.chart.data.datasets.reduce((sum, dataset) => {
                  return sum + (dataset.data[ctx.dataIndex] || 0);
                }, 0);
                if (ctx.datasetIndex === 1) {
                  const profit = props.income[ctx.dataIndex] - props.expense[ctx.dataIndex];
                  return `กำไร/ขาดทุน: ฿${profit >= 0 ? '+' : ''}${profit.toLocaleString()}`;
                }
                return '';
              }
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(75, 85, 99, 0.3)',
              drawBorder: false,
            },
            ticks: {
              color: 'oklch(55.1% 0.027 264.364)',
              font: {
                size: 12,
                weight: '500',
              },
              padding: 10,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(75, 85, 99, 0.3)',
              drawBorder: false,
            },
            ticks: {
              color: 'oklch(55.1% 0.027 264.364)',
              font: {
                size: 12,
                weight: '500',
              },
              padding: 15,
              callback: (value) => '฿' + value.toLocaleString(),
            },
          },
        },
        elements: {
          line: {
            borderJoinStyle: 'round',
            borderCapStyle: 'round',
          },
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart',
        },
      },
    });
  }
});
</script>

<style scoped>
canvas {
  height: 400px !important;
}
</style>