<template>
  <div>
    <nav-bar />
    <div class="home">
      <div class="content">
        <div class="about">
          <h3>Data Visualisation dashboard</h3>

          <p class="subtitle">
            A visualisation dashboard of a list of people data, which allows
            users to
          </p>

          <ul>
            <li v-for="(feature, index) in features" :key="index">
              <img
                src="https://s2.svgbox.net/hero-outline.svg?ic=check-circle&color=113255"
                width="20"
                height="20"
              />

              <span>{{ feature }}</span>
            </li>
          </ul>

          <div class="links">
            <router-link :to="{ name: 'People', params: { page: 1 } }">
              <button class="people-button link">People</button>
            </router-link>

            <router-link :to="{ name: 'Chart' }">
              <button class="chart-button link">Chart</button>
            </router-link>
          </div>
        </div>
        <div class="chart-illustration">
          <div class="circle"></div>
          <div class="circle bigger-circle"></div>
        </div>
      </div>

      <div class="copyright">
        <p>© 2021 Rilwan. All rights reserved.</p>

        <a href="https://github.com">
          <img
            src="https://s2.svgbox.net/social.svg?ic=github&color=000"
            width="18"
            height="18"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";

export default {
  name: "Home",

  components: {
    navBar,
  },

  data() {
    return {
      features: [
        "See a paginated list of people",
        "Do a full text search to dynamically filter the results (searching on all fields)",
        "Visualise the data as a pie chart",
        "Visualise the data as a bar chart",
        "Visualise the data as a geographical chart",
        " Create dynamic interactions between charts (filtering from chart)",
        "Edit the data with a table or modal",
      ],
    };
  },
};
</script>

<style scoped>
.home {
  font-size: 1.8rem;
  padding: 80px 8% 15px 8%;
  min-height: 100vh;
  background: url("../assets/foot.png");
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-position: right bottom;
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 25px;
}

.about,
.chart-illustration {
  width: 47%;
}

.chart-illustration {
  background: url("../assets/people.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 275px;
  position: relative;
}

.circle {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: #faa017;
  position: absolute;
  left: 0;
  top: calc(100% - 100px);
  z-index: -1;
}

.bigger-circle {
  height: 150px;
  width: 150px;
  background: #113255;
  top: 0;
  left: calc(100% - 150px);
}

h3 {
  color: #113255;
  margin-bottom: 15px;
}

p.subtitle {
  font-size: 1rem;
}

ul {
  list-style: none;
  margin-top: 20px;
}

ul li {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  line-height: 175%;
}

ul li img {
  margin-right: 10px;
}

div.links {
  margin: 30px 0;
}

button.link {
  outline: 0;
  border: 0;
  border-radius: 7px;
  padding: 10px 0;
  width: 120px;
  cursor: pointer;
}

button.link:hover {
  filter: brightness(1.2);
}

.people-button {
  background: #113255;
  margin-right: 25px;
  color: #fff;
}

.chart-button {
  color: #113255;
  background: #faa017;
}

.copyright {
  display: flex;
  justify-content: center;
  margin-top: auto;
  font-size: 0.9rem;
}

.copyright p {
  margin-right: 10px;
}

@media screen and (max-width: 600px) {
  .home {
    padding: 60px 4% 15px 4%;
    background-size: 100% 35%;
  }

  .about {
    width: 100%;
  }
  .chart-illustration {
    display: none;
  }
}
</style>
