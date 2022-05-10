//para trabjar con las bases de datos 
let db = require("../database/models");
//para trabajr ccn el json
let User = require("../modelo/User");
//para encriptar la contraseña
const bcryptjs = require('bcryptjs');
//para generar las validaciones 
const { validationResult } = require('express-validator');




let pelisControllers = {
  home: (req, res) => {
    res.render("./web/home")
  },
  // vista para el login 
  login: (req, res) => {
    res.render("./web/login");
  },

  processLogin: (req, res) => {
    // validaciones de login
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("./web/login", {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }
    let userToLogin = User.userPorEmail(req.body.correo);
    if (userToLogin) {
      let comaparaPass = bcryptjs.compareSync(req.body.password, userToLogin.password);
      if (comaparaPass) {
        //elimino el password de userToLogin al entrar en sesionUser
        delete userToLogin.password;
        //Utilizo session para capturar al user que esta loq¿guiandose
        req.session.userLogged = userToLogin;
        return res.redirect("sesion");
      }
      return res.render("./web/login", {
        errors: {
          correo: {
            msg: 'las credenciales no son correctas'
          }
        }
      })
    }
    return res.render("./web/login", {
      errors: {
        correo: {
          msg: 'no se encontro el correo registrado'
        }
      }
    })
  },

  sesionUser: (req, res) => {
    res.render("sesion", { user: req.session.userLogged });
  },

  //para cerrar la sesion 
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/login")
  },

  // vista de registro 
  registro: (req, res) => {
    res.render("./web/registro");
  },
  // proceso de registro 
  processRegistro: (req, res) => {
    //validaciones del register
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("./web/registro", {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }
    let userInBD = User.userPorEmail("correo", req.body.correo);
    if (userInBD) {
      return res.render("./web/registro", {
        errors: {
          correo: {
            msg: 'este correo ya esta registrado'
          }
        },
        oldData: req.body
      })
    }
    // esta variable me guarda lo que resivo del req
    let userToCreate = {
      ...req.body,
      //se encrkipta la contraseña
      password: bcryptjs.hashSync(req.body.password, 10),
      // se captura el nombre de la imagen que se sube con el registro 
      avatar: req.file.filename
    }
    //se agrega la varable al metodo CREATE para que la guarde en el JSON 
    let userCreate = User.create(userToCreate)
    // redireciona  a la vista de login 
    res.redirect("/login");
  },


  crear: (req, res) => {
    db.Genero.findAll().then(function (generos) {
      return res.render("./admin/crearPelicula", { generos: generos });
    });
  },
  addPeli: (req, res) => {
    db.Pelicula.create({
      title: req.body.titulo,
      awards: req.body.premios,
      release_date: req.body.fecha_estreno,
      genre_id: req.body.genero,
      length: req.body.length,
      rating: req.body.rating,
    });
    res.redirect("./lista");
  },
  listadoPeliculas: (req, res) => {
    db.Pelicula.findAll().then(function (pelicula) {
      res.render("./admin/listadoPeliculas", { pelicula: pelicula });
    });
  },
  //para el detalles de la peliculas incluyo las asociaciones entre las tablas
  detalles: (req, res) => {
    db.Pelicula.findByPk(req.params.id, {
      include: [{ association: "genero" }, { association: "actores" }],
    }).then(function (pelicula) {
      res.render("./admin/detallePelicula", { pelicula: pelicula });
    });
  },
  editarPeli: (req, res) => {
    let pedidoPelicula = db.Pelicula.findByPk(req.params.id);
    let pedidoGeneros = db.Genero.findAll();

    Promise.all([pedidoPelicula, pedidoGeneros]).then(function ([
      pelicula,
      generos,
    ]) {
      res.render("./admin/editaPelicula", { pelicula: pelicula, generos: generos });
    });
  },
  actualizarPeli: (req, res) => {
    db.Pelicula.update(
      {
        title: req.body.titulo,
        awards: req.body.premios,
        release_date: req.body.fecha_estreno,
        genre_id: req.body.genero,
        length: req.body.length,
        rating: req.body.rating,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/detalles/" + req.params.id);
  },
  borrarPeli: (req, res) => {
    db.Pelicula.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/lista");
  },

}
module.exports = pelisControllers;


