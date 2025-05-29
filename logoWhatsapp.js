const enlace = document.createElement("a")
enlace.href = "https://wa.me/3205324682" 
enlace.target = "_blank"

const imagen = document.createElement("img")
imagen.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
imagen.alt = "Chat en WhatsApp"
enlace.appendChild(imagen)
document.getElementById("whatsapp-flotante").appendChild(enlace)