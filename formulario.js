const formularioTC = document.getElementById("formularioTC")  
const formulariosimutTC = document.getElementById("formulariosimutTC")  
const cerrarModalTC = document.getElementById("cerrarModalTC")  
const enviarFormulario = document.getElementById("enviarFormulario")
const divformularioContactenos = document.getElementById("divformularioContactenos")
const formularioContactenos = document.getElementById("formularioContactenos")
const enviarFormularioCoctactens = document.getElementById("enviarFormularioCoctactens")
const cerrarModalContactenos = document.getElementById("cerrarModalContactenos")

// Mostrar el modal al hacer click en el div
formularioTC.addEventListener("click", () => {
  formulariosimutTC.style.display = "block"  
  })  

// Ocultar el modal al hacer click en el botón de cerrar
cerrarModalTC.addEventListener("click", () => {
  formulariosimutTC.style.display = "none"  
 })  

// También puedes permitir cerrar el modal haciendo click afuera
window.addEventListener("click", (event) => {
  if (event.target === formulariosimutTC) {
    formulariosimutTC.style.display = "none"  
  }
})  
enviarFormulario.addEventListener("click",()=>{
  alert("✅ ¡Bien hecho! Recuerda que en 24 horas nos contactaremos contigo.")
})
formularioContactenos.addEventListener("click", () => {
  divformularioContactenos.style.display = "block"  
  })  
  enviarFormularioCoctactens.addEventListener("click",()=>{
    alert("✅ Nos contactaremos contigo en breve.")
  })


// Ocultar el modal al hacer click en el botón de cerrar
cerrarModalContactenos.addEventListener("click", () => {
  divformularioContactenos.style.display = "none"  
 })  

// También puedes permitir cerrar el modal haciendo click afuera
window.addEventListener("click", (event) => {
  if (event.target === divformularioContactenos) {
    divformularioContactenos.style.display = "none"  
  }
})  


