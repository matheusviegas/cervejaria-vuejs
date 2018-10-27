<template>
        <v-container grid-list-md>
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-container grid-list-md class="cerveja">
                            <v-layout row wrap>
                                <div v-show="isLoading" class="loader">
                                  <v-progress-circular
                                    :size="70"
                                    :width="7"
                                    color="grey"
                                    indeterminate
                                  ></v-progress-circular>
                                </div>

                                <v-flex xs6  v-if="!isLoading && beer != null">
                                    <v-img
                                        :src="beer.image_url"
                                        aspect-ratio="1"
                                        height="500px"
                                        contain>
                                    </v-img>
                                </v-flex>

                                <v-flex xs6  v-if="!isLoading && beer != null">
                                    <div>
                                        <h1 class="headline mb-0">{{beer.name}}</h1>
                                        <p>{{beer.tagline}}</p>
                                        <p>{{ beer.description }}</p>
                                        <b>ABV:</b> {{ beer.abv }} <br />
                                        <b>Attenuation Level:</b> {{ beer.attenuation_level }} <br />
                                        <b>EBC:</b> {{ beer.ebc }} <br />
                                        <b>Data Lançamento:</b> {{ beer.first_brewed }} <br />
                                        <b>IBU:</b> {{ beer.ibu }} <br />
                                        <b>PH:</b> {{ beer.ph }} <br />
                                        <b>SRM:</b> {{ beer.srm }} <br />
                                        <b>Volume:</b> {{ beer.volume.value }} ({{ beer.volume.unit}}) <br />
                                    </div>
                                </v-flex>

                                <div v-if="!isLoading && notFound" class="erro">
                                    <h2>Erro ao carregar detalhes da cerveja.</h2>
                                    <v-btn flat color="black" :to="{ name: 'home' }">Voltar para a Home</v-btn>
                                </div>
                            </v-layout>
                        </v-container>

                        <v-card-actions v-if="!isLoading && beer != null">
                            <v-spacer></v-spacer>
                            <v-btn flat color="grey" v-on:click="voltar()">Voltar</v-btn>
                            <v-btn flat color="blue" v-on:click="addToCart(beer)">Adicionar ao Carrinho</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

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
            </v-layout>
        </v-container>
</template>

<script>
import store from "@/store/cart.js";
import router from "@/router.js";
import axios from "axios";

export default {
  data() {
    return {
      beer: null,
      notFound: false,
      isLoading: true,
      alerta: false
    };
  },
  created() {
    this.findBeer(this.$route.params.id);
  },
  methods: {
    addToCart(beer) {
      store.commit("addToCart", beer);
      this.alerta = true;
    },
    voltar() {
      router.go(-1);
    },
    findBeer(id) {
      this.isLoading = true;

      axios
        .get("https://api.punkapi.com/v2/beers/" + id)
        .then(response => {
          this.beer = response.data[0];
        })
        .catch(error => {
          console.log(error);
          this.notFound = true;
        })
        .then(() => {
          this.isLoading = false;
        });
    }
  },
  watch: {
    $route: function(to, from) {
      this.findBeer(to.params.id);
    }
  }
};
</script>

<style scoped>
.cerveja {
  padding-top: 50px;
  min-height: 150px;
}

.erro {
  display: block;
  text-align: center;
  width: 100%;
}

.loader {
  position: absolute;
  left: calc(50% - 35px);
  top: calc(50% - 35px);
}

.alerta {
  margin-bottom: 25px;
}
</style>
