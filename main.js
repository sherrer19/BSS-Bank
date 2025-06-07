import { cliente } from "./cliente.js"
import { Cuenta } from "./cuenta.js"
import{administrador}from "./administrador.js"
import { CuentaAhorros } from './cuentaAhorros.js'
const nombre = document.getElementById("regNombre")
const apellido = document.getElementById("regApellido")
const direccion = document.getElementById("regDireccion")
const identificacion = document.getElementById("regID")
const tipoCuenta = document.getElementById("regTipoCuenta")
const contraseña = document.getElementById("passwore")
const agregar = document.getElementById("registro1")
const inicioSesion = document.getElementById("inicioSesion")
const cuentaIni = document.getElementById("loginID")
const claveIni = document.getElementById("passworeEnter")
const montoConsignar = document.getElementById("montoConsignar") 
const montoRetirar = document.getElementById("montoRetirar")
const listaMovimientos = document.getElementById("listaMovimientos")
const cuentaDestino = document.getElementById("cuentaDestino")
const montoTransferir = document.getElementById("montoTransferir")
const quieroRegistrarme = document.getElementById("QuieroRegistrarme")
const confirmacionConsignacion = document.getElementById ("confirmacionConsignacion")
const confirmacionRetiro= document.getElementById ("confirmacionRetiro")
const confirmacionTransferencia=document.getElementById("confirmacionTransferencia")
const btnRetirar = document.getElementById("btnMostrarRetirar")
const btnConsignar = document.getElementById("btnConsignaciones")
const btnRetiroMenu  = document.getElementById("btnRetirosMenu")
const btnTransferirMenu = document.getElementById("btnTransferirMenu")
const btnConsignarMenu = document.getElementById("btnConsignacionesMenu") 
const btnCerrarSesion = document.getElementById("btnCerrarSesion")
const btnTransferir = document.getElementById("btnTransferir")
const btnVerMovimientos = document.getElementById("btnMovimientos")
const divTransferencia = document.getElementById("divTransferir")
const divbtnRetiros = document.getElementById("divRetiro")
const divCOnsignacion = document.getElementById("Consignacion")
const divMenuPrincipal = document.getElementById("MenuPrincipal")
const divInicioSecion = document.getElementById("divIncioSesion")
const divregistro= document.getElementById("Registro")
const salirRigistro = document.getElementById("salirNuevoRegistro")
const salirConsignacion = document.getElementById("salirConsignacion")
const salirRetiro = document.getElementById("salirRetiro")
const salirTransferencia = document.getElementById("salirTransferencia")
const olvidoClaveCliente   = document.getElementById("olvidoClave")
const IngresoAdmin = document.getElementById("IngresoAdmin")
const divIncioSesionAdmin = document.getElementById("divIncioSesionAdmin")
const IngresoAdminCliente = document.getElementById("IngresoAdminCliente")
const inicioSesionAdmin = document.getElementById("inicioSesionAdmin")
const passAdmin = document.getElementById("passAdmin")
const userAdmin = document.getElementById("userAdmin")
const mostrarCuentas = document.getElementById("mostrarCuentas")
 const guardarAdminBtn = document.getElementById("guardarAdminBtn") //guardador real
 const modalCrearAdmin = document.getElementById("modalCrearAdmin")
 const crearAdminBtn = document.getElementById("crearAdmin")
 const cerrarModalAdmin = document.getElementById("cerrarModalAdmin")
 const userAdminNueva = document.getElementById("userAdminNuevo")//user real
 const claveAdminNueva = document.getElementById("passAdminNuevo")//clave real
 const listaClientes=document.getElementById("listaClientes")
 const mostrarAdminsbtn = document.getElementById("mostrarAdmins")
 const divlistaUserAdmin = document.getElementById("listaUserAdmin")
/*  const guardarAdminprueba  = document.getElementById("guardarAdmin")//retirar
 const usuaroprueba = document.getElementById("userAdmin")//retirar
 const claveprueba = document.getElementById("passAdmin")//retirar */
const Inicio = new cliente()
const admin = new administrador()

mostrarAdminsbtn.addEventListener("click", ()=>{
divlistaUserAdmin.style.display="block"
listaClientes.style.display="none"
admin.mostrarUserAdmin()
})

crearAdminBtn.addEventListener("click",()=>{
  listaClientes.style.display = "none"
   modalCrearAdmin.style.display = "block"   
})
cerrarModalAdmin.addEventListener("click",()=>{
   modalCrearAdmin.style.display = "none"
   listaClientes.style.display = "block"
})  
  guardarAdminBtn.addEventListener("click",()=>{
    admin.guardarAdmin(userAdminNueva,claveAdminNueva)
  })
mostrarCuentas.addEventListener("click", ()=>{
  admin.mostrarClientes()
  divlistaUserAdmin.style.display="none"
  listaClientes.style.display="block"

})
inicioSesionAdmin.addEventListener("click",()=>{
  admin.inicioSesionAdmin(userAdmin, passAdmin)
divlistaUserAdmin.style.display="none"
listaClientes.style.display="none"

})
//Eventos Regresar
IngresoAdmin.addEventListener("click", () =>{
  divInicioSecion.style.display = "none"
  divIncioSesionAdmin.style.display = "block"
})
IngresoAdminCliente.addEventListener("click", () =>{
  divInicioSecion.style.display = "block"
  divIncioSesionAdmin.style.display = "none"
})
salirRigistro.addEventListener("click", () =>{
  divInicioSecion.style.display = "block"
  divregistro.style.display = "none"
})
salirConsignacion.addEventListener("click",()=>{
  divMenuPrincipal.style.display = "block"
  divCOnsignacion.style.display = "none"
})
salirRetiro.addEventListener("click",()=>{
    divMenuPrincipal.style.display = "block"
  divbtnRetiros.style.display = "none"
})
salirTransferencia.addEventListener("click",()=>{
   divMenuPrincipal.style.display = "block"
  divTransferencia.style.display = "none"
})
//Evento div registro
quieroRegistrarme.addEventListener("click", ()=> {
  divInicioSecion.style.display = "none"
  divregistro.style.display = "block"
})
//Evento agregar usuario nuevo
agregar.addEventListener("click", () => {
  Inicio.nuevoRegistros(nombre,apellido,direccion, identificacion,tipoCuenta,contraseña) 
  divInicioSecion.style.display = "block"
  divregistro.style.display = "none"

 })
 //Evento Inicio de sesion
 inicioSesion.addEventListener("click",()=>{
  Inicio.inicioSesion(cuentaIni,claveIni)
  const h2 = document.createElement("h2")
  })
//Evento div consignar
btnConsignarMenu.addEventListener("click", ()=> {
  divMenuPrincipal.style.display = "none"
  divCOnsignacion.style.display = "block"
})
//Evento div retiro
btnRetiroMenu.addEventListener("click", ()=> {
  divMenuPrincipal.style.display = "none"
  divbtnRetiros.style.display = "block"
})

//Evento div transferencia
btnTransferirMenu.addEventListener("click", ()=> {
  divMenuPrincipal.style.display = "none"
  divTransferencia.style.display = "block"
})
//Evento Olvido contraseña
olvidoClaveCliente.addEventListener("click", () => {
  cliente.mostrarFormularioRecuperacion()
})
//Evento consignar
btnConsignar.addEventListener("click", () => {
  const h2 = document.createElement("h2")
  const monto = parseFloat(montoConsignar.value)
  confirmacionConsignacion.innerHTML = ""
  if (isNaN(monto) || monto <= 0) {
  alert("⚠️ Monto inválido")   
    montoConsignar.value=""    
    listaMovimientos.innerHTML = ""
    return
  }
  if (Inicio.cuentaActiva) {
    Inicio.cuentaActiva.realizarConsignacion(monto)    
      h2.textContent = `💰 Consignación exitosa. Nuevo saldo: ${Inicio.cuentaActiva.saldo}`
      confirmacionConsignacion.style.display = "block"
      confirmacionConsignacion.appendChild(h2)
      montoConsignar.value=""
      listaMovimientos.innerHTML = ""
    }     
    setTimeout(() => {
  divCOnsignacion.style.display="none"
      confirmacionConsignacion.style.display = "none"
      divMenuPrincipal.style.display  = "block"
    }, 3000)
    const contenedorSaldo = document.getElementById("divSaldo")
    const lineasaldo = document.createElement("div")
    contenedorSaldo.innerHTML = ""
    lineasaldo.textContent= `Saldo: $ ${Inicio.cuentaActiva.saldo} `
    contenedorSaldo.appendChild(lineasaldo)
  })
//Evento retirar
btnRetirar.addEventListener("click", () => {
  const h2 = document.createElement("h2")
  const monto = parseFloat(montoRetirar.value)
  confirmacionRetiro.innerHTML = ""
  if (isNaN(monto) || monto <= 0) {
    alert("⚠️ Monto inválido")
    montoRetirar.value=""
    listaMovimientos.innerHTML = ""
    return
  }
  if (Inicio.cuentaActiva) {
    const exito = Inicio.cuentaActiva.realizarRetiro(monto)
    if (exito) {
      h2.textContent = `✅ Retiro exitoso. Nuevo saldo: ${Inicio.cuentaActiva.saldo}`
      confirmacionRetiro.style.display = "block"
      confirmacionRetiro.appendChild(h2)
      montoRetirar.value=""
      listaMovimientos.innerHTML = ""
    }else{
      h2.textContent = "⚠️ Fondos Insuficiente"
      montoRetirar.value=""
      confirmacionRetiro.style.display = "block"
      confirmacionRetiro.appendChild(h2)
      listaMovimientos.innerHTML = ""
    }
    setTimeout(() => {
      divbtnRetiros.style.display="none"
      confirmacionRetiro.style.display = "none"
          divMenuPrincipal.style.display = "block"
        }, 3000)
  } 
   const contenedorSaldo = document.getElementById("divSaldo")
    const lineasaldo = document.createElement("div")
    contenedorSaldo.innerHTML = ""
    lineasaldo.textContent= `Saldo: $ ${Inicio.cuentaActiva.saldo} `
    contenedorSaldo.appendChild(lineasaldo)
})
//Evento Consultar movimiento
btnVerMovimientos.addEventListener("click", () => {
  const cuenta = Inicio.cuentaActiva
  const movimientos = cuenta.consultarMovimientos()

  if (movimientos.length === 0) {
    listaMovimientos.innerHTML = "<p>📭 No hay movimientos registrados.</p>"
    return
  }
  listaMovimientos.innerHTML = `
    <table border="1" cellspacing="3" cellpadding="9">
    <caption>Movimientos de la cuenta ${cuenta.numero}</caption> 
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
        ${movimientos.map(m => `
          <tr>
            <td>${new Date(m.fecha).toLocaleString()}</td>
            <td>${m.tipo}</td>
            <td>$${m.monto.toLocaleString()}</td>
          </tr>`).join("")}
      </tbody>
    </table>
  `
})
//Evento transfrir
btnTransferir.addEventListener("click", () => {
  const numeroDestino = cuentaDestino.value.trim()
  const monto = parseFloat(montoTransferir.value)
  const h2 = document.createElement("h2")
  confirmacionTransferencia.innerHTML = ""
  if (!numeroDestino || isNaN(monto) || monto <= 0) {
    alert("⚠️ Cuenta destino o monto inválido")
    cuentaDestino.value=""
    montoTransferir.value=""
    listaMovimientos.innerHTML = ""
      return
  }
  const cuentaOrigen = Inicio.cuentaActiva
  const cuentas = JSON.parse(localStorage.getItem("cuentas")) || []
let cuentaDestinoObj = cuentas.find(c => c.numero === numeroDestino)

if (cuentaDestinoObj) {
  cuentaDestinoObj = CuentaAhorros.cargarDesdeLocalStorage(numeroDestino)
 if (!cuentaDestinoObj) {
    const cuentaData = JSON.parse(localStorage.getItem(`cuenta_${numeroDestino}`))
    if (cuentaData) {
      cuentaDestinoObj = new Cuenta(
        cuentaData.numero,
        cuentaData.saldo,
        cuentaData.movimientos
      )
    }
  }
}
if (!cuentaDestinoObj) {
  alert("⚠️ La cuenta destino no existe")
  cuentaDestino.value = ""
  montoTransferir.value = ""
  listaMovimientos.innerHTML = ""
  return
}
  if (!cuentaDestinoObj) {
    alert("⚠️ La cuenta destino no existe")
      cuentaDestino.value=""
    montoTransferir.value=""
    listaMovimientos.innerHTML = ""
    return
  }
  const éxito = cuentaOrigen.realizarTransferencia(cuentaDestinoObj, monto)
  if (éxito) {
    h2.textContent = `✅ Transferencia exitosa a la cuenta ${numeroDestino}`
    confirmacionTransferencia.style.display = "block"
    confirmacionTransferencia.appendChild(h2)
        cuentaDestino.value=""
    montoTransferir.value=""
    listaMovimientos.innerHTML = ""
  } else {
    h2.textContent = "⚠️ Fondos insuficientes para la transferencia"
    confirmacionTransferencia.style.display = "block"
    confirmacionTransferencia.appendChild(h2)
    cuentaDestino.value=""
    montoTransferir.value=""
    listaMovimientos.innerHTML = ""
  }
  setTimeout(() => {
    divTransferencia.style.display = "none"
    confirmacionTransferencia.style.display = "none"
    divMenuPrincipal.style.display = "block"
  }, 3000)
    const contenedorSaldo = document.getElementById("divSaldo")
    const lineasaldo = document.createElement("div")
    contenedorSaldo.innerHTML = ""
    lineasaldo.textContent= `Saldo: $ ${Inicio.cuentaActiva.saldo} `
    contenedorSaldo.appendChild(lineasaldo)
})
//Evento Cerrar sesion
btnCerrarSesion.addEventListener("click", () => {
  /* localStorage.clear() */ 
  document.getElementById("MenuPrincipal").style.display = "none"    
  document.getElementById("divIncioSesion").style.display = "block"  
  alert("Sesión cerrada correctamente.")
  cuentaIni.value=""
  claveIni.value=""
  listaMovimientos.innerHTML = ""
})