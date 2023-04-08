import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: [],
    chart_type: "bar",
  },

  getters: {
    getPeople: (state) => state.people,
    getChartType: (state) => state.chart_type,
  },

  mutations: {
    UPDATE_PERSON: (state, updated_person) => {
      state.people = state.people.map((person) => {
        return updated_person._id === person._id ? updated_person : person;
      });
    },

    UPDATE_PEOPLE: (state, people) => {
      state.people = people;
    },

    UPDATE_CHART_TYPE: (state, chart_type) => {
      state.chart_type = chart_type;
    },
  },

  actions: {
    async getPeopleFromServer({ commit }) {
      try {
        let response = await axios.get(
          "https://data-visualisation-dashboard.vercel.app/people"
        );
        commit("UPDATE_PEOPLE", response.data);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    updateChartType({ commit }, chart_type) {
      commit("UPDATE_CHART_TYPE", chart_type);
    },

    updatePerson({ commit }, updated_person) {
      commit("UPDATE_PERSON", updated_person);
    },
  },

  modules: {},
});
