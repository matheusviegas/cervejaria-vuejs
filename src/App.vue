<template>
  <v-app id="inspire" >

      <v-layout row wrap>
          <v-flex xs3 class="menu-esquerda">
            <h2 class="categorias-title">Categorias</h2>
            <ul>
              <li @click="alert('clicou' + item)" v-for="(item, index) in items" :key="index">{{ item }}</li>
            </ul>

          </v-flex>

        <v-flex xs9>
          <router-view class="np" :key="$route.path" />
        </v-flex>

        <Alerta />
      </v-layout>


    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <CartList :header="true" :fixedSum="true" />
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="grey darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-btn icon @click="reload"><v-icon>home</v-icon></v-btn>
        <span class="hidden-sm-and-down">Cervejaria VueJS</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Pesquisar"
        @keyup.enter="updateSearchText"
        v-model="search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn @click.stop="rightDrawer = !rightDrawer">
        <span class="quantidade-cervejas">{{ quantidadeCervejas }}</span><v-icon>shopping_cart</v-icon>
      </v-btn>

    </v-toolbar>

  </v-app>
</template>

<script>
import CartList from "./components/CartList.vue";
import Alerta from "./components/Alerta.vue";
import store from "@/store/cart.js";

export default {
  name: "App",
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    search: '',
    items: [
      {
        icon: "bubble_chart",
        title: "Inspire"
      }
    ],
    miniVariant: false,
    right: true,
    title: "Cervejaria VueJS",

    dialog: false,
    drawer: null,
    right: true,
    rightDrawer: false,
    items: ["home", "categorias", "ipa", "pilsen", "trigo"]
  }),
  computed: {
    quantidadeCervejas() {
      return store.getters.quantidadeCervejasCarrinho;
    }
  },
  components: {
    CartList,
    Alerta
  },
  methods: {
    alert(msg) {
      alert(msg);
    },
    updateSearchText() {
      store.commit('setSearchText', this.search);
    },
    reload() {
      window.location = '/';
      store.commit('setSearchText', '');
    }
  }
};
</script>

<style>
.home {
  padding-top: 9 0px;
}

#inspire {
  margin-top: 64px;
}

.menu-esquerda {
  padding-top: 25px;
  border-right: 1px solid #dedede;
  background: #f2f2f3;
}

.menu-esquerda ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu-esquerda ul li {
  padding: 10px 20px;
  border-bottom: 1px solid #dedede;
  font-size: 15px;
  margin: 0;
}

.menu-esquerda ul li:hover{
  background: #f9f9f9;
  cursor: pointer;
}

.categorias-title {
  padding-left: 20px;
  border-bottom: 1px solid #dedede;
}

 .quantidade-cervejas {
    font-weight: bold;
    font-size: 13px;
    margin-right: 5px;
    border: 1px solid;
    background: #ffffff;
    color: #000000;
    border-radius: 48px;
    width: 26px;
  }

  .np {
    padding: 4px;
  }
</style>
