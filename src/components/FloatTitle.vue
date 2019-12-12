<template>
  <div>
    <div class="float-title p-1 pl-2 pr-2">
      <div class="">
        <h4 class="text-muted mb-1">I'm looking for some</h4>
      </div>
      <div>
        <a-select style="width: 300px" class="mb-1" :value="$store.state.categories"
                  mode="multiple" @change="v => $store.commit('categories', v)"
                  :disabled="$store.state.loading" :loading="$store.state.loading">
          <a-select-option v-for="option in options" :key="option" :value="option">
            {{ option.replace(/_/g, ' ') }}
          </a-select-option>
        </a-select>
      </div>
    </div>
  </div>
</template>

<script>
import { Select } from 'ant-design-vue';

export default {
  components: {
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  async mounted() {
    const data = await this.$store.dispatch('loadData');
    this.options = [...new Set(data.flatMap(it => it.types))];
  },
  data() {
    return {
      options: [
        'restaurant',
        'cafe',
        'lodging',
        'bar',
      ],
    };
  },
};
</script>

<style scoped lang="scss">
  .float-title {
    position: absolute;
    top:10px;
    left:50px;
    background:white;
    z-index:314159;
    border-radius:3px;
    border: 2px solid rgba(0,0,0,0.2);
    background-clip: padding-box;
  }
</style>
