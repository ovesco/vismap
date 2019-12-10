<template>
    <div>
        <div class="main-menu">
          <h1 class="text-muted ml-4 mr-4 pb-1 pt-3 border-bottom">VisMap</h1>
          <section class="m-4">
            <p class="m-0">It should be</p>
            <a-radio-group :value="$store.state.status" style="width: 252px"
                           @change="v => $store.commit('status', v.target.value)">
              <a-radio-button :value="1">Open</a-radio-button>
              <a-radio-button :value="-1">Closed</a-radio-button>
              <a-radio-button :value="0"> I don't mind</a-radio-button>
            </a-radio-group>
          </section>
          <section class="m-4">
            <p class="m-0">Minimum stars I want</p>
            <a-slider :defaultValue="3" :min="1" :step="0.1" :max="5"
                      @change="v => $store.commit('minStars', v)" />
          </section>
          <section class="m-4">
            <p class="m-0">Heatmap should be seen up to this zoom level</p>
            <div class="d-flex align-items-center">
              <div class="flex-grow-1 slider-transparent">
                <a-slider :defaultValue="$store.state.heatmapMaxZoom" :min="1" :step="1" :max="18"
                          :tooltipVisible="false"
                          @change="v => $store.commit('heatmapMaxZoom', v)" />
              </div>
              <div class="tag">{{ $store.state.heatmapMaxZoom }}</div>
            </div>
          </section>
          <section class="m-4">
            <p class="m-0">Pins should be seen from this zoom level</p>
            <div class="d-flex align-items-center">
              <div class="flex-grow-1 slider-transparent">
                <a-slider :defaultValue="$store.state.heatmapMaxZoom" :min="1" :step="1" :max="18"
                          :tooltipVisible="false"
                          @change="v => $store.commit('pinsMinZoom', v)" />
              </div>
              <div class="tag">{{ $store.state.pinsMinZoom }}</div>
            </div>
          </section>
        </div>
    </div>
</template>

<script>
import { Radio, Slider } from 'ant-design-vue';

export default {
  components: {
    aRadioButton: Radio.Button,
    aRadioGroup: Radio.Group,
    aSlider: Slider,
  },
};
</script>

<style scoped lang="scss">
    .main-menu {
        width:300px;
        height:100%;
        background: white;
      box-shadow: inset -2px 0 3px rgba(0,0,0,0.05);

      .tag {
        background: #81bee4;
        color:white;
        padding:0.2rem 0.4rem;
        border-radius:3px;
      }
    }
</style>
