<template>
  
  <v-card class="checkout padding-5">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6 class="coluna">
            <h1 class="headline mb-1">Finalize seu pedido</h1>

            <CartList :header="false" :fixedSum="false" />
          </v-flex>

          <v-flex xs6 class="coluna">
            <div v-if="!logado">
                <h1 class="headline mb-1">Efetue login para continuar</h1>

                <v-text-field
                v-model="email"
                  label="Solo"
                  placeholder="Email"
                  solo
                ></v-text-field>
                
                <v-text-field
                v-model="senha"
                placeholder="Senha"
                type="password"
                solo
              ></v-text-field>
                
                <v-btn dark flat color="#333333" @click="autenticar">Autenticar</v-btn>
                
                
                
                <h1 class="headline mb-1 mt-5">Ainda não tem conta? Cadastre-se!</h1>

                <v-text-field
                  label="Solo"
                  v-model="nome"
                  placeholder="Nome Completo"
                  solo
                ></v-text-field>

                <v-text-field
                  label="Solo"
                  v-model="emailCad"
                  placeholder="Email"
                  solo
                ></v-text-field>
                
                <v-text-field
                v-model="senhaCad"
                placeholder="Senha"
                type="password"
                solo
              ></v-text-field>

              <v-text-field
                v-model="confirmacaoSenha"
                placeholder="Repita sua Senha"
                type="password"
                solo
              ></v-text-field>

              <v-btn dark flat color="#333333" @click="cadastrar">Criar conta</v-btn>
            </div>
            <div v-else>
              <h1>Olá, {{ loggedUser.name.split(' ')[0] }}!</h1>
              <h3 class="mb-3">Falta pouco para finalizarmos seu pedido. Resta somente confirmar os dados de pagamento.</h3>
              
              <h4> Selecione a forma de pagamento para prosseguir</h4>
              <v-select
                :items="formasPagamento"
                solo
                class="mt-1"
                v-model="formaSelecionada"
                label="Forma de Pagamento"></v-select>

                <div v-if="podeParcelar">
                  <h4> Parcele em até 12x, sem juros!</h4>
                  <v-select
                  :items="arrayParcelas"
                  solo
                  class="mt-1"
                  v-model="parcelas"
                  style="max-width: 150px;"
                  label="Parcelas"></v-select>
                </div>
                

              <div v-if="tudoOK">
                <h2>Tudo pronto para finalizarmos!</h2>
                <h4>Por favor, confira as informações antes de finalizar.</h4>
              </div>

            </div>
          </v-flex>
        </v-layout>
      </v-container>
      
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#333333" dark @click="finalizarPedido">Finalizar Pedido</v-btn>
      </v-card-actions>
  </v-card>
  
</template>

<script>
import store from "@/store/cart.js";
import ShowAlert from "@/plugins/ShowAlert";
import CartList from "@/components/CartList.vue";
import axios from "@/plugins/axios";
import axiosOriginal from "axios";

export default {
  data() {
    return {
      nome: "",
      email: "",
      emailCad: "",
      senha: "",
      senhaCad: "",
      parcelas: 1,
      confirmacaoSenha: "",
      formaSelecionada: "",
      formasPagamento: [
        "Boleto Bancário",
        "Cartão de Crédito",
        "PagSeguro",
        "Paypal"
      ]
    };
  },
  methods: {
    autenticar() {
      axiosOriginal
        .post("http://localhost:3000/api/usuarios/autenticar", {
          email: this.email,
          password: this.senha
        })
        .then(function(response) {
          console.log(response);
          store.commit(
            "setToken",
            response.data.token ? response.data.token.token : ""
          );
          store.commit("setUser", response.data.user ? response.data.user : {});
          ShowAlert({ text: "Autenticado", type: "success" });
        })
        .catch(() => {
          ShowAlert({ text: "Email/senha incorretos", type: "error" });
        });
    },
    cadastrar() {
      if (
        this.nome != "" &&
        this.emailCad != "" &&
        this.senhaCad != "" &&
        this.senhaCad == this.confirmacaoSenha
      ) {
        axiosOriginal
          .post("http://localhost:3000/api/usuarios/cadastrar", {
            name: this.nome,
            email: this.emailCad,
            password: this.senhaCad
          })
          .then(function() {
            ShowAlert({
              text:
                "Cadastro efetuado com sucesso! Por favor, efetue login para prosseguir.",
              type: "success"
            });
          })
          .catch(() => {
            ShowAlert({
              text:
                "Ocorreu um erro ao efetuar seu cadastro. Tente novamente mais tarde.",
              type: "error"
            });
          });
      } else {
        ShowAlert({ msg: "Preencha todos os campos!", type: "error" });
      }
    },
    finalizarPedido() {

      if (store.getters.itensCarrinho.length < 1) {
        ShowAlert({
          text: "Adicione um item no carrinho primeiro.",
          type: "error"
        });
        return;
      }

      if(this.formaSelecionada == '') {
        ShowAlert({
          text: "Selecione a forma de pagamento.",
          type: "error"
        });
        return;
      }

      axios
        .post(
          "http://localhost:3000/api/pedidos",
          this.prepararDadosFinalizacaoPedido()
        )
        .then(response => {
          store.dispatch("resetarCarrinho");

          ShowAlert({
            text: "Pedido efetuado com sucesso!",
            type: "success"
          });

          this.$router.push({ name: "home", params: { reset: true } });
        })
        .catch(e => {
          console.log(e);
          ShowAlert({
            text:
              "Ocorreu um erro ao efetuar seu pedido. Tente novamente mais tarde.",
            type: "error"
          });
        });
    },
    prepararDadosFinalizacaoPedido() {
      const total = store.getters.totalPedido;
      const itensPedido = store.getters.itensCarrinho;

      let itens = [];
      for (let i = 0; i < itensPedido.length; i++) {
        let item = itensPedido[i];
        itens.push({
          idProduto: item.id,
          quantidade: item.quantity,
          valorUnitario: item.price
        });
      }

      return {
        total: total.valorTotal,
        desconto: total.valorDesconto,
        itens: itens,
        parcelas: this.parcelas,
        tipoPagamento: this.formaSelecionada
      };
    },
    redirecionarHome() {
      this.$router.push("home");
    }
  },
  computed: {
    tudoOK() {
      return (
        this.formaSelecionada !== "" && this.parcelas < 13 && this.parcelas > 0
      );
    },
    loggedUser() {
      return store.getters.user;
    },
    podeParcelar() {
      return (
        this.formaSelecionada != "Boleto Bancário" &&
        this.formaSelecionada != ""
      );
    },
    arrayParcelas() {
      let parc = [];
      for (let i = 1; i <= 12; i++) {
        parc.push(i);
      }
      return parc;
    },
    totalPedido() {
      return store.getters.totalPedido;
    },
    buscaItensPedido() {
      return store.getters.itensCarrinho;
    },
    logado() {
      return store.getters.token !== "";
    }
  },
  components: {
    CartList
  }
};
</script>

<style scoped>
.checkout {
  margin: 8px;
}

.coluna {
  padding: 20px !important;
  text-align: left;
}
</style>
