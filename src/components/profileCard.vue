<template>
  <div class="profile-card">
    <img
      src="https://s2.svgbox.net/materialui.svg?ic=edit&color=fff"
      class="edit-icon"
      width="25"
      height="25"
      @click="$emit('edit', user)"
    />

    <!-- PROFILE AVATAR -->
    <div class="avatar">
      <img v-if="user.gender === 'male'" src="../assets/avatar2.png" />
      <img v-else src="../assets/avatar10.png" alt="" />
      <p class="gender">{{ user.gender }}</p>
    </div>

    <!-- PROFILE USERNAME -->
    <h1 class="username">{{ user.name }}</h1>

    <!-- PROFILE TAGS (AGE & EYECOLOR)-->
    <div class="tags">
      <div class="tag">
        <p>{{ user.age }}</p>
        <p>Age</p>
      </div>

      <div class="rule"></div>

      <div class="tag">
        <p>{{ user.eyeColor }}</p>
        <p>Eye Color</p>
      </div>
    </div>

    <!-- PROFILE TAG (FRUIT AND PET) -->
    <div class="tags">
      <img
        src="https://s2.svgbox.net/octicons.svg?ic=heart&color=113255"
        width="12"
        height="12"
        class="location-icon"
      />

      <div class="tag">
        <p>
          {{ user.preferences.pet !== "none" ? user.preferences.pet : "—" }}
        </p>
        <p>Pet</p>
      </div>

      <div class="rule"></div>

      <div class="tag">
        <p>{{ user.preferences.fruit }}</p>
        <p>Fruit</p>
      </div>
    </div>

    <!-- PROFILE TAG (location) -->
    <div class="tags location">
      <img
        src="https://s2.svgbox.net/octicons.svg?ic=location&color=113255"
        width="12"
        height="12"
        class="location-icon"
      />

      <div class="tag">
        <p>{{ user.location.latitude }}</p>
        <p>Latitude</p>
      </div>

      <div class="rule"></div>

      <div class="tag">
        <p>{{ user.location.longitude }}</p>
        <p>Longitude</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileCard",

  props: ["user"],
};
</script>

<style scoped>
.profile-card {
  border-radius: 10px;
  background: #113255;
  width: 22%;
  padding: 15px;
  color: #fff;
  margin-right: 4%;
  margin-bottom: 30px;
  transition: transform ease-in-out 0.3s;
  position: relative;
}

.edit-icon {
  position: absolute;
  left: calc(100% - 40px);
  top: 10px;
  cursor: pointer;
}

.profile-card:nth-child(4n) {
  margin-right: 0;
}

.profile-card:hover {
  transform: scale(0.97);
}

.avatar {
  width: 25%;
  margin: auto;
}

.avatar img {
  width: 100%;
  aspect-ratio: 1/1;
}

.gender {
  background: rgb(67, 68, 66);
  padding: 4px;
  border-radius: 6px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  transform: translateY(-8px);
  width: 80%;
  margin: auto;
}

.username {
  font-size: 1.2rem;
  text-align: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 6px;
  height: 40px;
  width: 70%;
  margin: 10px auto;
  color: #113255;
  position: relative;
}

.location {
  height: 45px;
  width: 90%;
}

.rule {
  width: 0.8px;
  height: 90%;
  background: #113255;
}

.tag {
  width: 40%;
  margin: auto;
  text-align: center;
}

.tag p:nth-child(1) {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2px;
}
.tag p:nth-child(2) {
  font-size: 0.75rem;
  color: #464f58;
}

.location-icon {
  position: absolute;
  left: 5px;
}

@media screen and (max-width: 1100px) {
  .profile-card {
    width: 31%;
  }

  .profile-card:nth-child(1n) {
    margin-right: 3.5%;
  }

  .profile-card:nth-child(3n) {
    margin-right: 0;
  }
}

@media screen and (max-width: 920px) {
  .profile-card {
    width: 49%;
  }
  .profile-card:nth-child(1n) {
    margin-right: 2%;
  }
  .profile-card:nth-child(2n) {
    margin-right: 0;
  }
}

@media screen and (max-width: 620px) {
  .profile-card {
    width: 68%;
  }

  .profile-card:nth-child(1n) {
    margin: 0 auto 30px auto;
  }
}

@media screen and (max-width: 580px) {
  .profile-card {
    width: 78%;
  }
}

@media screen and (max-width: 420px) {
  .profile-card {
    width: 88%;
  }
}

@media screen and (max-width: 320px) {
  .profile-card {
    width: 98%;
  }
}
</style>
