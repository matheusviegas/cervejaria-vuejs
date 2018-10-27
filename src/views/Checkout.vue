<template>
  <div class="about">
    <h1>This is an checkout page</h1>

    <button @click="teste">OK</button>
  </div>
</template>

<script>
import store from '@/store/cart.js';
import ShowAlert from '@/plugins/ShowAlert';

export default {
  methods: {
    teste() {
      ShowAlert({text: "Olaaaa", type: 'success'})
      console.log('oi');
      //store.commit('setSnack', 'Teste de Snackbar');
    }
  }
}


</script>
