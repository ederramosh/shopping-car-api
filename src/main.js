import './style.css';
import './segments/carrusel.css'; 
import './segments/carrusel.js'; 

// Importando las funciones de la API
import { getAllProducts, getAllUsers } from "./apis/products-api";

let listProducts = document.querySelector('.products-grid');

document.querySelector('.getProducts').addEventListener('click', async () => {
  const productsArray = await getAllProducts();
  
  listProducts.innerHTML = ''; 

  productsArray.forEach(product => {
    listProducts.innerHTML += `
      <div class="product-item">
        <img src=${product.image} alt=${product.title}>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <h4>$${product.price.toFixed(2)}</h4>
        <button class="add-to-cart-btn">Añadir al Carrito</button>
      </div>
    `;
  });
});

const userContainer = document.getElementById('user-cards-section'); 

if (userContainer) {
    const usersArray = await getAllUsers();
    userContainer.innerHTML = ''; 
    
    usersArray.forEach(user => {
        const cardUsers = document.createElement('div');
        cardUsers.classList.add('user-card');
        cardUsers.innerHTML = `
            <h3>${user.name.firstname.charAt(0).toUpperCase() + user.name.firstname.slice(1)} ${user.name.lastname.charAt(0).toUpperCase() + user.name.lastname.slice(1)}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
        `;
        userContainer.appendChild(cardUsers);
    });
}

// JavaScript para el menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
});