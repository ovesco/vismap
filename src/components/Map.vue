<template>
    <div>
        <div ref="map" class="map"></div>
    </div>
</template>

<script>
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

import { makeGrid } from '../Util';

export default {
  map: null,
  async mounted() {
    this.map = L.map(this.$refs.map).setView([46.5166002, 6.6348448], 15);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    ['zoomend', 'moveend'].forEach((event) => {
      this.map.on(event, e => this.recalculate(e));
    });
    await this.recalculate();
  },
  data() {
    return {
      heatmapLayer: null,
      pins: [],
    };
  },
  methods: {
    async recalculate() {
      if (this.heatmapLayer !== null) {
        this.map.removeLayer(this.heatmapLayer);
      }
      const { _southWest, _northEast } = this.map.getBounds();
      const grid = makeGrid(_southWest, _northEast);
      const data = await this.$store.dispatch('loadData', grid);
      // eslint-disable-next-line
      this.heatmapLayer = L.heatLayer(data.map(it => [it.geometry.location.lat, it.geometry.location.lng, it.rating / 5]), {
        minOpacity: 0.5,
        radius: 50,
        blur: 40,
      });

      this.pins.forEach((pin) => {
        this.map.removeLayer(pin);
      });
      // Add pins
      data.forEach((item) => {
        const { lat, lng } = item.geometry.location;
        const pin = new L.marker([lat, lng]);
        pin.addTo(this.map);
        this.pins.push(pin);
      });
      this.heatmapLayer.addTo(this.map);
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
