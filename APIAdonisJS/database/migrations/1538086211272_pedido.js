'use strict'

const Schema = use('Schema')

class PedidoSchema extends Schema {
  up() {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('id_usuario').unsigned().references('id').inTable('users')
      table.timestamp('data_pedido').notNullable()
      table.double('valor_total')
      table.double('desconto')
      table.string('tipo_pagamento')
      table.integer('parcelas')
      table.timestamps()
    })
  }

  down() {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
