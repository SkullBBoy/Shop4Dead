const botonesCompra = document.querySelectorAll('.tituloboton');
let carrito = [];
let articulosCreados = [];
const carritoLocalStorage = localStorage.getItem('carrito');
const articulosCreadosLocalStorage = localStorage.getItem('articulosCreados');

if (carritoLocalStorage) {
  carrito = JSON.parse(carritoLocalStorage);
}

if (articulosCreadosLocalStorage) {
  articulosCreados = JSON.parse(articulosCreadosLocalStorage);
}

function guardarCarritoEnStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function guardarArticulosCreadosEnStorage() {
  localStorage.setItem('articulosCreados', JSON.stringify(articulosCreados));
}


function mostrarCantidadArticulos() {
  const contadorArticulos = document.getElementById('contador-articulos');
  contadorArticulos.textContent = carrito.length.toString();
}

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

function mostrarArticulosEnTienda() {
  const contenedorArticulos = document.getElementById('articulos');
  articulosCreados.forEach((articulo) => {
    const articuloDiv = document.createElement('div');
    articuloDiv.classList.add('articulo');
    const imagenArticulo = document.createElement('img');
    imagenArticulo.src = './IMG/default.jpg';
    imagenArticulo.classList.add('articulos-fotos');
    const nombreArticulo = document.createElement('h2');
    nombreArticulo.classList.add('nombreart');
    nombreArticulo.textContent = articulo.nombre.toUpperCase();
    const precioArticulo = document.createElement('p');
    precioArticulo.classList.add('precioart');
    precioArticulo.textContent = `$${articulo.precio}`;
    const botonCompra = document.createElement('button');
    botonCompra.classList.add('tituloboton');
    botonCompra.textContent = 'COMPRAR';
    botonCompra.dataset.nombre = articulo.nombre.toUpperCase();
    botonCompra.dataset.precio = articulo.precio;
    botonCompra.addEventListener('click', agregarAlCarrito);
    const botonCompraDiv = document.createElement('div');
    botonCompraDiv.classList.add('botoncompra');
    botonCompraDiv.appendChild(botonCompra);
    articuloDiv.appendChild(imagenArticulo);
    articuloDiv.appendChild(nombreArticulo);
    articuloDiv.appendChild(precioArticulo);
    articuloDiv.appendChild(botonCompraDiv);
    contenedorArticulos.appendChild(articuloDiv);
  });
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
    alert('No hay articulos en el carrito');
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

function borrarArticulosCreados() {
  if (articulosCreados.length === 0) {
    alert('No hay artículos creados');
  } else {
    articulosCreados = [];
    guardarArticulosCreadosEnStorage();
    mostrarArticulosEnTienda();
    location.reload()
  }
}


const btnCargarArticulo = document.getElementById('btnCargarArticulo');
const formularioCarga = document.querySelector('.formularioCarga');
const botonComprar = document.getElementById('btn-comprar');
const botonBorrar = document.getElementById('btn-borrar')
const btnBorrarArticulos = document.getElementById('btnBorrarArticulos');

if(btnCargarArticulo){
  btnCargarArticulo.addEventListener('click', () => {
    formularioCarga.classList.toggle('visible');
  });
}

if(btnBorrarArticulos){
  btnBorrarArticulos.addEventListener('click', borrarArticulosCreados);
}

if (botonComprar) {
  botonComprar.addEventListener('click', comprar);
}

if (botonBorrar) {
  botonBorrar.addEventListener('click', vaciarCarrito);
}


mostrarCantidadArticulos();
setTimeout(() => {
  mostrarProductosEnCarrito();
}, 2);
mostrarArticulosEnTienda();



const btnGuardarArticulo = document.getElementById('btnGuardarArticulo');

if (btnGuardarArticulo) {
  btnGuardarArticulo.addEventListener('click', () => {
    const nombreArticulo = document.getElementById('nombreArticulo').value;
    const precioArticulo = document.getElementById('precioArticulo').value;

    if (nombreArticulo && precioArticulo) {
      const nuevoArticulo = {
        nombre: nombreArticulo.toUpperCase(),
        precio: precioArticulo
      };

      articulosCreados.push(nuevoArticulo);
      mostrarArticulosEnTienda();
      guardarArticulosCreadosEnStorage();
      

      document.getElementById('nombreArticulo').value = '';
      document.getElementById('precioArticulo').value = '';
    } else {
      alert('Completá los datos solicitados.');
    }
    location.reload()
  });
}


window.addEventListener('beforeunload', guardarCarritoEnStorage);