// cuando un usuario este logueado no pueda acceder al login u registro 
function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/sesion')
    }
    next()
}
module.exports = guestMiddleware;
