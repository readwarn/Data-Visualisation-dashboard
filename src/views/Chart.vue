<template>
  <div class="chart-page">
    <!-- NAVBAR TO SHOW CHART NAV-LINK -->
    <nav-bar chart />

    <div class="chart-content">
      <page-loader v-if="loading" />

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
    if (!this.getPeople.length) this.fetchPeople();
  },

  computed: {
    ...mapGetters(["getPeople", "getChartType"]),

    getFilterType() {
      return this.filter_type.split(".").pop();
    },

    getPeopleData() {
      // THIS FEELS LIKE MAGIC, BUT I WILL TRY MY BEST TO WRITE A COMPREHENSIBLE COMMENT.
      let people_data = {};
      // this object holds a value:frequency pair, of each value of a specific person's key

      // a value:frequency pair is created (with frequency of 1) only if the value doesnt have a frequency yet
      // else, the frequency of that value is incremented by 1

      this.getPeople.forEach((person) => {
        people_data[this.getKeyValue(this.filter_type, person)] = people_data[
          this.getKeyValue(this.filter_type, person)
        ]
          ? people_data[this.getKeyValue(this.filter_type, person)] + 1
          : 1;
      });
      return people_data;
    },

    getPeopleLabels() {
      return Object.keys(this.getPeopleData);
    },

    getPeopleDataset() {
      return Object.values(this.getPeopleData);
    },

    getRawPeopleData() {
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
      let bg = [];
      this.getPeopleLabels.forEach(() => {
        bg.push(this.generateRandomColor());
      });

      return bg;
    },

    generateLocationDataTable() {
      let locations = this.getPeople.map((person) => {
        return [
          person.location.latitude,
          person.location.longitude,
          person.name,
        ];
      });

      locations.splice(0, 0, ["lat", "long", "name"]);
      return locations;
    },
  },

  data() {
    return {
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
      let a = this.generateRandomNumber(255);
      let b = this.generateRandomNumber(255);
      let c = this.generateRandomNumber(255);
      return `rgb(${a},${b},${c})`;
    },

    getKeyValue(key, object) {
      //this returns the value of an object, given a key
      // useful to get value for nested keys
      let prop_key = key.split(".");
      return prop_key.reduce((obj, currentKey) => {
        return obj == undefined ? obj : obj[currentKey];
      }, object);
    },
  },
};
</script>
<style scoped>
.chart-page {
  padding-top: 80px;
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
  border: 0;
  font-size: 0.9rem;
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
