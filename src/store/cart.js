import Vue from 'vue'
import Vuex from 'vuex'

import {
  findIndex
} from 'lodash-es'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    qty: 0
  },
  mutations: {
    addToCart(state, beer) {
      let index = findIndex(state.beers, (o) => o.id == beer.id)

      if (index === -1) {
        state.beers.push({
          id: beer.id,
          name: beer.name,
          price: 2.5,
          quantity: 1,
          image_url: beer.image_url
        })
      } else {
        state.beers[index].quantity++;
      }
    },
    removeFromCart(state, beer) {
      var index = state.beers.indexOf(beer);
      if (index > -1) {
        state.beers.splice(index, 1);
      }
    }
  },
  getters: {
    quantidadeCervejasCarrinho: state => {
      let qtd = 0;
      for (let x = 0; x < state.beers.length; x++) {
        qtd += Number(state.beers[x].quantity);
      }
      return qtd;
    }
  },
  actions: {

  }
})
