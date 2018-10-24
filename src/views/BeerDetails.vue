<template>
        <v-container grid-list-md>
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-container grid-list-md class="cerveja">
                            <v-layout row wrap>
                                <v-flex xs6  v-if="beer != null">
                                    <v-img
                                        :src="beer.image_url"
                                        aspect-ratio="1"
                                        height="500px"
                                        contain>
                                    </v-img>
                                </v-flex>

                                <v-flex xs6  v-if="beer != null">
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
                                
                                <div v-else class="erro">
                                    <h2>Erro ao carregar detalhes da cerveja.</h2>
                                    <v-btn flat color="black" :to="{ name: 'home' }">Voltar para a Home</v-btn>
                                </div>
                            </v-layout>
                        </v-container>

                        <v-card-actions v-if="beer != null">
                            <v-spacer></v-spacer>
                            <v-btn flat color="grey" v-on:click="voltar()">Voltar</v-btn>
                            <v-btn flat color="blue" v-on:click="addToCart(beer)">Adicionar ao Carrinho</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
import store from "@/store/cart.js";
import router from "@/router.js";

export default {
  data() {
    return {
      beer: null
    };
  },
  created() {
    this.beer = this.$route.params.beer;
  },
  methods: {
    addToCart(beer) {
      store.commit("addToCart", beer);
    },
    voltar() {
      router.go(-1);
    }
  }
};
</script>

<style scoped>
    .cerveja {
        padding-top: 50px;
    }

    .erro {
        display: block;
        text-align: center;
        width: 100%;
    }
</style>
