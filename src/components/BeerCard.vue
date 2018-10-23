<template>
  <!-- Adicionando o componente de card -->
  <v-card>
    <div class="cerveja">
      <v-img
        :src="beer.image_url"
        aspect-ratio="1"
        height="200px"
        contain
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{beer.name}}</h3>
          <div>{{beer.tagline}}</div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="blue" v-on:click="addToCart(beer)">Adicionar</v-btn>
        <v-btn flat color="orange">Detalhes</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>



<script>
import store from "@/store/cart.js";

export default {
  //Recebendo a prop beer
  props: ["beer"],
  data() {
    return {};
  },
  methods: {
    addToCart(beer) {
      store.commit("addToCart", beer);
    }
  }
};
</script>

<style scoped>
  .cerveja {
    padding-top: 20px;
  }
</style>
