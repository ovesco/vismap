<template>
  <div class="overflow-hidden">
    <div class="d-flex global-container" :class="{ menuactive: $store.state.menuOpen }">
      <h-menu />
      <div class="map-holder flex-grow-1 position-relative">
        <floatbar />
        <float-title />
        <h-map class="flex-grow-1" />
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../components/Map.vue';
import Floatbar from '../components/Floatbar.vue';
import FloatTitle from '../components/FloatTitle.vue';
import Menu from '../components/Menu.vue';

export default {
  components: {
    HMap: Map,
    HMenu: Menu,
    Floatbar,
    FloatTitle,
  },
};
</script>

<style scoped lang="scss">
  .global-container {

    width: calc(100vw + 300px);

    transform: translateX(-300px);
    transition: transform .5s ease-in-out;

    &.menuactive {
      transform: translateX(0px);
    }
  }
</style>
