'use strict'

const Pedido = use('App/Models/Pedido')
const ItemPedido = use('App/Models/ItemPedido')

class PedidoController {
 
  async salvarPedido ({ request, auth }) {
    const user = await auth.getUser();
    const paramData = request.only(['total', 'desconto', 'itens', 'parcelas', 'tipoPagamento']);

    const dados = {
      id_usuario: user.id,
      data_pedido: new Date(),
      desconto: paramData.desconto,
      tipo_pagamento: paramData.tipoPagamento,
      parcelas: paramData.parcelas
    }

    const pedido = await Pedido.create(dados);
    let total = 0;

    for(let i = 0; i < paramData.itens.length; i++) {
      const item = paramData.itens[i];

      await ItemPedido.create({
        id_produto: item.idProduto,
        quantidade: item.quantidade,
        valor_unitario: item.valorUnitario,
        id_pedido: pedido.id
      });

      total += Number(item.valorUnitario * item.quantidade);
    }

    pedido.valor_total = total;
    await pedido.save();

    return pedido;
  }

  async findById ({ params }) {
    const pedido = await Pedido.query().with('itens').where('id', params.id).fetch();

    return pedido;
  }

  async findByUserId({params}) {
    const pedidos = await Pedido.query().with('itens').where('id_usuario', params.userid).fetch();

    return pedidos;
  }

}

module.exports = PedidoController
