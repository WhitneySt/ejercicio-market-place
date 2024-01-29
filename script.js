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
        color: "white",
      },
      {
        talla: "S",
        cantidad: 5,
        color: "black",
      },
      {
        talla: "M",
        cantidad: 2,
        color: "white",
      },
      {
        talla: "M",
        cantidad: 3,
        color: "blue",
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
        color: "white",
      },
      {
        talla: "S",
        cantidad: 5,
        color: "pink",
      },
      {
        talla: "M",
        cantidad: 2,
        color: "white",
      },
      {
        talla: "M",
        cantidad: 3,
        color: "blue",
      },
    ],
  },
];

const contenedorProductos = document.getElementById("container-products");

const form = document.getElementById("formProductos");

const insertarProductos = (contenedor, listaProductos) => {
  contenedor.innerHTML = "";
  listaProductos.forEach((producto) => {
    contenedor.innerHTML += `
        <article class="cardProducto">
            <figure>
                <img src=${producto.imagenes[0]} alt=${producto.nombre}>
            </figure>
            <span>$ ${producto.precioUnitario.toLocaleString()}</span>
            <h3>${producto.nombre}</h3>
        </article>
        `;
  });
};

const obtenerDatosDelForm = (form) => {
  const formData = new FormData(form);
  const dataForm = {};
  for (const [key, value] of formData.entries()) {
    dataForm[key] = value;
  }

  return dataForm;
};

const agregarProducto = (dataForm, listaProductos) => {

  const productoExistente = listaProductos.find(
    (producto) => producto.nombre === dataForm.nombre
  );

    if (productoExistente) {
      productoExistente.imagenes.push(
        dataForm.imagen1,
        dataForm.imagen2,
        dataForm.imagen3
        );
        productoExistente.precioUnitario = dataForm.precio;
    const stock = productoExistente.stock.find(
      (producto) =>
        producto.talla === dataForm.talla && producto.color === dataForm.color
        );
        console.log(stock);
    if (stock) {
        stock.cantidad += dataForm.cantidad;
        //--Aquí se pueden actualizar las imágenes
        // productoExistente.imagenes = [dataForm.imagen1, dataForm.imagen2, dataForm.imagen3];
    } else {
      productoExistente.stock.push({
        talla: dataForm.talla,
        cantidad: dataForm.cantidad,
        color: dataForm.color,
      });
    }
  } else {
    const productoNuevo = {
      id: listaProductos.length + 1,
      nombre: dataForm.nombre,
      categoria: [dataForm.genero, dataForm.tipo],
      imagenes: [dataForm.imagen1, dataForm.imagen2, dataForm.imagen3],
      precioUnitario: dataForm.precio,
      stock: [
        {
          talla: dataForm.talla,
          cantidad: dataForm.cantidad,
          color: dataForm.color,
        },
      ],
    };
    listaProductos.push(productoNuevo);
  }
};

insertarProductos(contenedorProductos, productos);

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

    const newProduct = obtenerDatosDelForm(form);
    agregarProducto(newProduct, productos);
    insertarProductos(contenedorProductos, productos);
    console.log(productos);
    form.reset();
});
