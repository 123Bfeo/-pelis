// middleware sirve para cuando un usuario no este logueado no podra acceder a la sesion del user registado

function auhtMiddleware(req, res, next) {

    if (!req.session.userLogged) {
        return res.redirect('/login')
    }
    next()

}
module.exports = auhtMiddleware;



