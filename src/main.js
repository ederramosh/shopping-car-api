import { getAllProducts } from "./apis/products-api";

const listProducts = document.querySelector('.listProducts');


document.querySelector('.getProducts').addEventListener('click', async () => {
  const productsArray = await getAllProducts();
  
  productsArray.forEach(product => {
    console.log(product);
    //aca puede ir el scripting para el DOM para pasarselo a listProducts
  });

})