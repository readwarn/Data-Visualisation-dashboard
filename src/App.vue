<template>
  <div id="app">
    <!-- Toast alert shown after a 'new-toast' event is fired anywhere in the app -->
    <toast-alert
      v-if="alert.message"
      :alert="alert"
      @close="alert.message = ''"
    />
    <router-view />
  </div>
</template>

<script>
import toastAlert from "@/components/toastAlert";
export default {
  name: "App",

  components: {
    toastAlert,
  },

  created() {
    // this listens for 'new-toast' event from anywhere in the app
    this.$bus.$on("new-toast", ({ message, type }) => {
      this.createToast(message, type);

      //  hides the toast alert after .5 secs
      setTimeout(() => {
        this.alert.message = "";
      }, 3500);
    });
  },

  data() {
    return {
      alert: {
        message: "",
        type: "",
      },
    };
  },

  methods: {
    createToast(message, type) {
      this.alert = {
        message,
        type,
      };
    },
  },

  metaInfo: {
    title: "Suade",
    titleTemplate: "Suade - Rilwan",
    script: [
      {
        src: "https://www.gstatic.com/charts/loader.js",
        type: "text/javascript",
      },

      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.5.0/chartjs-plugin-datalabels.min.js",
        type: "text/javascript",
      },
    ],
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: 0;
}
body {
  font-family: "PT Sans", sans-serif;
  background: #d5d5d5;
  position: relative;
  overflow-x: hidden;
}
</style>
