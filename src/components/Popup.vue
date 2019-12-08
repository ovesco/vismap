<template>
  <div>
    <div class="popup">
      <div class="d-flex border-bottom pb-1 mb-2">
        <div v-if="data.icon">
          <img class="mr-2" :src="data.icon" alt="icon" />
        </div>
        <div>
          <h3 class="m-0 font-weight-bold">{{ data.name }}</h3>
          <h4 class="text-muted">{{ data.vicinity }}</h4>
        </div>
      </div>
      <div class="gauge-holder">
        <div class="chart">
          <vue-svg-gauge :transition-duration="400" :start-angle="-110" :end-angle="110"
                         :inner-radius="80" :separator-thickness="0"
                         :gauge-color="[{offset: 0, color: '#2020f9'},
                         {offset: 100, color: '#00ffb2'}]"
                         :value="data.rating" :min="0" :max="5">
            <div class="inner d-flex justify-content-center align-items-end">
              <div class="d-flex flex-column align-items-center">
                <a-icon type="star" theme="filled" />
                <h1 class="m-0 font-weight-bold">{{ data.rating }}</h1>
              </div>
            </div>
          </vue-svg-gauge>
        </div>
      </div>
      <div>
        <a-tag v-for="tag in data.types.slice(0, 4)" color="blue" :key="tag">
          {{ tag.replace(/_/g, ' ') }}
        </a-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { VueSvgGauge } from 'vue-svg-gauge';
import { Tag, Icon } from 'ant-design-vue';

export default {
  components: {
    aTag: Tag,
    aIcon: Icon,
    VueSvgGauge,
  },
  props: ['data'],
};
</script>

<style lang="scss" scoped>
  .popup {

    width:300px;

    img {
      width:30px;
    }

    .gauge-holder {

      .chart {
        width:100px;

        .inner {
          width: 100%;
          height: 100%;

          svg {
            font-size:2rem;
            color: orange;
          }

          h1 {
            font-size:2.5rem;
          }
        }
      }
    }
  }
</style>
