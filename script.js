const productos = [
  {
    id: 1,
    nombre: "Camiseta Hombre",
    categoria: ["masculino", "camisetas"],
    imagenes: [
      "https://adamasjeans.com/wp-content/uploads/2022/11/354-0-camiseta-hombre-web.jpg",
      "https://adamasjeans.com/wp-content/uploads/2022/11/354-1-camiseta-hombre-web-scaled.jpg",
      "https://i0.wp.com/derickdk.com/wp-content/uploads/2023/12/IMG_9801-scaled.jpg?fit=1707%2C2560&ssl=1",
    ],
    precioUnitario: 50000,
    stock: [
      {
        talla: "S",
        cantidad: 20,
        color: "blanco",
      },
      {
        talla: "S",
        cantidad: 5,
        color: "negro",
      },
      {
        talla: "M",
        cantidad: 2,
        color: "blanco",
      },
      {
        talla: "M",
        cantidad: 3,
        color: "azul",
      },
    ],
  },
  {
    id: 2,
    nombre: "Vestido dama",
    categoria: ["femenino", "vestido"],
    imagenes: [
      "https://http2.mlstatic.com/D_NQ_NP_904328-MLA51862935155_102022-O.webp",
      "https://ae01.alicdn.com/kf/S6d9365e89bc8413b859e831084876494c/Vestido-de-media-manga-con-volantes-y-cuello-redondo-para-mujer-vestido-ajustado-de-Color-s.jpg",
      "https://m.media-amazon.com/images/I/410OD3gnKwL._AC_SL1300_.jpg",
    ],
    precioUnitario: 70000,
    stock: [
      {
        talla: "S",
        cantidad: 20,
        color: "blanco",
      },
      {
        talla: "S",
        cantidad: 5,
        color: "rosa",
      },
      {
        talla: "M",
        cantidad: 2,
        color: "blanco",
      },
      {
        talla: "M",
        cantidad: 3,
        color: "azul",
      },
    ],
  },
];


const insertarProductos = (contenedor,listaProductos) => {
    contenedor.innerHTML = "";
    listaProductos.forEach(producto => {
        contenedor.innerHTML 
    });
}
