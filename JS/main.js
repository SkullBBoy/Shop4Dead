const botonesCompra = document.querySelectorAll('.tituloboton');
let carrito = [];
let articulosCreados = [];
const carritoLocalStorage = localStorage.getItem('carrito');
const articulosCreadosLocalStorage = localStorage.getItem('articulosCreados');
const btnsForm = document.getElementById("botonesForm");
const btnGuardarArticulo = document.getElementById('btnGuardarArticulo');
const btnCargarArticulo = document.getElementById('btnCargarArticulo');
const formularioCarga = document.querySelector('.formularioCarga');
const botonComprar = document.getElementById('btn-comprar');
const botonBorrar = document.getElementById('btn-borrar')
const btnBorrarArticulos = document.getElementById('btnBorrarArticulos');
const btnIniciar = document.getElementById("btnIniciar");
const btnCerrar = document.getElementById("btnCerrar");
const formLogin = document.getElementsByClassName("form-login")[0];
const tipoUsuario = localStorage.getItem("user");
const elementoHora = document.getElementById("horaActual");


function mostrarHoraActual() {
  fetch("http://worldtimeapi.org/api/ip")
    .then(response => response.json())
    .then(data => {
      const ahora = new Date(data.datetime);
      const hora = ahora.getHours();
      const minutos = ahora.getMinutes();
  
      elementoHora.textContent = `Hora: ${hora}:${minutos}`;
    })
    .catch(error => {
      console.log("Error: " + error)
    });
}

async function mostrarHoraArticulo() { 
  try {
    const response = await fetch("http://worldtimeapi.org/api/ip");
    const data = await response.json(); 
    const ahora = new Date(data.datetime);
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    return `${hora}:${minutos}`;
  } catch (error) {
    console.log("Error: " + error);
  }
}

function verificarUsuario(){

  if(tipoUsuario){
    if(tipoUsuario === "1"){
      
      if(formLogin){
        formLogin.style.display = "none";
      
      }
      
      if(btnCerrar){
        btnCerrar.style.display= "flex";
      }
      

      if(btnsForm){
        btnsForm.style.display = "flex";
      }
      
      
      
    }
    else{

      if(btnsForm){
        btnsForm.style.display = "none";
      }

      if(btnCerrar){
        btnCerrar.style.display = "none";

      }

      if(formLogin){
        formLogin.style.display = "flex";
      }
      
      
      
  
    }
  }
  else{
    localStorage.setItem("user", "0")
    location.reload()
  }
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
      precioProducto.classList.add('precioProducto');
      precioProducto.textContent = `$${producto.precio}`;
      const horaProducto = document.createElement("p");
      horaProducto.classList.add('horaAñadido');
      horaProducto.textContent = `Añadido a las: ${producto.hora}`;
      productoDiv.appendChild(nombreProducto);
      productoDiv.appendChild(precioProducto);
      productoDiv.appendChild(horaProducto);
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
async function agregarAlCarrito(event) {
  const nombre = event.target.dataset.nombre;
  const precio = Number(event.target.dataset.precio);
  const hora = await mostrarHoraArticulo(); 
  const producto = {
    nombre,
    precio,
    hora,
  };
  carrito.push(producto);
  alert(`Se agregó "${nombre}" al carrito         |        Hora: ${hora}`); 
  guardarCarritoEnStorage();
  mostrarCantidadArticulos();
  mostrarProductosEnCarrito();
}

botonesCompra.forEach((boton) => {
  boton.addEventListener('click', agregarAlCarrito);
});

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
    alert('No hay articulos en el carrito');
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

if (carritoLocalStorage) {
  carrito = JSON.parse(carritoLocalStorage);
}

if (articulosCreadosLocalStorage) {
  articulosCreados = JSON.parse(articulosCreadosLocalStorage);
}

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



if(btnIniciar){
  btnIniciar.addEventListener('click', () => {
    const usuario = document.getElementById('user').value;
    const password = document.getElementById("password").value;
    

    if(usuario && password){
      if(usuario === "admin" & password === "123"){
      localStorage.setItem("user", 1);
      }
      else{
        alert("Login Incorrecto. Intentelo Nuevamente")
      }
      location.reload();
      document.getElementById('user').value = '';
      document.getElementById('password').value = '';
    }
    else{
      alert('Completá los datos solicitados.');
    }

  });
}


if(btnCerrar){
  btnCerrar.addEventListener('click', () => {
 localStorage.setItem("user","0")
 verificarUsuario();
 location.reload();
  });
}

mostrarHoraActual();
verificarUsuario();
mostrarCantidadArticulos();
setTimeout(() => {
  mostrarProductosEnCarrito();
}, 2);
mostrarArticulosEnTienda();
setInterval(mostrarHoraActual, 1000);

window.addEventListener('beforeunload', guardarCarritoEnStorage);