<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Bar,

  mixins: [reactiveProp],

  name: "BarChart",

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
                borderWidth: 0.1,
                fontColor: "#eee",
              },
              gridLines: {
                color: "grey",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "#eee",
              },
              gridLines: {
                color: "grey",
              },
            },
          ],
        },
      },
    };
  },

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
