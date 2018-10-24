<template>

  <v-app>
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">

    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.stop="rightDrawer = !rightDrawer">
        <span class="quantidade-cervejas">{{ quantidadeCervejas }}</span><v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <cartList />
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import CartList from "./components/CartList.vue";
import store from "@/store/cart.js";

export default {
  name: "App",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Beer Company"
    };
  },
  computed: {
    quantidadeCervejas() {
      return store.getters.quantidadeCervejasCarrinho;
    }
  },
  components: {
    CartList
  }
};
</script>
<style scoped>
  .quantidade-cervejas {
    font-weight: bold;
    font-size: 16px;
  }
</style>
