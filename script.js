function guardarEnStorage(clave, objeto) {
    const objetoJSON = JSON.stringify(objeto);
    localStorage.setItem(clave, objetoJSON);
  }

var carritoItems = []

class Producto {
    constructor (nombreProducto, precioProducto, descripcionProducto, id, imgSrc) {
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.descripcionProducto = descripcionProducto;
        this.id = id;
        this.imgSrc = imgSrc;
    }

}

const producto1 = new Producto ("Ensalada de Quinoa y Aguacate", 10.99, "Quinoa, aguacate, tomate, cebolla, cilantro y vinagreta de limón.", 0, "...")

const producto2 = new Producto ("Tacos de Coliflor", 3.50, "Tortillas de maíz rellenas de coliflor asada, cebolla y cilantro, con guacamole y salsa de chile.", 1, "...")

const producto3 = new Producto ("Bowl de Arroz Integral y Lentejas", 5.55, "Arroz integral, lentejas, espinacas, pepino, zanahoria, tomate y aderezo de tahini.", 2, "...")

const producto4 = new Producto ("Tostadas de Frijoles", 1.95, "Tostadas crujientes con frijoles negros, aguacate, tomate, cilantro y salsa de chile.", 3, "...")

const producto5 = new Producto ("Wrap de Hummus y Verduras", 4.50, "Tortilla de avena rellena de hummus, espinacas, pepino, zanahoria, tomate y cebolla roja.", 4, "...")

const producto6 = new Producto ("Hamburguesa de Lentejas", 9.95, "Hamburguesa vegetariana de lentejas con aguacate, tomate, cebolla y aderezo de tahini.", 5, "...")

const listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6]

// Cargando las cards con la info del array de productos

let productosDiv = document.getElementById("productos")
for (producto of listaProductos) {
    let nuevoProductoDiv = document.createElement("div")
    nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2"
    nuevoProductoDiv.innerHTML = `<div class="card" style="width: 18rem;">
                                    <img "${producto.imgSrc}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${producto.nombreProducto}</h5>
                                    <p class="card-text">$${producto.precioProducto}</p>
                                    <p class="card-text">${producto.descripcionProducto}</p>
                                    <button id="${producto.id}"href="#" class="btn btn-primary aggCarrito">Agregar al carrito</button>
                                    </div>
                                </div>`
    productosDiv.appendChild(nuevoProductoDiv)
}

// Evento para agregar al carrito

let btnAgg = document.querySelectorAll(".aggCarrito")
btnAgg.forEach(function(elemento) {
    elemento.addEventListener("click", () => {aggCarrito(elemento.id, listaProductos, carritoItems)})
})

function aggCarrito (n, listaProductos) {
    carritoItems.push(listaProductos[n])
    alert(`Añadiste ${listaProductos[n].nombreProducto} a tu carrito!`)
    console.log(carritoItems)
}

// Obteniendo los datos del comprador para la orden y creando un objeto con su info

const formulario = document.getElementById("formulario");

// Guarda objeto en almacenamiento local
function guardarStrg(clave, objeto) {
    const objetoJSON = JSON.stringify(objeto);
    localStorage.setItem(clave, objetoJSON);
  }
  
// Obtiene objeto del almacenamiento local
  function obtenerStrg(clave) {
    const objetoJSON = localStorage.getItem(clave);
    if (objetoJSON) {
      return JSON.parse(objetoJSON);
    } else {
      return null;
    }
  }
