<template>

  <div>
  <v-list two-line subheader>
    <v-subheader class="titulo-shopping-cart">Carrinho</v-subheader>

    <v-list-tile
      v-for="beer in beers"
      :key="beer.id"
      avatar
      @click=""
      class="item-lista"
    >
      <v-list-tile-avatar>
        <img :src="beer.image_url">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
        <input type="number" value="1" min="1" class="qtd" v-model="beer.quantity" />
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple v-on:click="removerItem(beer)">
          <v-icon color="red lighten-1">close</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>

  <div class="totalizador">
    <span v-bind:class="{ riscado: temDesconto }">Total: R$ {{ total.toFixed(2) }}</span>
    <br v-if="temDesconto" /><span v-if="temDesconto">Desconto: R$ {{ calculaDesconto.valorDesconto.toFixed(2) }} (10%)</span>
    <br v-if="temDesconto" /><span v-if="temDesconto">Total a Pagar: R$ {{ calculaDesconto.totalComDesconto.toFixed(2) }}</span>   
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
    },
    temDesconto() {
      let qtd = 0;
      for (let x = 0; x < store.state.beers.length; x++) {
        qtd += Number(store.state.beers[x].quantity);
      }
      return qtd >= 10;
    }, 
    calculaDesconto() {
      let desconto = this.total * 0.10;
      return {
        valorDesconto: desconto,
        totalComDesconto: (this.total - desconto)
      };
    }
  },
  methods: {
    removerItem(beer) {
      store.commit("removeFromCart", beer);
    }
  }
};
</script>

<style scoped>
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
  background: #d9d9d933;
  width: 100%;
  border-top: 1px solid #dededed4;
}

.qtd {
  border: 1px solid #dedede;
  width: 50px;
  padding: 0 5px;
}

.item-lista {
  border-top: 1px solid #dedede;
}

.titulo-shopping-cart {
  font-size: 18px;
  font-weight: bold;
 justify-content: center;
}

.riscado {
  text-decoration: line-through;
  color: #9e9e9e;
}

</style>
