// para dejar el proyecto como estaba, eliminar la caprte  modelo y database2


//listar todos los usuarios                              (✓)
//gardar un usuario en el json                           (✓)
//Buscar al usuario por su id                            (✓)
//buscar al usuario que se quiere loguear por su email   (✓)
//eliminar a un usuario de la db                         (✓)
//editar la informacion de un usuario                    

const fs = require("fs");

const User = {
  // guardo la direccion de mi JSON 
  fileName: "./database2/users.json",

  //convierto el JSON  en un array de objetos para manipular 
  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },



  //generar un ID para el nuevo usuario que se registre 
  generateId: function () {
    //obtenmos la lista de usuarios 
    let allUser = this.listUser();
    //obtenemos el ultimo usuario
    let lastUser = allUser.pop();
    //condicion que si  lastUser no esta vacio me retornne lastUser+ 1
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },



  //me permite crear un nuevo User y agregarlo al Json
  create: function (infoUser) {
    //traigo toda la lista de user 
    let allUser = this.listUser();
    // defino la variable newUser que me contiene un objeto 
    let newUser = {
      //defino que el Id sera proporcianado por el metodo generateId(),
      id: this.generateId(),
      //por ultimo le digo que el resto del objeto sera lo que venga del parametro infoUser
      ...infoUser
    }
    //hago un push a la lista de todos los user con el objero newUser 
    allUser.push(newUser);
    //escribo en el Json lo que se acaba de guardar en la lista de todos los user 
    fs.writeFileSync(this.fileName, JSON.stringify(allUser, null, ' '));
    // si esto se realiza sin errores me devuelve un True 
    return newUser;
  },



  // utilizo mi JSON parceado, lo cual me trae todos los usuarios 
  listUser: function () {
    return this.getData();
  },



  // busco en mi Json Parseado el usuario a traves de su ID
  userPorId: function (id) {
    //Me trae todos los Usuarios
    let allUser = this.listUser();
    //me condiciona que si el ID en mi lista de Usuarios es Igual al ID que estoy ingresado
    let searchUser = allUser.find(user => user.id === id);
    // me devuelve la busqueda 
    return searchUser;
  },



  // el mismo caso de buscar por a ID a diferencia que este es por correo 
  userPorEmail: function (text, field = "correo") {
    let allUser = this.listUser();
    let searchUser = allUser.find(user => user[field] === text);
    return searchUser;
  },



  // Un metodo que  elimana un usurario
  deleteUser: function (id) {
    // traemos todos los usuarios 
    let allUser = this.listUser();
    //filtramos en nuetra lista de usuarios  y buscamos el que queremos borrar 
    let userBorrado = allUser.filter(user => user.id != id);
    //escribimos en el Json lo que estammmos recuperando del filter
    fs.writeFileSync(this.fileName, JSON.stringify(userBorrado, null, ' '));
    return "User Borrados";
  }

};

module.exports = User;
//console.log(User.fileName);
//console.log(User.getData());
//console.log(User.userPorEmail("joselina@gmail.com"));
//console.log(User.deleteUser(7));
//console.log(User.userPorId(4))