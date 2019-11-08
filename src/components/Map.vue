<template>
    <div>
        <div ref="map" class="map"></div>
    </div>
</template>

<script>
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { makeGrid } from '../Util';

export default {
  map: null,
  mounted() {
    this.map = L.map(this.$refs.map).setView([51.5, 1], 10);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    ['zoomend', 'resize', 'moveend'].forEach((event) => {
      this.map.on(event, e => this.recalculate(e));
    });
  },
  methods: {
    recalculate() {
      const { lat, lng } = this.map.getCenter();
      const { _southWest, _northEast } = this.map.getBounds();
      const cols = 8;
      const rows = 6;
      const grid = makeGrid(cols, rows, lat, lng, _southWest, _northEast);
      grid.forEach((data) => {
        L.circle([data.lat, data.lng], { radius: data.radius })
          .addTo(this.map);
      });
    },
  },
};
</script>

<style scoped lang="scss">
    .map {
        width:100%;
        height: 100vh;
    }
</style>
