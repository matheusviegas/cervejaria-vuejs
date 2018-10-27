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


    <div class="text-xs-center paginacao" v-show="beers.length > 0">
          <v-pagination
            v-model="page"
            :length="totalPages"
          ></v-pagination>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import BeerCard from "../components/BeerCard.vue";

export default {
  mounted() {
      this.findBeers(1, 18);
  },
  data() {
    return {
      beers: [],
      page: 1,
      totalPages: 4
    };
  },
  components: {
    BeerCard
  },
  methods: {
    findBeers(page, perPage) {
      axios.get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6&page=" + page + "&per_page=" + perPage)
      .then((response) => {
        this.beers = response.data;
        this.page = page;
      })
    }
  },
  watch: {
    page: function(page) {
      this.beers = [];
      this.findBeers(page, 18);
    }
  }
};
</script>

<style scoped>
  .loader {
    position: absolute;
    left: calc(50% - 35px);
    top: calc(50% - 35px);
  }

  .paginacao {
    width: 100%;
  }
</style>

