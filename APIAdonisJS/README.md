# APIAdonisJS
API simples de produtos feita com o framework AdonisJS para a pós do Senac.

## Como rodar

1. Baixe o repositório
2. Rode o comando **npm install**
3. Copie o arquivo **.env.example** para **.env** e preencha as configurações de conexão com o banco de dados (Posgres nesse caso)
4. Execute o comando **adonis migration:run** para que as tabelas necessárias sejam criadas no banco de dados
5. Execute o comando **adonis serve** para iniciar a aplicação na porta 3333

Para testar, vá até a pasta do projeto e rode o comando **adonis route:list**, esse comando mostrará as rotas implementadas no projeto e a quais métodos HTTP elas respondem.

Para testar o cadastro e edição de produtos, utilize o seguinte corpo de objeto:

```js
{
  "nome": "Nome do produto",
  "descricao": "Descrição detalhada do produto",
  "preco": 1250.00
}
```

Para cadastrar usuários utilize:

```js
{
  "username": "nomedeusuario",
  "email": "seu@email.com",
  "password": "suasenha"
}
```

Para autenticar usuários utilize:

```js
{
  "email": "seu@email.com",
  "password": "suasenha"
}
```


Nota: Foi implementado autenticação via **JWT**. Para consumir as rotas dos produtos, será necessário efetuar autenticação antes. Ao autenticar, voce receberá um token que será utilizado para autenticar sua requisição.

Utilize esse token no header Authorization do tipo Bearer.


## Mapa de Rotas

| Método | Rota                        | Funcionalidade          |
|--------|-----------------------------|-------------------------|
| GET    | api/produtos                | Lista todos os produtos |
| GET    | api/produtos/:id            | Busca um produto por ID |
| GET    | api/produtos/busca/:palavra | Busca produtos por nome |
| POST   | api/produtos                | Cadastra um produto     |
| PUT    | api/produtos/:id            | Modifica um produto     |
| DELETE | api/produtos/:id            | Deleta um produto       |
| POST   | api/usuarios/cadastrar      | Cadastra um usuário     |
| POST   | api/usuarios/autenticar     | Autentica um usuário    |
