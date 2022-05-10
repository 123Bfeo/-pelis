//valida la inforacion del usuario que se esta registrando 
const path = require('path');
const { body } = require('express-validator');
const validations = [
    body('correo').notEmpty().withMessage('Este Campo no puede estar vacio').bail()
        .isEmail().withMessage('Formato de correo invalido'),
    body('password').notEmpty().withMessage('Necesitas una Contraseña'),
    body('nombre').notEmpty().withMessage('Por favor, indica tu nombre'),
    body('apellido').notEmpty().withMessage('Indica tu apellido'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtenssions = ['.jpg', '.png', '.gif']
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        }
        else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtenssions.includes(fileExtension)) {
                throw new Error(`Extenciones permitidas${acceptedExtenssions.join(', ')}`);
            }
        }
        return true;
    })
]

module.exports = validations;