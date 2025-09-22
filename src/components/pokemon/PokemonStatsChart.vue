<template>
  <v-card-text style="width: 400px">
    <BarChart :data="chartData" :options="chartOptions" />
  </v-card-text>
</template>

<script>
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'PokemonStatsBarChart',
  components: { BarChart: Bar },

  data() {
    return {
      infoPokemonStore: useInfoPokemonStore()
    }
  },

  computed: {
    stats() {
      return this.infoPokemonStore.pokemon?.stats
    },

    chartData() {
      return {
        labels: this.stats.map(stat => this.formatStatName(stat.stat.name)),
        datasets: [
          {
            data: this.stats.map(stat => stat.base_stat),
            backgroundColor: 'rgba(0,194,255)',
            borderColor: 'rgba(0,194,255)',
            borderWidth: 1
          }
        ]
      }
    },

    chartOptions() {
      return {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    }
  },

  methods: {
    formatStatName(name) {
      return name
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    }
  }
}
</script>
