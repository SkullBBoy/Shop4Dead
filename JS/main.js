const botonesCompra = document.querySelectorAll('.tituloboton');
let carrito = [];

const carritoLocalStorage = localStorage.getItem('carrito');
if (carritoLocalStorage) {
  carrito = JSON.parse(carritoLocalStorage);
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCantidadArticulos() {
  const contadorArticulos = document.getElementById('contador-articulos');
  contadorArticulos.textContent = carrito.length.toString();
}

function mostrarProductosEnCarrito() {
  const contenedorProductos = document.getElementById('productos-carrito');
  contenedorProductos.innerHTML = '';

  if (carrito.length === 0) {
    const mensajeCarritoVacio = document.createElement('p');
    mensajeCarritoVacio.textContent = 'No hay productos en el carrito';
    mensajeCarritoVacio.classList.add('mensaje-vacio');
    contenedorProductos.appendChild(mensajeCarritoVacio);
  } else {
    carrito.forEach((producto) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto-carrito');

      const nombreProducto = document.createElement('h3');
      nombreProducto.textContent = producto.nombre;

      const precioProducto = document.createElement('p');
      precioProducto.textContent = `$${producto.precio}`;

      productoDiv.appendChild(nombreProducto);
      productoDiv.appendChild(precioProducto);
      contenedorProductos.appendChild(productoDiv);
    });
  }
}

function agregarAlCarrito(event) {
  const nombre = event.target.dataset.nombre;
  const precio = Number(event.target.dataset.precio);

  const producto = {
    nombre,
    precio,
  };

  carrito.push(producto);

  alert(`Se agregó "${nombre}" al carrito`);

  guardarCarritoEnLocalStorage();
  mostrarCantidadArticulos();
  mostrarProductosEnCarrito();
}

botonesCompra.forEach((boton) => {
  boton.addEventListener('click', agregarAlCarrito);
});

function comprar() {
  if (carrito.length === 0) {
    alert('No hay productos en el carrito');
  } else {
    alert('Compra realizada con éxito');
    carrito = [];
    guardarCarritoEnLocalStorage();
    mostrarCantidadArticulos();
    mostrarProductosEnCarrito();
  }
}

const botonComprar = document.getElementById('btn-comprar');

if (botonComprar) {
  botonComprar.addEventListener('click', comprar);
}

mostrarCantidadArticulos();
mostrarProductosEnCarrito();

window.addEventListener('beforeunload', guardarCarritoEnLocalStorage);
