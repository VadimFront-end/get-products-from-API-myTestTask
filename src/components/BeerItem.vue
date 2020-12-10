<template>
  <div class="beer-item">
    <div>
      <h2>{{ index + 1 }} - {{ beer.name }}</h2>
      <h2>Description:</h2>
      <div>{{ beer.description }}</div>
      <h2>Brewers tips:</h2>
      <div>{{ beer.brewers_tips }}</div>
    </div>
    <img
        :src="beer.image_url"
        alt="beer"
        class="img-size">
    <button @click="isShowForm=true" v-show="!isShowForm">Edit</button>
    <button @click="$store.commit('deleteItem', index)">Delete</button>
    <form
        v-show="isShowForm"
        style="border: 1px solid black;border-radius: 5px;padding: 10px">
      <div>Name:</div>
      <input type="text" v-model.trim="name">
      <div>Description:</div>
      <input type="text" v-model.trim="description">
      <br>
      <button @click.prevent="saveChange">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "BeerItem",
  props: {
    beer: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default() {
        return NaN;
      }
    }
  },
  data: () => ({
    name: '',
    description: '',
    isShowForm: false
  }),
  methods: {
    saveChange() {
      const newVal = {
        name: this.name,
        description: this.description,
        indexChange: this.index
      }
      this.$store.commit('changeItem', newVal);
      this.isShowForm = false;
    }
  },
  mounted() {
    this.name = this.beer.name;
    this.description = this.beer.description;
  }
}
</script>

<style>
.beer-item {
  display: flex;
  align-items: center;
}

.img-size {
  width: 50px;
}
</style>
