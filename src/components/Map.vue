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

import { icon } from '../LeafletUtil';
import Popup from './Popup.vue';
import RawData from '../assets/raw.json';

export default {
  map: null,
  async mounted() {
    this.map = L.map(this.$refs.map).setView([46.5166002, 6.6348448], 15);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    ['moveend', 'zoomend'].forEach((event) => {
      this.map.on(event, () => this.reloadData());
    });
    await this.reloadData();
  },
  data() {
    return {
      pins: [],
      heatmaps: [],
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
    clear() {
      this.heatmaps.forEach((it) => {
        this.map.removeLayer(it);
      });
      this.heatmaps.splice(0, this.heatmaps.length);
      this.pins.forEach((pin) => {
        this.map.removeLayer(pin);
      });
    },
    async reloadData() {
      this.$store.commit('loading', true);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          this.recalculate();
          this.$store.commit('loading', false);
        }, Math.random() * 1500 + (Math.random() * 500));
      });
    },
    recalculate() {
      this.clear();
      let data = RawData;
      // eslint-disable-next-line
      data = data.filter(item => this.categories.length === 0 || item.types.filter(type => this.categories.indexOf(type) !== -1).length > 0)
      // filter open closed status
        .filter((it) => {
          const wanted = this.$store.state.status;
          if (wanted === 0) return true;
          const hasAll = it.opening_hours !== undefined && it.opening_hours.open_now !== undefined;
          if (!hasAll) return false;
          const status = it.opening_hours.open_now;
          return (status === true && wanted === 1) || (status === false && wanted === -1);
        })
        // filter stars
        .filter(it => it.rating >= this.$store.state.minStars);
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
          if (item.opening_hours === undefined || item.opening_hours.open_now === undefined) {
            // eslint-disable-next-line
            pin._icon.classList.add('no-data');
          } else if (item.opening_hours && item.opening_hours.open_now !== true) {
            // eslint-disable-next-line
            pin._icon.classList.add('not-open');
          }
          this.pins.push(pin);
        });
      }
      if (this.heatmapMaxZoom >= this.map.getZoom()) {
        // eslint-disable-next-line
        const heatlayer = L.heatLayer(data.map(it => [it.geometry.location.lat, it.geometry.location.lng, it.rating / 5]), {
          minOpacity: 0.6,
          radius: 20,
          blur: 30,
        });
        heatlayer.addTo(this.map);
        this.heatmaps.push(heatlayer);
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
