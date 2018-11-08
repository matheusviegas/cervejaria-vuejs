'use strict'

const Schema = use('Schema')

class ItemPedidoSchema extends Schema {
  up () {
    this.create('itens_pedido', (table) => {
      table.increments()
      table.integer('id_produto').notNullable()
      table.integer('id_pedido').unsigned().references('id').inTable('pedidos')
      table.integer('quantidade').notNullable()
      table.double('valor_unitario').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('itens_pedido')
  }
}

module.exports = ItemPedidoSchema
