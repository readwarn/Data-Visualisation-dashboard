<template>
  <nav>
    <!-- SUADE BRAND -->
    <router-link :to="{ name: 'Home' }" class="brand">
      <span class="brand">
        <img
          src="https://suade.org/assets/images/logo-suade-circle.svg"
          alt="brand"
        />
        SUADE
      </span>
    </router-link>

    <div class="right-links">
      <router-link
        :active-class="'active-link'"
        :to="{ name: 'People', params: { page: 1 } }"
      >
        People
      </router-link>

      <!-- THIS NAVLINK WONT SHOW ON THE CHART PAGE -->
      <router-link :to="{ name: 'Chart' }" v-if="!chart">
        Chart
      </router-link>

      <!-- THIS NAVLINK WILL ONLY SHOW ON THE CHART PAGE AND NOT PEOPLE PAGE -->
      <select
        name="chart"
        id="chart"
        :value="getChartType"
        class="chart-type"
        @change="updateChart($event.target.value)"
        v-if="chart"
      >
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="geo">Geo Chart</option>
      </select>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navBar",

  props: {
    chart: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters(["getChartType"]),
  },

  methods: {
    ...mapActions(["updateChartType"]),

    // UPDATE CHART TYPE IN THE VUE STORE
    updateChart(chart_type) {
      this.updateChartType(chart_type);
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1.5px solid #113255;
  margin-bottom: 15px;
  position: fixed;
  top: 0;
  left: 0;
}

nav a {
  text-decoration: 0;
  color: #113255;
}

.active-link {
  font-weight: 600;
}

span.brand {
  display: flex;
  align-items: center;
  padding: 2px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #113255;
  letter-spacing: 2px;
}

span.brand img {
  width: 27px;
  height: 27px;
  margin-right: 10px;
}

.right-links {
  display: flex;
  align-items: center;
}

.right-links a {
  margin-right: 40px;
}

.right-links a:last-child {
  margin-right: 0;
}

.chart-type {
  font-size: 0.9rem;
  font-weight: 600;
  outline: 0;
  border: 0;
  color: #113255;
  cursor: pointer;
  background: 0;
}

.chart-type option {
  font-size: 0.9rem;
}

@media screen and (max-width: 720px) {
  nav {
    padding: 10px;
  }

  .right-links a {
    margin-right: 20px;
    font-size: 0.9rem;
  }
}
</style>
