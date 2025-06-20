import { getAllProducts } from "./apis/products-api";

let listProducts = document.querySelector('.listProducts');

document.querySelector('.getProducts').addEventListener('click', async () => {
  const productsArray = await getAllProducts();
  
  productsArray.forEach(product => {
    console.log(product);
    //solo es de meterle css
    listProducts.innerHTML += `
      <div>
        <img src=${product.image} alt=${product.id} >
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <h4>${product.price}</h4>
      </div>
    `
  });

})

