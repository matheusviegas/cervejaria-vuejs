'use strict'

const User = use('App/Models/User')

class AuthController {


  async cadastrar({
    request
  }) {
    const dados = request.only(['name', 'email', 'password'])
    const usuario = await User.create(dados);

    return usuario;
  }

  async autenticar({
    request,
    auth
  }) {
    console.log("Chegou AUTENTICAR");
    //console.log(request);

    const {
      email,
      password
    } = request.all();
    const token = await auth.attempt(email, password);
    let user = await User.query().where('email', email).fetch();
    let u = user.toJSON()[0];

    return {
      token: token,
      user: {
        id: u.id,
        name: u.name,
        email: email
      }
    };
  }

  async findUser({
    params,
    auth
  }) {

    console.log(await auth.getUser());

    const user = await User.find(params.id);

    return user;
  }

}

module.exports = AuthController
