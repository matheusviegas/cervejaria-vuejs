'use strict'

const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Web Service Rodando em http://127.0.0.1:3000'
  }
})


Route.group(() => {
    Route.get('/pedidos/:id', 'PedidoController.findById').middleware('auth');
    Route.get('/pedidos/user/:userid', 'PedidoController.findByUserId').middleware('auth');
    Route.post('/pedidos', 'PedidoController.salvarPedido').middleware('auth');
    Route.get('/usuarios/:id', 'AuthController.findUser').middleware('auth');

    Route.post('/usuarios/cadastrar', 'AuthController.cadastrar');
    Route.post('/usuarios/autenticar', 'AuthController.autenticar');
  })
  .prefix('api')
