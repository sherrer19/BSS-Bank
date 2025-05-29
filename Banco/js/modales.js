let botonRegistro = document.getElementById("botonRegistro");
let Registro = document.getElementById("Registro");
let incioSesion = document.getElementById("incioSesion");

botonRegistro = addEventListener("click", () => {
    Registro.style.display = "none";
    incioSesion.style.display = "block";
})

