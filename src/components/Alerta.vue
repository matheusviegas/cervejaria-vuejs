
<template>
  <v-snackbar
    v-model="show"
    class="alerta"
    :color="type"
    :timeout="5000"
    :vertical="false">
    {{message}}
    <v-btn flat dark @click.native="show = false">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
import store from "@/store/cart.js";

export default {
  created: function() {
    store.watch(
      function(state) {
        state.alertMessage;
      },
      () => {
        console.log(store.getters.alertMessage);

        let msg = store.getters.alertMessage;
        if (msg !== "") {
          this.message = msg.text;
          this.type = msg.type;
          this.show = true;
          store.commit("setAlertMessage", "");
        }
      },
      { deep: true }
    );
  },
  data() {
    return {
      show: false,
      message: "",
      type: ""
    };
  }
};
</script>

<style scoped>
.alerta {
  margin-bottom: 25px;
}
</style>
