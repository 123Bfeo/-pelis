//valida la informacion del usuario que se esta logeandon 
const { body } = require('express-validator');
const validationslogin = [
    body('correo').notEmpty().withMessage('Este Campo no puede estar vacio').bail()
        .isEmail().withMessage('Formato de correo invalido'),
    body('password').notEmpty().withMessage('Ingresse su contraseña'),
]

module.exports = validationslogin;