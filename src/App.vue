<template>

  <v-app>
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">

    <v-toolbar app :clipped-left="clipped">
      <a href="/"><v-toolbar-title v-text="title"></v-toolbar-title></a>
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

    <Alerta />

    <v-footer :fixed="fixed" app>
      <span class="footer">Copyright &copy; 2018 - {{ title }} - Todos os direitos reservados.</span>
    </v-footer>
  </v-app>
</template>

<script>
import CartList from "./components/CartList.vue";
import Alerta from './components/Alerta.vue';
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
      title: "Cervejaria VueJS"
    };
  },
  computed: {
    quantidadeCervejas() {
      return store.getters.quantidadeCervejasCarrinho;
    }
  },
  components: {
    CartList, Alerta
  }
};
</script>
<style scoped>
  .quantidade-cervejas {
    font-weight: bold;
    font-size: 13px;
    margin-right: 5px;
    border: 1px solid;
    background: #000000;
    color: #ffffff;
    border-radius: 48px;
    width: 26px;
  }

  .footer {
    width: 100%;
    text-align: center;
    background: #f2f2f3;
    padding: 10px;
    border-top: 1px solid #dedede;
  }
</style>
