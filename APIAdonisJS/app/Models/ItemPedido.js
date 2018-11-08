'use strict'

const Model = use('Model')

class ItemPedido extends Model {
    static get table () {
        return 'itens_pedido'
    }
}

module.exports = ItemPedido
