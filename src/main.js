import './style.css';
// Importando las funciones de la API
import { getAllProducts, getAllUsers } from "./apis/products-api";

//CARRUSEL STUFF
import './segments/carrusel.js';
import './segments/styleCarrusel.css';
import './segments/styleDesc.css';
import {descuentosProductos} from './segments/descBarra.js';


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




// Script para obtener y mostrar los usuarios
const userContainer = document.getElementById('app')
const usersArray = await getAllUsers();
  
usersArray.forEach(user => {
  const cardUsers = document.createElement('div');
  cardUsers.classList.add('user-card');
  //Mostrar los datos de los usuarios en html. En el caso de que el nombre tenga mas de una palabra, se convierte la primera letra a mayuscula.
  cardUsers.innerHTML = `
    <h3>${user.name.firstname.charAt(0).toUpperCase()+user.name.firstname.slice(1)} ${user.name.lastname.charAt(0).toUpperCase()+user.name.lastname.slice(1)}</h3>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
  `;

  userContainer.appendChild(cardUsers);
});



//LLAMAR LA BARRA DE DESCUENTOS
descuentosProductos();