<template>
  <div id="app">
    <div v-if="GET_LOADING" class="loading">Loading...</div>
    <div v-else>
      <BeerItem
          v-for="(beer, index) in GET_BEERS"
          :key="beer.id"
          :index="index"
          :beer="beer"/>
      <button
          v-if="IS_SHOW_BUTTON_NEXT"
          class="button-show-next"
          @click="$store.dispatch('GET_BEERS', (GET_BEERS.length + 25) / 25)">Show next
      </button>
    </div>
  </div>
</template>

<script>
import BeerItem from './components/BeerItem'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    BeerItem
  },
  computed: {
    ...mapGetters([
      'GET_BEERS',
      'IS_SHOW_BUTTON_NEXT',
      'GET_LOADING'
    ])
  },
  mounted() {
    this.$store.dispatch('GET_BEERS', 1);
  }
}
</script>

<style>
#app {
  max-width: 1200px;
  margin: auto;
}

.button-show-next {
  display: block;
  margin: 20px auto;
}

.loading {
  text-align: center;
  font-size: 50px;
  font-weight: 600;
}
</style>
