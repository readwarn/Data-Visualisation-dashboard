<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  metaInfo: {
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
}
</style>
