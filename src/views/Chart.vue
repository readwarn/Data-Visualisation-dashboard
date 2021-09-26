<template>
  <div class="chart-page">
    <!-- NAVBAR TO SHOW CHART NAV-LINK -->
    <nav-bar chart />

    <div class="chart-content">
      <page-loader v-if="loading || map_loading" />

      <!-- FILTER TYPE -->
      <select
        v-if="getChartType !== 'geo'"
        name="filter"
        id="filter"
        v-model="filter_type"
        class="filter-type"
      >
        <option
          v-for="(option, index) in filter_options"
          :key="index"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>

      <bar-chart v-if="getChartType === 'bar'" :chartData="getRawPeopleData" />

      <pie-chart v-if="getChartType === 'pie'" :chartData="getRawPeopleData" />

      <geo-chart
        @mapLoading="map_loading = true"
        @mapLoaded="map_loading = false"
        :locations="generateLocationDataTable"
        v-if="getChartType === 'geo'"
      />
    </div>
  </div>
</template>

<script>
import barChart from "@/components/barChart";
import pieChart from "@/components/pieChart";
import geoChart from "@/components/geoChart";
import navBar from "@/components/navBar";
import pageLoader from "@/components/pageLoader";
import { mapGetters, mapActions } from "vuex";
import {
  getKeyValue,
  getPeopleData,
  getPeopleLabels,
  getPeopleDataset,
  generateLocationDataTable,
} from "../../src/services";

export default {
  name: "Chart",

  components: {
    barChart,
    pieChart,
    navBar,
    pageLoader,
    geoChart,
  },

  mounted() {
    //get data from the server if not loaded already
    if (!this.getPeople.length) this.fetchPeople();
  },

  computed: {
    ...mapGetters(["getPeople", "getChartType"]),

    getFilterType() {
      return this.filter_type.split(".").pop();
    },

    getPeopleData() {
      return getPeopleData(this.filter_type, this.getPeople);
    },

    getPeopleLabels() {
      return getPeopleLabels(this.getPeopleData);
    },

    getPeopleDataset() {
      return getPeopleDataset(this.getPeopleData);
    },

    getRawPeopleData() {
      // This data is passed to the bar/pie chart component.
      // Labels is the array of unique value of a specific key in the people data.
      // Data is the frequency of each label

      return {
        labels: this.getPeopleLabels,
        datasets: [
          {
            label: "Suade People",
            backgroundColor: this.getBg,
            borderWidth: 0.4,
            data: this.getPeopleDataset,
          },
        ],
      };
    },

    getBg() {
      //generate a random background color for each label
      let bg = [];
      this.getPeopleLabels.forEach(() => {
        bg.push(this.generateRandomColor());
      });

      return bg;
    },

    generateLocationDataTable() {
      return generateLocationDataTable(this.getPeople);
    },
  },

  data() {
    return {
      map_loading: false,
      loading: false,
      chart_type: "bar",
      filter_type: "age",
      filter_options: [
        { name: "Age", value: "age" },
        { name: "Gender", value: "gender" },
        { name: "Eye color", value: "eyeColor" },
        { name: "Pet", value: "preferences.pet" },
        { name: "Fruit", value: "preferences.fruit" },
      ],
    };
  },

  methods: {
    ...mapActions(["getPeopleFromServer"]),

    fetchPeople() {
      this.loading = true;
      this.getPeopleFromServer()
        .then((response) => {
          this.loading = false;
          console.log("people data", response);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    generateRandomNumber(max) {
      return Math.floor(Math.random() * max);
    },

    generateRandomColor() {
      let r = this.generateRandomNumber(255);
      let g = this.generateRandomNumber(255);
      let b = this.generateRandomNumber(255);
      return `rgb(${r},${g},${b})`;
    },

    getKeyValue(key, object) {
      return getKeyValue(key, object);
    },
  },
};
</script>
<style scoped>
.chart-page {
  padding-top: 70px;
}

.chart-content {
  width: 95%;
  margin: auto;
  padding: 25px 35px;
  background: #113255;
  border-radius: 15px;
  position: relative;
}

.filter-type {
  outline: 0;
  border: 1.5px solid #fff;
  border-radius: 7px;
  padding: 5px 10px;
  font-size: 0.9em;
  font-weight: 600;
  display: block;
  margin-left: auto;
  margin-bottom: 20px;
  color: #fff;
  background: #113255;
  cursor: pointer;
}

@media screen and (max-width: 720px) {
  .chart-content {
    padding: 20px;
  }
}
</style>
