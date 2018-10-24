<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>

          <div v-show="beers.length == 0" class="loader">
            <v-progress-circular
              :size="70"
              :width="7"
              color="grey"
              indeterminate
            ></v-progress-circular>
          </div>
         
        
        <v-flex v-for="beer in beers" :key="beer.id" xs4>
          <BeerCard :beer="beer" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
// Como padrão, importamos nosso componente de card.
import BeerCard from "../components/BeerCard.vue";

export default {
  mounted() {
    axios
      .get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6")
      .then(response => (this.beers = response.data));
  },
  data() {
    return {
      // Criamos um dado para fazer o storage das nossas cervejas
      beers: []
    };
  },
  components: {
    // Como padrão, registramos o componente
    BeerCard
  }
};
</script>

<style scoped>
  .loader {
    position: absolute;
    left: calc(50% - 35px);
    top: calc(50% - 35px);
  }
</style>

