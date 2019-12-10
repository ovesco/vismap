import Vue from 'vue';
import Vuex from 'vuex';

import BaseData from '../assets/rawResponse';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lng: 0,
    lat: 0,
    zoom: 0,
    cols: 8,
    rows: 6,
    menuOpen: false,
    categories: ['restaurant'],
    status: 0,
    minStars: 3,
    heatmapMaxZoom: 12,
    pinsMinZoom: 12,
  },
  mutations: {
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
    async loadData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(BaseData.results);
        }, 1);
      });
    },
  },
});
