<template>

  <div>
  <v-list two-line subheader>
    <v-subheader inset>Shopping Cart</v-subheader>

    <v-list-tile
      v-for="beer in beers"
      :key="beer.id"
      avatar
      @click=""
    >
      <v-list-tile-avatar>
        <img :src="beer.image_url">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
        <v-list-tile-sub-title>Quantidade: {{ beer.quantity }}</v-list-tile-sub-title>
        <div class="addRemove">
          <button class="btn" v-on:click="beer.quantity++"><i class="fa fa-plus-circle"></i></button>
          <button class="btn" v-on:click="beer.quantity > 1 ? beer.quantity-- : beer.quantity = beer.quantity"><i class="fa fa-minus-circle"></i></button>
          <button class="btn btn-remover" v-on:click="removerItem(beer)"><i class="fa fa-trash"></i></button>
        </div>

      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1">info</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>

    <v-divider inset></v-divider>
  </v-list>

  <div class="totalizador">
    Total: R$ {{ total.toFixed(2) }}
  </div>
  </div>
</template>


<script>
import store from "@/store/cart.js";

export default {
  computed: {
    beers() {
      return store.state.beers;
    },
    total() {
      let soma = 0;
      for (let x = 0; x < store.state.beers.length; x++) {
        let b = store.state.beers[x];
        soma += Number(b.quantity * b.price);
      }
      return soma;
    }
  },
  methods: {
    removerItem: function(beer) {
      var index = store.state.beers.indexOf(beer);
      if (index > -1) {
        store.state.beers.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.addRemove {
}

.btn {
  background: #fefefe;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-right: 1px;
  width: 23px;
}

.btn:hover {
  border-color: #c3c3c3;
}

.btn-remover {
  background: red;
}

.totalizador {
  position: absolute;
  bottom: 0;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
}
</style>
