const express = require("express");
const routerPeli = express.Router();
const path = require('path');

//requiero multer 
const multer = require('multer')
const controllers = require("../controllers/controllersPelicula");
const multerDiskStorage = require('../middlewares/multerMiddleware');
// hago uso del modulo creado*/
let fileUpload = multer({ storage: multerDiskStorage });



//requiero las validasiones para el registro
const validationsRegister = require('../middlewares/validationRegistro')
//requiero validaciones para el  login 
const validationsLogin = require('../middlewares/validationLogin');
const { route } = require("express/lib/application");
// validacion un usuario ya esta logueado no puede acceder al registro o login
const guestMiddleware = require('../middlewares/guestMiddleware');
//validacion si no esta registado no puede acceder al sesion User 
const auhtMiddleware = require('../middlewares/authMiddleware');


/*home*/
routerPeli.get("/", controllers.home);
/*login*/
routerPeli.get("/login", guestMiddleware, controllers.login);
routerPeli.post("/login", validationsLogin, controllers.processLogin);

//registro
routerPeli.get("/registro", guestMiddleware, controllers.registro);
routerPeli.post("/registro", fileUpload.single("avatar"), validationsRegister, controllers.processRegistro);
// sesion del usuario
routerPeli.get("/sesion", auhtMiddleware, controllers.sesionUser)
// cerrar sesion 
routerPeli.get("/logout", auhtMiddleware, controllers.logout)

// crear una pelicula (C)
routerPeli.get("/crear", auhtMiddleware, controllers.crear);
routerPeli.post("/crear", controllers.addPeli);


// lectura de las peliculas (R)
routerPeli.get("/lista", auhtMiddleware, controllers.listadoPeliculas);

//detalles de pelicula
routerPeli.get("/detalles/:id", auhtMiddleware, controllers.detalles);

//actualizar  pelicula (U)
routerPeli.get("/editar/:id", auhtMiddleware, controllers.editarPeli);
routerPeli.post("/editar/:id", controllers.actualizarPeli);


//borrar peli (D)
routerPeli.post("/borrar/:id", controllers.borrarPeli);

module.exports = routerPeli;

