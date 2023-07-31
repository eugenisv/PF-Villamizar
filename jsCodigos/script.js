let seleccionOrden = document.getElementById("seleccionOrden")
let buscar = document.getElementById("buscarProducto")
let bttnFiltrarPrecio = document.getElementById("filtrarPrecio")
let bttnOrdenar = document.getElementById("btnOrdenar")
let nroItemsCarrito = document.getElementById("nro-items-carrito")
let bttnMostrarCarrito = document.getElementById("mostrar-carrito")
let bttnIniciarSesion = document.getElementById("btnLogin")
let bttnCerrarSesion = document.getElementById("btnSout")
let bttnRmFiltro = document.getElementById("rmFiltro")

// Para "iniciar sesión"
if (localStorage.getItem("Nombre")) {
  document.getElementById("nombre").value = localStorage.getItem("Nombre")
  document.getElementById("txtAcceso").innerText = localStorage.getItem("Nombre")
  document.getElementById("email").value = localStorage.getItem("E-mail")
  localStorage.setItem("login", true)
  bttnCerrarSesion.disabled = false
  bttnIniciarSesion.disabled = true
} else {
  localStorage.setItem("login", false)
}
if (localStorage.getItem("nroItems")) {
  nroItemsCarrito.innerText = `${parseInt(localStorage.getItem("nroItems"))}`
} 

//array con los productos del carrito
localStorage.getItem("Carrito") ? carritoItems = JSON.parse(localStorage.getItem("Carrito")) : carritoItems = []

// Para organizar los productos 
seleccionOrden.addEventListener("change", () => {
  switch (seleccionOrden.value) {
    case "0":
      mostrarCatalogo(listaProductos)
      break
    case "1":
      orMenorMayor(listaProductos)
      break
    case "2":
      orMayorMenor(listaProductos)
      break
    case "3":
      orAlfabetico(listaProductos)
      break
    default:
      console.log("Opción no válida")
  }
})

// Evento busqueda por nombre
buscar.addEventListener("click", () => buscarProducto(listaProductos))

// Evento Filtrar por precio
bttnFiltrarPrecio.addEventListener("click", () => filtrarPrecio(listaProductos))

// Evento para quitar 
bttnRmFiltro.addEventListener("click", () => mostrarCatalogo(listaProductos))

// Evento ordenar
bttnOrdenar.addEventListener("click", () => ordenarCompra(carritoItems))

// Evento mostrar el carrito
bttnMostrarCarrito.addEventListener("click", ()=> mostrarCarrito(carritoItems))

//Evento iniciar sesion
bttnIniciarSesion.addEventListener("click", () => iniciarSesion())

// Evento cerrar sesion
bttnCerrarSesion.addEventListener("click", () => cerrarSesion())

// FUNCIONES
// Función que carga las cards con la info del array de productos
function mostrarCatalogo (array){
  let productosDiv = document.getElementById("productos")
  productosDiv.innerHTML = ''
productosDiv.innerHTML = ''
  for (let producto of array) {
      let nuevoProductoDiv = document.createElement("div")
      nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2"
      nuevoProductoDiv.innerHTML = `<div class="card d-flex justify-content-center" style="width: 18rem;">
                                      <div class="card-body">
                                      <h5 class="card-title">${producto.nombreProducto}</h5>
                                      <p class="card-text">$${producto.precioProducto}</p>
                                      <p class="card-text">${producto.descripcionProducto}</p>
                                      <button id="${producto.id}"href="#" class="btn btn-primary aggCarrito">Agregar al carrito</button>
                                      </div>
                                  </div>`
      productosDiv.appendChild(nuevoProductoDiv)

      let btnAgg = document.getElementById(`${producto.id}`)
      btnAgg.addEventListener("click", () => {aggCarrito(producto)})

  }
}

function aggCarrito (producto) {
  let agregado = carritoItems.find((elemento) => elemento.id == producto.id)
  // Revisa si ya fue agregado previamente 
  if (agregado == undefined) {
    let nProducto = {
      ... producto,
      cantidad : 1
    }
    carritoItems.push(nProducto)
  } else {
    agregado.cantidad = agregado.cantidad + 1
  }
  localStorage.setItem("Carrito", JSON.stringify(carritoItems))
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `Añadiste ${producto.nombreProducto} a tu carrito!`,
    showConfirmButton: false,
    imageHeight: 150,
    timer: 1500
  })
  actualizarCarrito()

}

// función para hacer búsqueda de producto por nombre
function buscarProducto (array) {
  event.preventDefault()
  productoBusqueda = document.getElementById("productoBuscado").value
  let busqueda = array.filter (
    (producto) => producto.nombreProducto.toUpperCase().includes(productoBusqueda.toUpperCase()) 
  )
  // Si no se encuentra el producto
  if (busqueda.length == 0) {
    Swal.fire(
      'mmm... Has escrito correctamente?',
      `Fita todavía no cuenta con "${productoBusqueda}" en su menú :/`,
      'question'
    )
  } else {
    mostrarCatalogo(busqueda)
  }
}

//función para filtrar por precios 
function filtrarPrecio (array) {
  maxPrecio = parseFloat(document.getElementById("filtradoPrecio").value)
  if (isNaN(maxPrecio)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingresa un valor válido',
    })
    return
  } 
  let busqueda = array.filter (
    (producto) => producto.precioProducto <= maxPrecio
  )
  if (busqueda.length == 0) {
    Swal.fire(
      '. . . Y si aumentas el rango?',
      `No tenemos platillos que se adapten a tu búsqueda :/`,
      'question'
    )
    return
    } 
  mostrarCatalogo(busqueda)
}


//Funciones para ordenar de mayor a menor, al revés y alfabéticamente
function orMenorMayor(array) {
  let menorMayor = [].concat(array)
  menorMayor.sort((a, b) => a.precioProducto - b.precioProducto)
  mostrarCatalogo(menorMayor)
}

function orMayorMenor(array) {
  let mayorMenor = [].concat(array)
  mayorMenor.sort((a, b) => b.precioProducto - a.precioProducto)
  mostrarCatalogo(mayorMenor)
}

function orAlfabetico(array) {
  let alfabetico = [].concat(array)
  alfabetico.sort((a, b) => {
    if (a.nombreProducto < b.nombreProducto) {
      return -1
    } else if (a.nombreProducto > b.nombreProducto) {
      return 1
    } 
    // son iguales
      return 0
  })
  mostrarCatalogo(alfabetico)
}

function iniciarSesion (){
  const nombre = document.getElementById("nombre")
  const email = document.getElementById("email")
  
  if (nombre.value == "" || email.value == "") {
    Swal.fire({
      title: 'Hey!',
      icon: 'error',
      confirmButtonColor: 'green',
      text: `Por favor, rellena todos los campos requeridos.`,
      })
      return
  }
  localStorage.setItem("Nombre", nombre.value)
  localStorage.setItem("E-mail", email.value)
  localStorage.setItem("login", true)
  location.reload()
}
//Función para realizar orden
function ordenarCompra(array) {
  event.preventDefault()
  if(localStorage.getItem("login") == "false") {
    Swal.fire({
          title: 'Hey!',
          icon: 'error',
          confirmButtonColor: 'green',
          text: `Debes iniciar sesión para poder comprar`,
          })
          return
  }
  localStorage.setItem("Orden", JSON.stringify(array))
  let total = 0
      for(producto of carritoItems) {
        total = total + (parseFloat(producto.precioProducto) * producto.cantidad)
      }
      if(total < 1){
        Swal.fire({
          title: 'Hey!',
          icon: 'info',
          confirmButtonColor: 'green',
          text: `No has comprado nada! Llena tu carrito antes de ordenar.`,
          })
          return
      }

  Swal.fire({
    title: 'Segur@ de comprar?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    confirmButtonColor: 'green',
    cancelButtonColor: 'red',
}).then((result) => {
    if(result.isConfirmed){
       Swal.fire({
          title: 'Compra realizada',
          icon: 'success',
          confirmButtonColor: 'green',
          text: `Gracias por escogernos, ${localStorage.getItem("Nombre")}! Hemos generado una factura por ${total.toFixed(2)}$. Puedes NO observar los detalles en tu correo ;) `,
          })
       carritoItems = []
    localStorage.removeItem("Carrito")
    actualizarCarrito()
    mostrarCarrito(carritoItems)

    }else{
       Swal.fire({
          title: 'La compra ha sido cancelada',
          icon: 'info',
          text: `Pero tus productos siguen en el carrito!`,
          confirmButtonColor: 'green',
          timer:3500
      })
    }
} )
}

//Actualizar nro de items mostrados en carrito
function actualizarCarrito () {
  if (!localStorage.getItem("nroItems")) {
    nroItems = 0
  } 
  nroItems = carritoItems.length
  nroItemsCarrito.innerText = `${nroItems}`
  localStorage.setItem("nroItems", nroItems)
}

// FUNCION para eliminar producto de carrito 
function elCarrito (producto) {
  let n = carritoItems.findIndex((obj) => obj.id == producto.id)
  carritoItems.splice(n, 1)

  localStorage.setItem("Carrito", JSON.stringify(carritoItems))
  actualizarCarrito()
  mostrarCarrito(carritoItems)
}

function mostrarCarrito (array) {
  event.preventDefault()
  let modalCarrito = document.getElementById("modal-carrito")
  if(array.length == 0) {
    modalCarrito.innerHTML = `<p class="text-center">Por ahora no tienes nada en tu carrito</p>`
  } else {
    modalCarrito.innerHTML = ""
    for (let producto of array) {
      let nuevoProductoCarrito = document.createElement("div")
      nuevoProductoCarrito.className = "card d-flex flex-row justify-content-between mb-3 p-3"
      nuevoProductoCarrito.innerHTML = `<div class="d-flex flex-column" style="width: 60%;">
                                        <p class="fw-semibold">${producto.nombreProducto}</p>
                                        <p class="fw-light">$${producto.precioProducto}</p>
                                        </div>
                                        <input id="cntdadP${producto.id}" type="number" style="width: 10%;" min="1" step="1" value="${producto.cantidad}">
                                        <button id="rmvP${producto.id}" class="btn" type="button"><img src="assets/trash.svg"></button>
                                        `
      modalCarrito.appendChild(nuevoProductoCarrito)
  
      let bttnEl = document.getElementById(`rmvP${producto.id}`)
      bttnEl.addEventListener("click", () => {elCarrito(producto)})

      let cantidadProducto = document.getElementById(`cntdadP${producto.id}`)

      cantidadProducto.addEventListener("change", () => {
        let nuevaCantidad = cantidadProducto.value
        producto.cantidad = nuevaCantidad})
     
    }
  }
}

function cerrarSesion () {
  actualizarCarrito()
  localStorage.clear()
  location.reload()
}

