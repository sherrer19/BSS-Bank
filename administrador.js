const vistaAdministrador = document.getElementById("ConsolAdmin") 
const divIncioSesionAdmin = document.getElementById("divIncioSesionAdmin") 
const formEditarCliente = document.getElementById("formEditarCliente") 
const formEditarAdmin = document.getElementById("formEditarAdmin")
export class administrador {
  constructor(nombre, apellido, usuario) {
    this.nombre = nombre 
    this.apellido = apellido 
    this.usuario = usuario 
  }
  // Inicio de sesión
  inicioSesionAdmin(userInput, claveInput) {
    const userVal = userInput.value.trim().toLowerCase() 
    const claveVal = claveInput.value.trim() 
    const adminsGuardados = JSON.parse(localStorage.getItem("admins")) || [] 
    if (adminsGuardados.length === 0) {
      alert("⚠️ No hay administradores registrados.") 
      return 
    }
    const adminEncontrado = adminsGuardados.find(
      (admin) => admin.usuario === userVal && admin.clave === claveVal
    ) 
    if (adminEncontrado) {
      alert("✅ Inicio de sesión exitoso") 
      divIncioSesionAdmin.style.display = "none" 
      vistaAdministrador.style.display = "block" 
    } else {
      alert("❌ Usuario o contraseña incorrectos.") 
    }
    userInput.value = "" 
    claveInput.value = "" 
  }
  // Mostrar listado de clientes
  mostrarClientes() {
    const lista = document.getElementById("listaClientes") 
    lista.innerHTML = "" 
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [] 
    const tabla = document.createElement("table") 
    tabla.innerHTML = `
      <caption>Lista de Clientes</caption>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Identificación</th>
          <th>Dirección</th>
          <th>Tipo Cuenta</th>
          <th>Número Cuenta</th>
          <th>Bloqueo Cuenta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    ` 
    function capitalizar(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase() 
    }
    const tbody = tabla.querySelector("tbody") 
    clientes.forEach((cliente, index) => {
      const fila = document.createElement("tr") 
      fila.innerHTML = `
        <td>${capitalizar(cliente.nombre)}</td>
        <td>${capitalizar(cliente.apellido)}</td>
        <td>${cliente.identificacion}</td>
        <td>${cliente.direccion}</td>
        <td>${cliente.tipoCuenta}</td>
        <td>${cliente.numeroCuanta}</td>
        <td>${cliente.bloqueoCuenta === true ? "Sí" : "No"}</td>
        <td>
          <button class="visualizar" data-index="${index}" title="Visualizar">👁️</button>
          <button class="editar" data-index="${index}" title="Editar">✏️</button>
          <button class="eliminar" data-index="${index}" title="Eliminar">🗑️</button>
        </td>
      ` 
      tbody.appendChild(fila) 
    }) 
    lista.appendChild(tabla) 
    // Asignar eventos a los botones
    document.querySelectorAll(".visualizar").forEach((boton) => {
      boton.addEventListener("click", (e) => this.visualizarCliente(e)) 
    }) 
    document.querySelectorAll(".editar").forEach((boton) => {
      boton.addEventListener("click", (e) => this.editarCliente(e)) 
    }) 
    document.querySelectorAll(".eliminar").forEach((boton) => {
      boton.addEventListener("click", (e) => this.eliminarCliente(e)) 
    }) 
  }
  // Visualizar movimientos de un cliente
  visualizarCliente(event) {
    const index = event.target.dataset.index 
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [] 
    const cliente = clientes[index] 
    const numeroCuenta = cliente.numeroCuanta 
    const ListaMovimientos = document.getElementById("listaClientes") 
    ListaMovimientos.innerHTML = "" 
    const cuenta = JSON.parse(localStorage.getItem(`cuenta_${numeroCuenta}`)) 
    if (!cuenta || !cuenta.movimientos || cuenta.movimientos.length === 0) {
      ListaMovimientos.innerHTML = `<p>No hay movimientos para esta cuenta.</p>` 
      return 
    }
    const tablaMovimientos = document.createElement("table") 
    tablaMovimientos.innerHTML = `
      <caption>Movimientos Cuenta: ${cliente.numeroCuanta}</caption>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Monto</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody></tbody>
    ` 
    const tbody = tablaMovimientos.querySelector("tbody") 
    cuenta.movimientos.forEach((mov) => {
      const fila = document.createElement("tr") 
      fila.innerHTML = `
        <td>${mov.tipo}</td>
        <td>${mov.monto}</td>
        <td>${mov.fecha}</td>
      ` 
      tbody.appendChild(fila) 
    }) 
    ListaMovimientos.appendChild(tablaMovimientos) 
  }
  // Editar cliente
  editarCliente(event) {
    const index = event.target.dataset.index 
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [] 
    const cliente = clientes[index] 
    document.getElementById("indexEditar").value = index 
    document.getElementById("nombreEditar").value = cliente.nombre 
    document.getElementById("apellidoEditar").value = cliente.apellido 
    document.getElementById("direccionEditar").value = cliente.direccion 
    document.getElementById("documentoEditar").value = cliente.identificacion 
    document.getElementById("documentoBloqueo").value = cliente.bloqueoCuenta === true ? "Sí" : "No" 
    document.getElementById("claveEditar").value = cliente.contraseña
    document.getElementById("modalEditarCliente").style.display = "block" 
  }
  // Eliminar cliente
  eliminarCliente(event) {
    const index = event.target.dataset.index 
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [] 
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar al cliente ${clientes[index].nombre} ${clientes[index].apellido}?`) 
    if (!confirmar) return 
    clientes.splice(index, 1) 
    localStorage.setItem("clientes", JSON.stringify(clientes)) 
    alert("✅ Cliente eliminado con éxito") 
    this.mostrarClientes() 
  }
  // Guardar admin
  guardarAdmin(userAdmin, claveAdmin) {
    const usuario = userAdmin.value.trim().toLowerCase() 
    const clave = claveAdmin.value 
    if (!usuario || !clave) {
      alert("⚠️ Debes ingresar usuario y contraseña.") 
      return 
    }
    let admins = JSON.parse(localStorage.getItem("admins")) || [] 
    const adminData = { usuario, clave } 
    admins.push(adminData) 
    localStorage.setItem("admins", JSON.stringify(admins)) 
    alert("✅ Usuario administrador guardado correctamente") 
    document.getElementById("userAdminNuevo").value = "" 
    document.getElementById("passAdminNuevo").value = "" 
    document.getElementById("modalCrearAdmin").style.display = "none" 
    document.getElementById("listaClientes").style.display="block"
      }
      //mostrar admins
      mostrarUserAdmin() {
    const listaAdmin = document.getElementById("listaUserAdmin") 
    listaAdmin.innerHTML = "" 
    const Admin = JSON.parse(localStorage.getItem("admins")) || [] 
    const tabla = document.createElement("table") 
    tabla.innerHTML = `
      <caption>Lista de Usuarios Administradores</caption>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Clave de acceso</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody></tbody>
    ` 
    function capitalizar(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase() 
    }
    const tbody = tabla.querySelector("tbody") 
    Admin.forEach((admins, index) => {
      const filaA = document.createElement("tr") 
      filaA.innerHTML = `
        <td>${capitalizar(admins.usuario)}</td>
        <td>${(admins.clave)}</td>
        <td>
          <button class="editaAdmin" data-index="${index}" title="Editar">✏️</button>
          <button class="eliminarAdmin" data-index="${index}" title="Eliminar">🗑️</button>
        </td>
      ` 
      tbody.appendChild(filaA) 
    }) 
    listaAdmin.appendChild(tabla) 
    // Asignar eventos a los botones 
    document.querySelectorAll(".editaAdmin").forEach((boton) => {
      boton.addEventListener("click", (e) => this.editarAdmin(e)) 
    }) 
    document.querySelectorAll(".eliminarAdmin").forEach((boton) => {
      boton.addEventListener("click", (e) => this.eliminaAdmin(e)) 
    }) 
  }
  //Editar Admin
editarAdmin(event) {
    const index = event.target.dataset.index 
    const Admins = JSON.parse(localStorage.getItem("admins")) || [] 
    const admin = Admins[index] 
    document.getElementById("indexEditarAdmin").value = index 
    document.getElementById("userEditar").value = admin.usuario 
    document.getElementById("claveEditarAdmin").value = admin.clave
     document.getElementById("modalEditarAdmin").style.display = "block" 
  }
// Eliminar Admin
  eliminaAdmin(event) {
    const index = event.target.dataset.index 
    const admin = JSON.parse(localStorage.getItem("admins")) || [] 
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar al administrador${admin[index].admin} ${admin[index].clave}?`) 
    if (!confirmar) return 
    admin.splice(index, 1) 
    localStorage.setItem("admins", JSON.stringify(admin)) 
    alert("✅ Administrador eliminado con éxito") 
    this.mostrarUserAdmin() 
  }
}
const admin = new administrador() 
// Formulario editar cliente
formEditarCliente.onsubmit = (e) => {
  e.preventDefault() 
  const index = document.getElementById("indexEditar").value 
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [] 
  clientes[index].nombre = document.getElementById("nombreEditar").value.trim() 
  clientes[index].apellido = document.getElementById("apellidoEditar").value.trim() 
  clientes[index].direccion = document.getElementById("direccionEditar").value.trim() 
  clientes[index].identificacion = document.getElementById("documentoEditar").value.trim() 
  const bloqueoInput = document.getElementById("documentoBloqueo").value.trim().toLowerCase() 
  clientes[index].bloqueoCuenta = (bloqueoInput === "si") 
  clientes[index].contraseña = document.getElementById("claveEditar").value.trim().toLowerCase()
  localStorage.setItem("clientes", JSON.stringify(clientes)) 
  alert("✅ Cliente editado con éxito") 
  document.getElementById("modalEditarCliente").style.display = "none" 
  admin.mostrarClientes() 

} 
  formEditarAdmin.onsubmit=(e)=>{
  e.preventDefault()
  const index = document.getElementById("indexEditarAdmin").value
  const admin1 = JSON.parse(localStorage.getItem("admins")) || [] 
  admin1[index].usuario = document.getElementById("userEditar").value.trim()
  admin1[index].clave = document.getElementById("claveEditarAdmin").value.trim()
  localStorage.setItem("admins", JSON.stringify(admin1) )
  alert("✅ Administrador editado con éxito")
  document.getElementById("modalEditarAdmin").style.display="none"
  admin.mostrarUserAdmin()
  }

