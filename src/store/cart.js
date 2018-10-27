import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'cervejaria-vuejs',
  storage: localStorage
})

import {
  findIndex
} from 'lodash-es'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    qty: 0,
    alertMessage: {
      text:'',
      type: ''
    }
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
    },
    changeQuantity(state, beer) {
      let index = findIndex(state.beers, (o) => o.id == beer.id);

      if (index !== -1) {
        state.beers[index].quantity = beer.quantity;
      }
    },
    setAlertMessage(state, message) {
      state.alertMessage = message;
    }
  },
  getters: {
    quantidadeCervejasCarrinho: state => {
      let qtd = 0;
      for (let x = 0; x < state.beers.length; x++) {
        qtd += Number(state.beers[x].quantity);
      }
      return qtd;
    },
    alertMessage: state => {
      return state.alertMessage;
    }
  },
  actions: {

  },
  plugins: [vuexPersist.plugin]
})
