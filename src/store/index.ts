import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cookie: '',
    currentMusic: {},
    currentMusicUrl: '',
    isLoggin: false,
    playList: [],
  },
  mutations: {
    changeCurrentMusicUrl(state, musicUrl) {
      state.currentMusicUrl = musicUrl;
    },
  },
  actions: {},
  modules: {},
});
