// cuando este loguedado el usuario la sesion de login y register no apareceran en la viasta 
// me permitira tambien enviar la foto y nombre en toda la sesion 
const User = require('../modelo/User')

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    /* let emailInCookie = req.cookies.userEmail;
     console.log(emailInCookie)
     let userFromCookies = User.userPorEmail(emailInCookie)
     console.log(userFromCookies);
 
     if (userFromCookies) {
         req.session.userLogged = userFromCookies
     }*/

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next()

};
module.exports = userLoggedMiddleware;
