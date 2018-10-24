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
        <v-btn flat color="orange" :to="{ name: 'beer-details', params: { beer: beer } }">Detalhes</v-btn>
      </v-card-actions>
    </div>

      <v-snackbar
        v-model="alerta"
        :color="'success'"
        :timeout="5000"
        :vertical="false"
        class="alerta"
      >
          Produto adicionado ao carrinho
          <v-btn
            dark
            flat
            @click="alerta = false"
          >
            Fechar
          </v-btn>
      </v-snackbar>

  </v-card>
</template>

<script>
import store from "@/store/cart.js";

export default {
  //Recebendo a prop beer
  props: ["beer"],
  data() {
    return {
      alerta: false
    };
  },
  methods: {
    addToCart(beer) {
      store.commit("addToCart", beer);
      this.alerta = true;
    }
  }
};
</script>

<style scoped>
  .cerveja {
    padding-top: 20px;
  }

  .alerta {
    margin-bottom: 25px;
  }
</style>
