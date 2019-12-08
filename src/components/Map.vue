<template>
    <div>
        <div ref="map" class="map"></div>
    </div>
</template>

<script>
import * as L from 'leaflet';
import Vue from 'vue';
import 'leaflet.heat/dist/leaflet-heat';
import 'leaflet/dist/leaflet.css';

import { makeGrid } from '../Util';
import { icon } from '../LeafletUtil';
import Popup from './Popup.vue';

export default {
  map: null,
  async mounted() {
    this.map = L.map(this.$refs.map).setView([46.5166002, 6.6348448], 15);
    // L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
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
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  watch: {
    async categories() {
      await this.recalculate();
    },
  },
  methods: {
    popupContent(data) {
      const CClass = Vue.extend(Popup);
      const instance = new CClass({
        propsData: {
          data: {
            ...data,
            rating: Math.round(data.rating * 10) / 10,
          },
        },
      });
      instance.$mount();
      return instance.$el;
    },
    async recalculate() {
      if (this.heatmapLayer !== null) {9
        this.map.removeLayer(this.heatmapLayer);
      }
      const { _southWest, _northEast } = this.map.getBounds();
      const grid = makeGrid(_southWest, _northEast);
      let data = await this.$store.dispatch('loadData', grid);
      // eslint-disable-next-line
      data = data.filter(item => item.types.filter(type => this.categories.indexOf(type) !== -1).length > 0);
      // eslint-disable-next-line
      this.heatmapLayer = L.heatLayer(data.map(it => [it.geometry.location.lat, it.geometry.location.lng, it.rating / 5]), {
        minOpacity: 0.6,
        radius: 20,
        blur: 30,
      });

      this.pins.forEach((pin) => {
        this.map.removeLayer(pin);
      });
      // Add pins
      data.forEach((item) => {
        const { lat, lng } = item.geometry.location;
        const pin = new L.marker([lat, lng], { icon: icon(L) });
        pin.on('click', () => {
          pin.bindPopup(this.popupContent(item)).openPopup();
        });
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
