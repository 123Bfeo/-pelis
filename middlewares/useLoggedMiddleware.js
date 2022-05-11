// cuando este loguedado el usuario la sesion de login y register no apareceran en la viasta 
// me permitira tambien enviar la foto y nombre en toda la sesion 
function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next()

};
module.exports = userLoggedMiddleware;
