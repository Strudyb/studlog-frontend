import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      access_token: localStorage.getItem("access_token") || "",
      user: JSON.parse(localStorage.getItem("user")) || {
        name: "",
        surname: "",
        email: "",
        _id: "",
      },
    };
  },
  getters: {
    getAccessToken(state) {
      return state.access_token;
    },
    getUserData(state) {
      return state.user;
    },
    getUserId(state) {
      return state.user._id;
    },
    isLoggedIn(state) {
      return !!state.access_token;
    },
  },
  mutations: {
    setAccessToken(state, payload) {
      state.access_token = payload;
      localStorage.setItem("access_token", payload);
    },
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    clearAccessToken(state) {
      state.access_token = "";
      localStorage.removeItem("access_token");
    },
  },
  actions: {
    setAccessToken({ commit }, payload) {
      commit("setAccessToken", payload);
    },
    setUser({ commit }, payload) {
      commit("setUser", payload);
    },
    clearAccessToken({ commit }) {
      commit("clearAccessToken");
    },
  },
});

export default store;
