    //1. Lista de productos (puedes modificar o agregar más)
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
    autor: "Cristina Mitre",
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
  }
];
    //2. Función para renderizar productos
    function mostrarProductos() {
      const contenedor = document.getElementById("lista-productos");
      contenedor.innerHTML = "";
      productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.titulo}">
          <h3>${producto.titulo}</h3>
          <p><strong>Autor:</strong> ${producto.autor}</p>
          <p><strong>Editorial:</strong> ${producto.editorial}</p>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
      });
    }

    //3. Función para agregar al carrito usando localStorage
    function agregarAlCarrito(idProducto) {
      const producto = productos.find(p => p.id === idProducto);
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Opcional: evitar duplicados
      const yaEsta = carrito.find(p => p.id === producto.id);
      if (!yaEsta) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
      } else {
        alert("Este producto ya está en el carrito.");
      }
    }

    //4. Función para mostrar el carrito
    function mostrarCarrito() {
      const contenedor = document.getElementById("carrito");
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      contenedor.innerHTML = "";

      if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        return;
      }

      carrito.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p><strong>${producto.titulo}</strong> de ${producto.autor} (${producto.editorial})</p>
        `;
        contenedor.appendChild(div);
      });
    }

    //5. Inicialización
    mostrarProductos();
    mostrarCarrito();