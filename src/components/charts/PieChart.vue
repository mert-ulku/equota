<template>
 <Pie
  :chartData="chartData"
  :chartOptions=" {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }"
 />
</template>

<script>

  import { Pie } from 'vue-chartjs/legacy'

  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

  export default {
    name: 'PieChart',
    components: { 
      Pie 
    },
    props: {
      chartData: {
        type: Object,
        default: () => ({})
      }
    }
  }

</script>

