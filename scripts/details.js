import { productos } from "../modules/products.js";

const idProduct = JSON.parse(localStorage.getItem("idProduct"));

const selectedProduct = productos.find((product) => product.id == idProduct);
console.log(selectedProduct);

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

printDetailsProduct(selectedProduct);
showColors(selectedProduct.stock);
