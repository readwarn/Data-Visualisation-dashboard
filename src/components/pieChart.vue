<script>
import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Pie,

  mixins: [reactiveProp],

  name: "PieChart",

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: "#eee",
            fontSize: 14,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },

  mounted() {
    // this.addPlugin(ChartJsPluginDataLabels);
    this.renderChart(this.chartData, this.options);
  },
};
</script>
