// import { productos } from "../modules/products.js";

//Necesitamos construir una función que nos permita obtener los productos desde la API

const URL_BASE = "https://minibackend-market-place-dev-rsgz.1.us-1.fl0.io/";

const getproducts = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const contenedorProductos = document.getElementById("container-products");

const form = document.getElementById("formProductos");

const insertarProductos = (contenedor, listaProductos) => {
  contenedor.innerHTML = "";
  listaProductos.forEach((producto) => {
    contenedor.innerHTML += `
        <article class="cardProducto" name=${producto.id}>
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

const validateDataForm = (dataForm) => {
  let emptyFields = [];
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  for (const key in dataForm) {
    if (dataForm[key].trim() == "") {
      emptyFields.push(key);
    }
  }

  if (!dataForm.talla) {
    emptyFields.push("talla");
  }

  if (dataForm.nombre.length <= 3) {
    alert("El nombre debe contener más de 3 caracteres");
    emptyFields.push("nombre");
  }

  if (!emailRegex.test(dataForm.email)) {
    alert("El email ingresado no es valido");
    emptyFields.push("email");
  }

  return emptyFields.length > 0 ? emptyFields : false;
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

const goToDetailsProduct = () => {
  const cards = document.querySelectorAll(".cardProducto");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const idProduct = card.getAttribute("name");
      localStorage.setItem("idProduct", JSON.stringify(idProduct));
      location.href = "./pages/details.html";
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const url = `${URL_BASE}productos`
  const productos = await getproducts(url);
  // console.log(productos);
  insertarProductos(contenedorProductos, productos);
  goToDetailsProduct();
})

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const newProduct = obtenerDatosDelForm(form);
  const validation = validateDataForm(newProduct);
  console.log(validation);
  if (validation) {
    alert(
      "El formulario tiene los siguientes datos vacíos " + validation.toString()
    );
  } else {
    agregarProducto(newProduct, productos);
    insertarProductos(contenedorProductos, productos);
    console.log(productos);
    form.reset();
  }
});

//1. ¿Cómo crear el JSON Server para este proyecto? OK
//2. ¿Cómo correr el JSON Server? OK
//2.1. Despliegue de JSON Server, es decir del miniback. OK
//3. Realizar la petición GET de los productos en el JSON Server OK
//4. ¿Cómo podemos filtrar los productos por categorías?
//5. ¿Cómo realizar el despliegue del Front en gh-pages haciendo uso de GitHub actions? OK
