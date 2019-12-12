import Vue from 'vue';
import Vuex from 'vuex';

import BaseData from '../assets/raw.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lng: 0,
    lat: 0,
    zoom: 0,
    cols: 8,
    rows: 6,
    data: BaseData,
    menuOpen: false,
    categories: ['restaurant'],
    status: 0,
    minStars: 3,
    heatmapMaxZoom: 12,
    pinsMinZoom: 12,
    loading: false,
  },
  mutations: {
    loading(state, lo) {
      state.loading = lo;
    },
    pinsMinZoom(state, zoom) {
      state.pinsMinZoom = zoom;
    },
    heatmapMaxZoom(state, zoom) {
      state.heatmapMaxZoom = zoom;
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },
    minStars(state, val) {
      state.minStars = val;
    },
    status(state, status) {
      state.status = status;
    },
    categories(state, category) {
      state.categories = category;
    },
    toggleCategory(state, tag) {
      const index = state.categories.indexOf(tag);
      if (index === -1) state.categories.push(tag);
      else state.categories.splice(index, 1);
    },
    coords(state, { lat, lng }) {
      state.lat = lat;
      state.lng = lng;
    },
    gridSize(state, { cols, rows }) {
      state.cols = cols;
      state.rows = rows;
    },
    zoom(state, zoom) {
      state.zoom = zoom;
    },
  },
  actions: {
    async loadData({ state, commit }) {
      commit('loading', true);
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('loading', false);
          resolve(state.data);
        }, Math.random() * 1500 + (Math.random() * 500));
      });
    },
  },
});
