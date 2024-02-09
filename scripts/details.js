// import { productos } from "../modules/products.js";

const idProduct = JSON.parse(localStorage.getItem("idProduct"));
const URL_BASE = "https://minibackend-market-place-dev-rsgz.1.us-1.fl0.io/";

const getProduct = async (url, id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};



// const selectedProduct = productos.find((product) => product.id == idProduct);
// console.log(selectedProduct);

const printCategories = (categoriesList) => {
  let html = "";
  categoriesList.forEach((element) => {
    html += `<span>${element}</span>`;
  });

  return html;
};

const printSize = (stock) => {
  let html = "";

  const tallas = stock.map((item) => item.talla);
  const tallasDisponibles = [...new Set(tallas)];
  tallasDisponibles.forEach((item) => {
    let innerhtml = "";
    const colores = stock.filter((element) => element.talla == item);
    // console.log(colores)
    colores.forEach((color) => {
      innerhtml += `<span class=${item} style="background-color:${color.color}; display:none">${color.color}</span>`;
    });
    html += `<button class="tallas">${item}</button>
                ${innerhtml}
        `;
  });

  return html;
};

const showColors = (stock) => {
  const sizeButtons = document.querySelectorAll(".tallas");
  console.log(sizeButtons);
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const colorsButtons = document.querySelectorAll(`.${button.innerText}`);
      colorsButtons.forEach((btn) => {
        btn.style.display = btn.style.display == "block" ? "none" : "block";
      });
    });
  });
};

const printDetailsProduct = (product) => {
  const h1 = document.querySelector("h1");
  const main = document.querySelector("main");

  h1.innerText = product.nombre;
  main.innerHTML = `
        <figure class="mainImage">
            <img src=${product.imagenes[0]}>
        </figure>
        ${printCategories(product.categoria)}
        <span>${product.precioUnitario}</span>
        ${printSize(product.stock)}

        
    `;
};



document.addEventListener("DOMContentLoaded", async () => {
  const url = `${URL_BASE}productos`;
  const selectedProduct = await getProduct(url, idProduct);
  console.log(selectedProduct);
  printDetailsProduct(selectedProduct);
  showColors(selectedProduct.stock);
});
