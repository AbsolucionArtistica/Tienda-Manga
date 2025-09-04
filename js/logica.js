// logica.js

// Lista de productos disponibles en catálogo
const productos = [
  {
    id: 1,
    titulo: "One Piece",
    volumen: 1,
    autor: "Eiichiro Oda",
    editorial: "Ivrea Ar",
    imagen: "/img/OnePiece_1_IVREAAR.jpg",
    precio: 9990
  },
  {
    id: 2,
    titulo: "Dorohedoro",
    volumen: 1,
    autor: "Q Hayashida",
    editorial: "Panini",
    imagen: "/img/Dorohedoro_1_PANINI.jpg",
    precio: 10990
  },
  {
    id: 3,
    titulo: "Buenas Noches PunPun",
    volumen: 1,
    autor: "Inio Asano",
    editorial: "Ivrea Ar",
    imagen: "/img/BuenasNochesPunpun_IVREAAR.jpg",
    precio: 9990
  },
  {
    id: 4,
    titulo: "Los Diarios De La Boticaria",
    volumen: 1,
    autor: "Maria V. Giner",
    editorial: "Panini",
    imagen: "/img/LosDiariosDeLaBoticaria_1_PANINI.jpg",
    precio: 10990
  },
  {
    id: 5,
    titulo: "Vagabond",
    volumen: 1,
    autor: "Takehiko Inoue",
    editorial: "Ivrea Ar",
    imagen: "/img/Vagabond_1_IVREAAR.jpg",
    precio: 9990
  },
  {
    id: 6,
    titulo: "Atelier of Witch Hat",
    volumen: 1,
    autor: "Kamome Shirahama",
    editorial: "Milky Way",
    imagen: "/img/AtelierOfWitchHat_1_MILKYWAY.jpg",
    precio: 12990
  },
  {
    id: 7,
    titulo: "Chainsaw Man",
    volumen: 1,
    autor: "Tatsuki Fujimoto",
    editorial: "Ivrea Ar",
    imagen: "/img/ChainsawMan_1_IVREAAR.jpg",
    precio: 9990
  },
  {
    id: 8,
    titulo: "Dandadan",
    volumen: 1,
    autor: "Yukinobu Tatsu",
    editorial: "Ivrea Ar",
    imagen: "/img/Dandadan_1_IVREAAR.jpg",
    precio: 9990
  },
];

// Función para formatear precio a string con $
function formatearPrecio(precio) {
  return `$${precio.toLocaleString('es-CL')}`;
}

// --- Renderiza el catálogo en el contenedor con id "lista-productos" ---
function renderizarCatalogo() {
  const contenedor = document.getElementById('lista-productos');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'col-3';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top product-img" alt="${producto.titulo} Vol.${producto.volumen}">
        <div class="card-body">
          <h5 class="card-title">${producto.titulo} N.${producto.volumen}</h5>
          <p class="card-text">Editorial ${producto.editorial}</p>
          <p class="card-text">${formatearPrecio(producto.precio)}</p>
          <a href="#" class="btn main-color text-white w-100 btn-agregar" data-id="${producto.id}">Agregar al carrito</a>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  // Agregar evento click a todos los botones "Agregar al carrito"
  const botonesAgregar = contenedor.querySelectorAll('.btn-agregar');
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
  });
}

// --- Función para agregar un producto al carrito ---
function agregarAlCarrito(event) {
  event.preventDefault();
  const idProducto = parseInt(event.currentTarget.getAttribute('data-id'));
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  // Obtener carrito desde localStorage o inicializar vacío
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.id === producto.id);
  if (productoEnCarrito) {
    // Si ya existe, aumentar cantidad
    productoEnCarrito.cantidad += 1;
  } else {
    // Sino, agregar nuevo producto con cantidad 1
    carrito.push({...producto, cantidad: 1});
  }

  // Guardar carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  alert(`${producto.titulo} agregado al carrito.`);
  // Opcional: actualizar la vista del carrito si tienes un contenedor para eso
}

// --- Renderiza el carrito en el contenedor con id "lista-carrito" ---
function renderizarCarrito() {
  const contenedor = document.getElementById('lista-carrito');
  if (!contenedor) return;

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  carrito.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-3">
          <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.titulo}">
        </div>
        <div class="col-7">
          <div class="card-body">
            <h5 class="card-title">${producto.titulo} N.${producto.volumen}</h5>
            <p class="card-text">Editorial ${producto.editorial}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>
            <p class="card-text">Precio unitario: ${formatearPrecio(producto.precio)}</p>
            <p class="card-text">Subtotal: ${formatearPrecio(producto.precio * producto.cantidad)}</p>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  // Opcional: podrías agregar total, botones para eliminar productos, etc.
}

// Ejecutar renderizado del catálogo cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
  renderizarCatalogo();
  renderizarCarrito(); // si tienes contenedor para carrito en la página actual
});
