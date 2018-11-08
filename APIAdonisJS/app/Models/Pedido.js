'use strict'

const Model = use('Model')

class Pedido extends Model {
    itens () {
        return this.hasMany('App/Models/ItemPedido', 'id', 'id_pedido');
    }
}

module.exports = Pedido
