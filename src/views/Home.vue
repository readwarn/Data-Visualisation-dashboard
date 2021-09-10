<template>
  <div>
    <nav-bar />
    <div class="home">
      THIS IS THE HOMEPAGE
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
      
    };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
}
</style>
