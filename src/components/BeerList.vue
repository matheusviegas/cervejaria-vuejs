<template>
  <div>
    <v-container grid-list-md class="np">
      <v-layout row wrap class="np">
          <div v-show="beers.length == 0" class="loader">
            <v-progress-circular
              :size="70"
              :width="7"
              color="grey"
              indeterminate
            ></v-progress-circular>
          </div>


        <v-flex v-for="beer in beers" :key="beer.id" xs6>
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
import store from '@/store/cart.js';

export default {
  created() {

    store.watch(
      function(state) {
        state.searchText;
      },
      () => {
        let msg = store.getters.searchText;
        if (msg !== "") {
          this.search = msg;
        //  this.page = 1;
          this.beers = [];
          this.findBeers(1, 18);
          //store.commit("setAlertMessage", "");
        }
      },
      { deep: true }
    );
  },
  mounted() {
      this.findBeers(1, 18);
      this.search = store.getters.searchText;
  },
  data() {
    return {
      beers: [],
      page: 1,
      totalPages: 9,
      search: ''
    };
  },
  components: {
    BeerCard
  },
  methods: {
    findBeers(page, perPage) {
      axios.get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6&page=" +
      page + "&per_page=" + perPage + (this.reset ? '' : this.search.length > 0 ? ('&beer_name=' + this.search) : ''))
      .then((response) => {
        this.beers = response.data;
        this.page = page;

        let div = (response.data.length/perPage);
        div = div >= 1 ? parseInt(div) : 1;
        this.totalPages = div;
      })
    }
  },
  watch: {
    page: function(page) {
      this.beers = [];
      this.findBeers(page, 18);
    }
  }, computed: {
    reset() {
      return this.$route.params.reset;
    }
  }
};
</script>

<style scoped>
  .loader {
    position: absolute;
    left: calc(60% - 35px);
    top: calc(50% - 35px);
  }

  .paginacao {
    width: 100%;
    margin: 50px 0px;
  }
</style>

