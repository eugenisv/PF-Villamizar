// Evento para agregar al carrito

let seleccionOrden = document.getElementById("seleccionOrden")
let buscar = document.getElementById("buscarProducto")
let bttnFiltrarPrecio = document.getElementById("filtrarPrecio")
let bttnOrdenar = document.getElementById("btnOrdenar")

//array con los productos del carrito
carritoItems = []
// FUNCIONES
// Función que carga las cards con la info del array de productos
function mostrarCatalogo (array){
  let productosDiv = document.getElementById("productos")
  productosDiv.innerHTML = ''
productosDiv.innerHTML = ''
  for (producto of array) {
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
  carritoItems.push(producto)
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `Añadiste ${producto.nombreProducto} a tu carrito!`,
    showConfirmButton: false,
    imageHeight: 150,
    timer: 1500
  })

}

// función para hacer búsqueda de producto por nombre
function buscarProducto (array) {
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
    console.log("Ingrese un valor válido")
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingresa un valor válido',
    })
    return;
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
    console.log()
    return;
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
      return -1;
    } else if (a.nombreProducto > b.nombreProducto) {
      return 1;
    } 
    // son iguales
      return 0;
  })
  mostrarCatalogo(alfabetico)
}

//Función para realizar orden
function ordenarCompra(array) {
  event.preventDefault()
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
  localStorage.setItem("Orden", JSON.stringify(array))
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
      let total = 0
      for(producto of carritoItems) {
        total = total + parseFloat(producto.precioProducto)
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
          title: 'Compra realizada',
          icon: 'success',
          confirmButtonColor: 'green',
          text: `Gracias por escogernos, ${localStorage.getItem("Nombre")}! Hemos generado una factura por ${total.toFixed(2)}$. Puedes NO observar los detalles en tu correo ;) `,
          })
       productosEnCarrito = []
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


// CODIGO VIEJO
// const producto1 = new Producto ("Ensalada de Quinoa y Aguacate", 10.99, "Quinoa, aguacate, tomate, cebolla, cilantro y vinagreta de limón.", 0, "...")

// const producto2 = new Producto ("Tacos de Coliflor", 3.50, "Tortillas de maíz rellenas de coliflor asada, cebolla y cilantro, con guacamole y salsa de chile.", 1, "...")

// const producto3 = new Producto ("Bowl de Arroz Integral y Lentejas", 5.55, "Arroz integral, lentejas, espinacas, pepino, zanahoria, tomate y aderezo de tahini.", 2, "...")

// const producto4 = new Producto ("Tostadas de Frijoles", 1.95, "Tostadas crujientes con frijoles negros, aguacate, tomate, cilantro y salsa de chile.", 3, "...")

// const producto5 = new Producto ("Wrap de Hummus y Verduras", 4.50, "Tortilla de avena rellena de hummus, espinacas, pepino, zanahoria, tomate y cebolla roja.", 4, "...")

// const producto6 = new Producto ("Hamburguesa de Lentejas", 9.95, "Hamburguesa vegetariana de lentejas con aguacate, tomate, cebolla y aderezo de tahini.", 5, "...")

// const listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6]

// Para organizar los productos 
seleccionOrden.addEventListener("change", () => {
  console.log(`cambiaste a ${seleccionOrden}, ${seleccionOrden.value}`)
  switch (seleccionOrden.value) {
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

// Busqueda por nombre

buscar.addEventListener("click", () => buscarProducto(listaProductos))

// Para Filtrar por precio

bttnFiltrarPrecio.addEventListener("click", () => filtrarPrecio(listaProductos))

bttnOrdenar.addEventListener("click", () => ordenarCompra(carritoItems))

