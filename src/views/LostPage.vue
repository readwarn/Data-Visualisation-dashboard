<template>
  <div class="not-found-page">
    <div class="info">
      <h3>Page not found</h3>

      <router-link :to="{ name: 'Home' }">
        <button>Home</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LostPage",
};
</script>

<style scoped>
.not-found-page {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-image: url("../assets/404.svg");
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: 50% 20%;
}

div.info {
  position: relative;
  top: 65%;
}

button {
  outline: 0;
  border: 0;
  width: 130px;
  border-radius: 7px;
  color: #eee;
  background-color: #113255;
  padding: 10px 0;
  display: block;
  margin: auto;
  cursor: pointer;
  transition: background ease-in-out 0.3s;
}

button:hover {
  background: #faa017;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
}

@media screen and (max-width: 600px) {
  .not-found-page {
    background-size: 70% 70%;
  }

  h3 {
    font-size: 1.6rem;
  }
}
</style>
