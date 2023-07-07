const botonesCompra = document.querySelectorAll('.tituloboton');
let carrito = [];
const carritoLocalStorage = localStorage.getItem('carrito');
if (carritoLocalStorage) {
  carrito = JSON.parse(carritoLocalStorage);
}

function guardarCarritoEnStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCantidadArticulos() {
  const contadorArticulos = document.getElementById('contador-articulos');
  contadorArticulos.textContent = carrito.length.toString();
}

const formularioCarga = document.querySelector('.formularioCarga');
const btnCargarArticulo = document.getElementById('btnCargarArticulo');
btnCargarArticulo.addEventListener('click', () => {
  formularioCarga.classList.toggle('visible');
});

function mostrarProductosEnCarrito() {
  const contenedorProductos = document.getElementById('productos-carrito');
  contenedorProductos.innerHTML = '';
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
    }
    );
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
  guardarCarritoEnStorage();
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
    guardarCarritoEnStorage();
    mostrarCantidadArticulos();
    mostrarProductosEnCarrito();
  }
}

function vaciarCarrito() {
  if (carrito.length === 0) {
    alert('No hay productos en el carrito');
  } else {
    carrito = [];
    guardarCarritoEnStorage();
    mostrarCantidadArticulos();
    mostrarProductosEnCarrito();
  }
}


const botonComprar = document.getElementById('btn-comprar').addEventListener('click', comprar);
const botonBorrar = document.getElementById('btn-borrar').addEventListener('click', vaciarCarrito);

  
mostrarCantidadArticulos();
mostrarProductosEnCarrito();

window.addEventListener('beforeunload', guardarCarritoEnStorage);