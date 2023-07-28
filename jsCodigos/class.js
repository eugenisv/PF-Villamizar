class Producto {
    constructor (nombreProducto, precioProducto, descripcionProducto, id, imgSrc) {
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.descripcionProducto = descripcionProducto;
        this.id = id;
    }
  
  }

// Cargar productos desde API propia
let listaProductos = []
fetch("productos.json")
.then((res) => res.json())
.then((productos) => {
  for (let producto of productos) {
    let productoNuevo = new Producto(producto.nombre, producto.precio, producto.descripcion, producto.id)
    listaProductos.push(productoNuevo)
  }
  localStorage.setItem("Productos", JSON.stringify(listaProductos))
  mostrarCatalogo(listaProductos)
})
