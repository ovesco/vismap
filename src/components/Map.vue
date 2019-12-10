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
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    ['moveend'].forEach((event) => {
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
    status() {
      return this.$store.state.status;
    },
    minStars() {
      return this.$store.state.minStars;
    },
    heatmapMaxZoom() {
      return this.$store.state.heatmapMaxZoom;
    },
    pinsMinZoom() {
      return this.$store.state.pinsMinZoom;
    },
  },
  watch: {
    async categories() {
      await this.recalculate();
    },
    async status() {
      await this.recalculate();
    },
    async minStars() {
      await this.recalculate();
    },
    async heatmapMaxZoom() {
      await this.recalculate();
    },
    async pinsMinZoom() {
      await this.recalculate();
    },
  },
  methods: {
    popupContent(data) {
      const CClass = Vue.extend(Popup);
      const instance = new CClass({
        store: this.$store,
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
      if (this.heatmapLayer !== null) {
        this.map.removeLayer(this.heatmapLayer);
        this.heatmapLayer = null;
      }
      const { _southWest, _northEast } = this.map.getBounds();
      const grid = makeGrid(_southWest, _northEast);
      let data = await this.$store.dispatch('loadData', grid);
      // Filter categories
      console.log(this.categories);
      // eslint-disable-next-line
      data = data.filter(item => this.categories.length === 0 || item.types.filter(type => this.categories.indexOf(type) !== -1).length > 0)
        // filter open closed status
        .filter((it) => {
          const wanted = this.$store.state.status;
          if (wanted === 0) return true;
          const hasAll = it.opening_hours !== undefined && it.opening_hours.open_now !== undefined;
          if (!hasAll) return true;
          const status = it.opening_hours.open_now;
          return (status === true && wanted === 1) || (status === false && wanted === -1);
        })
        // filter stars
        .filter(it => it.rating >= this.$store.state.minStars);

      this.pins.forEach((pin) => {
        this.map.removeLayer(pin);
      });
      // Add pins
      if (this.pinsMinZoom <= this.map.getZoom()) {
        data.forEach((item) => {
          const { lat, lng } = item.geometry.location;
          const pin = new L.marker([lat, lng], { icon: icon(L) });
          pin.on('click', () => {
            pin.bindPopup(this.popupContent(item))
              .openPopup();
          });
          pin.addTo(this.map);
          if (item.opening_hours && item.opening_hours.open_now !== true) {
            // eslint-disable-next-line
            pin._icon.classList.add('not-open');
          }
          this.pins.push(pin);
        });
      }
      if (this.heatmapMaxZoom >= this.map.getZoom()) {
        // eslint-disable-next-line
        this.heatmapLayer = L.heatLayer(data.map(it => [it.geometry.location.lat, it.geometry.location.lng, it.rating / 5]), {
          minOpacity: 0.6,
          radius: 20,
          blur: 30,
        });
        this.heatmapLayer.addTo(this.map);
      }
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
