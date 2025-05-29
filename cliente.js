import { CuentaCorriente } from "./cuentaCorriente.js"
import { CuentaAhorros } from "./cuentaAhorros.js"
import { Cuenta } from "./cuenta.js"
const modal = document.getElementById('popUpBienvenido')
const messageElement = document.getElementById('popupMessage')
const closeBtn = document.querySelector('.close-btn')
const divInicioSecion = document.getElementById("divIncioSesion")
const divMenuPrincipal = document.getElementById("MenuPrincipal")

const saldo = new Cuenta()
export class cliente {
  constructor(nombre, apellido, direccion, identificacion,cuenta) {
    this.nombre=nombre
    this.apellido=apellido
    this.direcion = direccion
    this.adenticacion=identificacion
    this.registro = []
    this.cuentas = []
  }  
  //Metodo Nuevo registro
  nuevoRegistros(nombre, apellido, direccion, identificacion, tipoCuenta, contraseña) {
  const nombreVal = nombre.value.trim().toLowerCase()
  const apellidoVal = apellido.value.trim().toLowerCase()
  const direccionVal = direccion.value.trim()
  const identificacionVal = identificacion.value.trim()
  const tipoCuentaVal = tipoCuenta.value
  const contraseñaval = contraseña.value
  if (!nombreVal || !apellidoVal || !direccionVal || !identificacionVal || !contraseñaval) {
    alert("⚠️ Todos los campos son obligatorios")
    nombre.value = ""
    apellido.value = ""
    direccion.value = ""
    identificacion.value = ""
    contraseña.value = ""
    return
  }
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const yaExiste = clientes.some(r => r.identificacion === identificacionVal)
  if (yaExiste) {
    alert("⚠️ Ya existe un cliente con esa identificación.")
    nombre.value = ""
    apellido.value = ""
    direccion.value = ""
    identificacion.value = ""
    contraseña.value = ""
    return
  }
  const nuevoNroCuenta = "0005111" + Math.floor(Math.random() * 10000)
  let cuentaNueva
  if (tipoCuentaVal === "CtaAhorros") {
    cuentaNueva = new CuentaAhorros(nuevoNroCuenta, 0, [], 0.02)
  } else {
    cuentaNueva = new CuentaCorriente(nuevoNroCuenta, 0, [], 100000)
  }
  cuentaNueva.tipoCuenta = tipoCuentaVal
  // Guardar la cuenta en localStorage
  const cuentas = JSON.parse(localStorage.getItem("cuentas")) || []
  cuentas.push(cuentaNueva)
  cuentaNueva.guardarEnLocalStorage()
  localStorage.setItem("cuentas", JSON.stringify(cuentas))
  // Crear y guardar el cliente
  const cliente = {
    nombre: nombreVal,
    apellido: apellidoVal,
    direccion: direccionVal,
    identificacion: identificacionVal,
    tipoCuenta: tipoCuentaVal,
    numeroCuanta: nuevoNroCuenta,
    contraseña: contraseñaval,
    bloqueoCuenta: false
  }
  clientes.push(cliente)
  localStorage.setItem("clientes", JSON.stringify(clientes))
  // Mostrar mensaje
  mostrarPopUpBienvenida(`¡Bienvenido(a) ${nombreVal} ${apellidoVal}!

Somos BSS BANK, tu banco digital confiable, seguro y siempre disponible.

Acabas de abrir una cuenta con los siguientes datos:

Tipo de cuenta:              ${tipoCuentaVal}
Número de cuenta:            ${nuevoNroCuenta}
Número de identificación:    ${identificacionVal}

¡Gracias por confiar en nosotros!`)
  // Limpiar formulario
  nombre.value = ""
  apellido.value = ""
  direccion.value = ""
  identificacion.value = ""
  contraseña.value = ""
  function mostrarPopUpBienvenida(mensaje) {
    messageElement.textContent = mensaje
    modal.style.display = 'block'
    closeBtn.onclick = () => modal.style.display = 'none'
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none'
      }
    }
  }
}
  //Metodo inicio sesion
 inicioSesion(cuenta, passwore) { 
  const cuentaVal = cuenta.value.trim()
  const passworeVal = passwore.value.trim()
  let clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const cliente = clientes.find(c => c.numeroCuanta === cuentaVal)
  if (!cliente) {
    alert("⚠️ Cuenta no encontrada.")
    cuenta.value = ""
    passwore.value = ""
    return
  }
  // Inicializar campos si no existen
  if (cliente.intentosFallidos === undefined) cliente.intentosFallidos = 0
   if (cliente.bloqueadoCuenta) {
    alert("🚫 Esta cuenta está bloqueada por intentos fallidos. Contacte al soporte.")
    cuenta.value = ""
    passwore.value = ""
    return
  }
  if (cliente.contraseña !== passworeVal) {
    cliente.intentosFallidos += 1
    if (cliente.intentosFallidos >= 3) {
      cliente.bloqueoCuenta = true
      alert("🚫 Cuenta bloqueada tras 3 intentos fallidos.")
    } else {
      alert(`⚠️ Contraseña incorrecta. Intentos restantes: ${3 - cliente.intentosFallidos}`)
    }
    localStorage.setItem("clientes", JSON.stringify(clientes))
    cuenta.value = ""
    passwore.value = ""
    return
  }
  // Login exitoso
  divInicioSecion.style.display="none"
  divMenuPrincipal.style.display="block"
  cliente.intentosFallidos = 0
  localStorage.setItem("clientes", JSON.stringify(clientes))
  // Mostrar saludo personalizado
  const contenedor = document.getElementById("contenedorMensajes")
  const h2 = document.createElement("h2")
  const nom = cliente.nombre
  const ape = cliente.apellido
  contenedor.innerHTML = ""
  h2.textContent = `${nom.charAt(0).toUpperCase()}${nom.slice(1).toLowerCase()} ` +
                   `${ape.charAt(0).toUpperCase()}${ape.slice(1).toLowerCase()}`
  contenedor.appendChild(h2)
    const cuentaGuardada = JSON.parse(localStorage.getItem(`cuenta_${cliente.numeroCuanta}`))
  if (cliente.tipoCuenta === "CtaAhorros") {
    this.cuentaActiva = Object.assign(new CuentaAhorros(), cuentaGuardada)
  } else {
    this.cuentaActiva = Object.assign(new CuentaCorriente(), cuentaGuardada)
  }
   const contenedorSaldo = document.getElementById("divSaldo")
   const contenedorTipoCueta = document.getElementById("divTipoCuenta")
   const contenedoFecha = document.getElementById("divFecha")
   const lineasaldo = document.createElement("div")
   const lineaTipoCuenta = document.createElement("div")
   const lineaFecha = document.createElement("div")
   contenedorSaldo.innerHTML = ""
   contenedoFecha.innerHTML=""
   contenedorTipoCueta.innerHTML=""
   const tipoCuenta = cliente.tipoCuenta
  const hoy = new Date()
  const opciones = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}
const saldo = Cuenta.consultarSaldoDesdeLocalStorage(cuentaVal)
const fechaFormateada = hoy.toLocaleDateString('es-ES', opciones)
lineaTipoCuenta.textContent= `${tipoCuenta}: ${cuentaVal}`
lineasaldo.textContent= `Saldo: $ ${saldo} `
lineaFecha.textContent= `${fechaFormateada}`
contenedorTipoCueta.appendChild(lineaTipoCuenta) 
contenedorSaldo.appendChild(lineasaldo)               
contenedoFecha.appendChild(lineaFecha)
}
static mostrarFormularioRecuperacion() {
  const modalOlvidoClave = document.getElementById('modalOlvidoClave')
  const closeBtn = document.getElementById('closeBtn')
  const MensajeOlvidoClave = document.getElementById('MensajeOlvidoClave')
  MensajeOlvidoClave.innerHTML = `
    <p>Por favor ingresa los datos para recuperar tu contraseña:</p>
    <label>Nombre:<br></label><input type="text" id="nombreRecuperar" autocomplete="off"><br><br>
    <label>Apellido:<br></label><input type="text" id="apellidoRecuperar" autocomplete="off"><br><br>
    <label>Documento identidad:<br></label><input type="text" id="idDocumentoRecuperar" autocomplete="off"><br><br>
    <label>Número de cuenta:<br> </label><input type="text" id="cuentaRecuperar" autocomplete="off"><br><br>
    <button onclick="verificarDatosRecuperacion()">Verificar</button>
    <div id="resultadoRecuperacion" style="margin-top:10px;color:red;"></div>
  `
    modalOlvidoClave.style.display = 'block'
  closeBtn.onclick = () => modalOlvidoClave.style.display = 'none'
  window.onclick = (event) => {
    if (event.target === modalOlvidoClave) {
      modalOlvidoClave.style.display = 'none'
    }
  }
  window.verificarDatosRecuperacion = function () {
    const nombre = document.getElementById('nombreRecuperar').value.trim().toLowerCase()
    const apellido = document.getElementById('apellidoRecuperar').value.trim().toLowerCase()
    const identificacion = document.getElementById('idDocumentoRecuperar').value.trim()
    const cuenta = document.getElementById('cuentaRecuperar').value.trim()
        const resultado = document.getElementById('resultadoRecuperacion')
    const datosGuardados =JSON.parse(localStorage.getItem(`clientes`)) || []   
    const documentoEncontrado = datosGuardados.find(c=> c.numeroCuanta=== cuenta) 
    if (documentoEncontrado) {
       if (nombre === documentoEncontrado.nombre && apellido === documentoEncontrado.apellido && cuenta === documentoEncontrado.numeroCuanta && identificacion===documentoEncontrado.identificacion) {
        // Mostrar campos para cambiar la contraseña
        resultado.style.color = "white"
        resultado.innerHTML = `
          <p>Datos verificados. Ingrese una nueva contraseña:</p>
          <input type="password" id="nuevaClave" placeholder="Nueva Contraseña" autocomplete="off"><br><br>
          <input type="password" id="confirmacionClave" placeholder="Confirme Contraseña" autocomplete="off"><br><br>
          <button onclick="guardarNuevaClave('${identificacion}')">Guardar nueva contraseña</button>
        `
      }else{
 alert("❌ Los datos ingresados no coinciden con nuestros registros.")
      }
       
    } else {
      alert("❌ No se encontró una cuenta con ese documento.")
    } 
  }
window.guardarNuevaClave = function (id) {
  const nuevaClave = document.getElementById('nuevaClave').value.trim()
  if (nuevaClave.length < 4) {
    alert("La contraseña debe tener al menos 4 caracteres.")
    return
  }
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const clienteIndex = clientes.findIndex(cliente => cliente.identificacion === id)
  if (clienteIndex === -1) {
    alert("❌ Cliente no encontrado.")
    return
  }
  clientes[clienteIndex].contraseña = nuevaClave
  localStorage.setItem('clientes', JSON.stringify(clientes))
  document.getElementById('resultadoRecuperacion').style.color = "white"
  document.getElementById('resultadoRecuperacion').textContent = "✅ Contraseña actualizada con éxito."
  setTimeout(() => {
    modalOlvidoClave.style.display = 'none'
  }, 2500)
    }
  }
}

