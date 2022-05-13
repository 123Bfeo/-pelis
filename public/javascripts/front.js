window.addEventListener("load", function () {
    let formulario = document.querySelector("formLoginIngreso");
    console.log(formulario);
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        let campoCorreo = document.querySelector("input#correo")
        console.log(campoCorreo);
        if (campoCorreo == "") {
            alert("hey care chimba el campo esta vacio..!")
        }
    })

})