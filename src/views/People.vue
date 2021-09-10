<template>
  <div class="people-container">
    <!-- EDIT PROFILE CARD -->
    <edit-profile-card
      v-if="show_edit_form"
      @close="show_edit_form = false"
      :user="edit_user"
    />

    <!-- NAV BAR -->
    <nav-bar />

    <!-- SEARCH BOX -->
    <div class="search-box">
      <input type="text" v-model="search" placeholder="search any field" />
    </div>

    <!-- USER PROFILES -->
    <div class="profiles">
      <page-loader v-if="loading" />

      <profile-card
        v-for="(user, index) in filteredPeople"
        :user="user"
        :key="index"
        @edit="updateUser($event)"
      />
    </div>

    <!-- PAGINATOR -->
    <paginator :pageNumber="pageNumber" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import profileCard from "@/components/profileCard";
import navBar from "@/components/navBar";
import paginator from "@/components/paginator";
import pageLoader from "@/components/pageLoader";
import editProfileCard from "@/components/editProfileCard";

export default {
  name: "Home",

  components: {
    profileCard,
    navBar,
    paginator,
    pageLoader,
    editProfileCard,
  },

  mounted() {
    if (!this.getPeople.length) this.fetchPeople();
  },

  computed: {
    ...mapGetters(["getPeople"]),

    slicedPeople() {
      // return a portion of the people data based on page number
      let start_index = Number(this.$route.params.page);
      let end_index = start_index + 8;
      return this.getPeople.slice(start_index, end_index);
    },

    filteredPeople() {
      // filter the people data based on the search keyword
      return this.slicedPeople.filter(
        ({
          name,
          age,
          gender,
          eyeColor,
          preferences: { pet, fruit },
          location: { latitude, longitude },
        }) => {
          return (
            this.filterParameter(name) ||
            this.filterParameter(gender) ||
            this.filterParameter(eyeColor) ||
            this.filterParameter(pet) ||
            this.filterParameter(fruit) ||
            this.filterNumberParameter(latitude) ||
            this.filterNumberParameter(longitude) ||
            this.filterNumberParameter(age)
          );
        }
      );
    },

    getSearch() {
      // return the user search in lower case format
      return this.search.toLowerCase();
    },
  },

  data() {
    return {
      search: "",
      pageNumber: 10,
      loading: false,
      show_edit_form: false,
      edit_user: {},
    };
  },

  methods: {
    ...mapActions(["getPeopleFromServer"]),

    updateUser(user) {
      this.show_edit_form = true;
      this.edit_user = user;
    },

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

    filterParameter(parameter) {
      return parameter.toLowerCase().includes(this.getSearch);
    },

    filterNumberParameter(parameter) {
      let parameter_string = parameter.toString().toLowerCase();
      return parameter_string === this.getSearch;
    },
  },
};
</script>

<style scoped>
.people-container {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.profiles {
  display: flex;
  flex-wrap: wrap;
  height: 75%;
  max-height: 75%;
  overflow-y: scroll;
  width: 96%;
  margin: auto;
  position: relative;
}

.search-box {
  height: 40px;
  width: 70%;
  margin: 0 auto 20px auto;
  background: #fff;
  border-radius: 5px;
  position: relative;
}

.search-box input {
  outline: 0;
  border: 1.5px solid #113255;
  border-radius: 5px;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  font-size: 14px;
  background: transparent;
}

.search-box input:focus {
  border-color: #faa017;
}

@media screen and (max-width: 720px) {
  .search-box {
    width: 90%;
  }
}
</style>
