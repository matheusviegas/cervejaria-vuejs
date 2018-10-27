import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Checkout from './views/Checkout.vue';
import BeerDetails from './views/BeerDetails.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/beer-details/:id',
      name: 'beer-details',
      component: BeerDetails
    }
  ]
})
