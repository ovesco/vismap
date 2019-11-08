import Vue from 'vue';
import Vuex from 'vuex';

import { makeGrid } from '../Util';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lng: 0,
    lat: 0,
    zoom: 0,
    cols: 8,
    rows: 6,
  },
  mutations: {
    coords(state, { lat, lng}) {
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
    async loadData({ commit, state }, { southWest, nortEast }) {
      const { rows, cols, lng, lat } = state;
      const grid = makeGrid(cols, rows, lat, lng, southWest, nortEast);
    },
  },
});
