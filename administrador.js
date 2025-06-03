const vistaAdministrador = document.getElementById("ConsolAdmin")
const divIncioSesionAdmin = document.getElementById("divIncioSesionAdmin")
export class administrador {
  constructor(nombre, apellido, usuario){
    this.nombre=nombre
    this.apellido=apellido
    this.usuario=usuario
  }
  //Inicio de sesion
inicioSesionAdmin(userInput, claveInput) {
    const userVal = userInput.value.trim().toLowerCase()
    const claveVal = claveInput.value.trim()
    const adminGuardado = JSON.parse(localStorage.getItem("admin"))
        if (!adminGuardado) {
        alert("⚠️ No hay administradores registrados.")
        return
        }
              if (userVal === adminGuardado.usuario) {
                  if (claveVal === adminGuardado.clave) {
                     alert("✅ Inicio de sesión exitoso")
                     divIncioSesionAdmin.style.display="none"
                     vistaAdministrador.style.display="block"
                  } else {
                    alert("❌ Contraseña incorrecta")
                    }
                } else {
                  alert("⚠️ Usuario no encontrado, comuníquese con su Administrador.")
                  }
    userInput.value = ""
    claveInput.value = ""
}
  // Mostrar listado de Clientes creados
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
            <th>Identificacion</th>
            <th>Direccion</th>
            <th>Tipo Cuenta</th>
            <th>Numero Cuenta</th>
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
        <button class="visualizar" data-index="${index}"title="Visualizar">👁️</button>
          <button class="editar" data-index="${index}"title="Editar">✏️</button>
          <button class="eliminar" data-index="${index}"title="Eliminar">🗑️</button>
          </td>
      `
      tbody.appendChild(fila)
    })
    lista.appendChild(tabla)

//Funcionalidades de Visualizar editar y eliminar
document.querySelectorAll(".visualizar").forEach(boton => {
boton.addEventListener("click", visualizarCliente)
})
document.querySelectorAll(".editar").forEach(boton => {
boton.addEventListener("click", editarCliente)

})
document.querySelectorAll(".eliminar").forEach(boton => {
boton.addEventListener("click", eliminarCliente)
})
//Funcion Visualizar movimientos
  function visualizarCliente(event) {
  const index = event.target.dataset.index
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const cliente = clientes[index]
  const numeroCuenta = cliente.numeroCuanta
  const ListaMovimientos = document.getElementById("listaClientes")
  ListaMovimientos.innerHTML = ""
  const cuenta = JSON.parse(localStorage.getItem(`cuenta_${numeroCuenta}`))
  if (!cuenta || !cuenta.movimientos || cuenta.movimientos.length === 0) {
    ListaMovimientos.innerHTML = `<p>No hay movimientos para esta cuenta.</p>: ${cliente.numeroCuanta}`
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
  cuenta.movimientos.forEach(mov => {
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
    //Funcion editar clientes
function editarCliente(event) {
  const index = event.target.dataset.index;
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes[index];

  // Rellenar los campos del modal
  document.getElementById("indexEditar").value = index;
  document.getElementById("nombreEditar").value = cliente.nombre;
  document.getElementById("apellidoEditar").value = cliente.apellido;
  document.getElementById("direccionEditar").value = cliente.direccion;
  document.getElementById("documentoEditar").value = cliente.identificacion;

  // Mostrar el modal
  document.getElementById("modalEditarCliente").style.display = "block";
}
document.getElementById("formEditarCliente").onsubmit = (e) => {
  e.preventDefault();

  const index = document.getElementById("indexEditar").value;
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  clientes[index].nombre = document.getElementById("nombreEditar").value.trim();
  clientes[index].apellido = document.getElementById("apellidoEditar").value.trim();
  clientes[index].direccion = document.getElementById("direccionEditar").value.trim();
  clientes[index].identificacion = document.getElementById("documentoEditar").value.trim();

  localStorage.setItem("clientes", JSON.stringify(clientes));

  alert("✅ Cliente editado con éxito");
  document.getElementById("modalEditarCliente").style.display = "none";

  mostrarClientes();
};
//funcion eliminar clientes 
function eliminarCliente(event) {
  const index = event.target.dataset.index
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const confirmar = confirm(`¿Estás seguro de que deseas eliminar al cliente ${clientes[index].nombre} ${clientes[index].apellido}?`)
      if (!confirmar) return
        clientes.splice(index, 1)
        localStorage.setItem("clientes", JSON.stringify(clientes))
        alert("Se elimino el registro con exito")
  mostrarClientes()
}
}
}
