<template>
  <div class="profile-edit smooth-drop" @keyup.enter="saveUser">
    <div class="profile-heading">
      <h4>Profile</h4>

      <img
        src="https://s2.svgbox.net/hero-outline.svg?ic=x&color=113255"
        width="25"
        height="25"
        class="close-icon"
        @click="$emit('close')"
      />
    </div>

    <!-- GENDER-BASED AVATAR -->
    <div class="avatar">
      <img v-if="gender === 'male'" src="../assets/avatar2.png" />
      <img v-else src="../assets/avatar10.png" alt="" />
    </div>

    <div class="group-form">
      <div class="input-field">
        <label for="first-name" class="input-label">First Name</label>
        <input type="text" id="first-name" v-model="first_name" />
      </div>

      <div class="input-field">
        <label for="last-name" class="input-label">Last Name</label>
        <input type="text" id="last-name" v-model="last_name" />
      </div>
    </div>

    <div class="group-form">
      <div class="input-field">
        <label class="input-label">Gender</label>

        <label for="male" class="radio-field">
          <input
            type="radio"
            id="male"
            name="gender"
            v-model="gender"
            value="male"
          />
          <label class="inline-label" for="male">Male</label>
        </label>
      </div>

      <div class="input-field" for="male">
        <label for="female" class="radio-field">
          <input
            type="radio"
            id="female"
            name="gender"
            v-model="gender"
            value="female"
          />
          <label class="inline-label" for="female">Female</label>
        </label>
      </div>
    </div>

    <div class="group-form">
      <div class="input-field">
        <label for="age" class="input-label">Age</label>
        <input type="number" id="age" v-model="age" />
      </div>

      <div class="input-field">
        <label for="eye" class="input-label">Eye Color</label>
        <input type="text" id="eye" v-model="eye_color" />
      </div>
    </div>

    <div class="group-form">
      <div class="input-field">
        <label for="pet" class="input-label">Pet</label>
        <input type="text" id="pet" v-model="pet" />
      </div>

      <div class="input-field">
        <label for="fruit" class="input-label">Fruit</label>
        <input type="text" id="fruit" v-model="fruit" />
      </div>
    </div>

    <div class="group-form">
      <div class="input-field">
        <label for="lat" class="input-label">Latitude</label>
        <input type="number" id="lat" v-model="latitude" />
      </div>

      <div class="input-field">
        <label for="long" class="input-label">Longitude</label>
        <input type="number" id="long" v-model="longitude" />
      </div>
    </div>

    <button class="save" @click="saveUser">
      SAVE
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "editProfileCard",

  props: ["user"],

  computed: {
    getUpdatedUser() {
      return {
        age: this.age,
        eyeColor: this.eye_color,
        gender: this.gender,
        location: {
          latitude: this.latitude,
          longitude: this.longitude,
        },
        name: this.first_name + " " + this.last_name,
        preferences: {
          pet: this.pet,
          fruit: this.fruit,
        },
        _id: this.user._id,
      };
    },
  },

  data() {
    return {
      first_name: this.user.name.split(" ")[0],
      last_name: this.user.name.split(" ")[1],
      gender: this.user.gender,
      age: this.user.age,
      eye_color: this.user.eyeColor,
      pet: this.user.preferences.pet,
      fruit: this.user.preferences.fruit,
      latitude: this.user.location.latitude,
      longitude: this.user.location.longitude,
    };
  },

  methods: {
    ...mapActions(["updatePerson"]),

    saveUser() {
      //UPDATE THE USER DETAILS AND CLOSE THE MODAL
      this.updatePerson(this.getUpdatedUser);
      this.$emit("close");

      let message = "User profile updated";
      let type = "success";

      // fires a 'new-toast' event
      this.$bus.$emit("new-toast", { message, type });
    },
  },
};
</script>

<style scoped>
.profile-edit {
  width: 450px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 15px 30px;
}

.close-icon {
  display: block;
  position: absolute;
  left: calc(100% - 50px);
  cursor: pointer;
}

.profile-heading {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.profile-heading h4 {
  font-size: 16px;
  text-align: center;
  width: 100%;
  color: #113255;
}

.avatar {
  width: 17%;
  margin: 0 auto 15px auto;
}

.avatar img {
  width: 100%;
  aspect-ratio: 1/1;
}

.group-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.input-field {
  width: 48%;
}

.input-label {
  font-size: 0.85rem;
  display: block;
  margin-bottom: 5px;
  color: #113255;
}

.inline-label {
  font-size: 0.9rem;
  display: block;
  color: #113255;
}

.input-field input {
  height: 33px;
  width: 100%;
  outline: 0;
  border: 1px solid #d5d5d5;
  background: transparent;
  border-radius: 5px;
  padding: 0 10px;
}

.radio-field {
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  width: 100%;
  height: 33px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.radio-field input {
  height: 20px;
  width: 20px;
  outline: 0;
  margin-right: 10px;
}

.save {
  outline: 0;
  border: 0;
  background: #faa017;
  height: 35px;
  width: 100px;
  display: block;
  margin-left: auto;
  border-radius: 20px;
  font-weight: 600;
  color: #113255;
  cursor: pointer;
}

.save :hover {
  filter: brightness(0.8);
}

.smooth-drop {
  animation: animated-dropdown 0.55s ease-in-out;
}

@media screen and (max-width: 480px) {
  .profile-edit {
    width: 95%;
  }
}

@keyframes animated-dropdown {
  from {
    top: 15%;
  }

  to {
    top: 50%;
  }
}
</style>
