<template>
  <div class="geo-chart">
    <div id="chart_div"></div>
  </div>
</template>

<script>
export default {
  name: "geoChart",

  props: {
    locations: {
      type: Array,
      default() {
        return [
          ["Lat", "Long", "Name"],
          [37.4232, -122.0853, "Work"],
          [37.4289, -122.1697, "University"],
          [37.6153, -122.39, "Airport"],
          [37.4422, -122.1731, "Shopping"],
        ];
      },
    },
  },

  mounted() {
    this.renderMap();
  },

  watch: {
    locations(newLocation, oldLocation) {
      if (newLocation !== oldLocation) this.renderMap();
    },
  },

  methods: {
    renderMap() {
      let google = window.google;
      const vm = this;
      vm.$emit("mapLoading");

      google.charts.load("current", {
        packages: ["map"],
        mapsApiKey: "AIzaSyBw8N9ZSCPG1sMJViIYp-cML-SHt_WdSio",
      });

      google.charts.setOnLoadCallback(drawMap);

      function drawMap() {
        // draw map with the geoChart locations prop

        const data = google.visualization.arrayToDataTable(vm.locations);

        const options = {
          showTooltip: true,
          showInfoWindow: true,
          showLine: true,
        };

        const map = new google.visualization.Map(
          document.getElementById("chart_div")
        );

        map.draw(data, options);
        vm.$emit("mapLoaded");
      }
    },
  },
};
</script>

<style scoped>
.geo-chart {
  height: 400px;
  border: #faa017 2px solid;
}

#chart_div {
  height: 100%;
  width: 100%;
}
</style>
