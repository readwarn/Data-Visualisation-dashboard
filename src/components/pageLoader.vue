<template>
  <div class="loader-container">
    <img
      src="https://s2.svgbox.net/loaders.svg?ic=spinner&color=113255"
      width="32"
      height="32"
    />
    loading...
  </div>
</template>

<script>
export default {
  name: "PageLoader",
};
</script>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  min-height: 300px;
  height: 100%;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
}
</style>
