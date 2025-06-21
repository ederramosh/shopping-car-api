// src/main.js

import { getAllProducts, getAllUsers } from "./products-api.js"; // Manteniendo products-api.js

let listProducts = document.querySelector('.listProducts'); // Esto seleccionará el div con clase .listProducts

document.querySelector('.getProducts').addEventListener('click', async () => {
    console.log("hace click");
    // Limpiando el contenido actual antes de cargar nuevos productos
    listProducts.innerHTML = '<p>Cargando productos...</p>'; // Mostrar mensaje de carga

    try {
        const productsArray = await getAllProducts();
        
        listProducts.innerHTML = ''; // Limpiar el mensaje de carga antes de mostrar los productos

        if (productsArray && productsArray.length > 0) {
            productsArray.forEach(product => {
                console.log(product);
                // El div generado tiene la clase 'product-item'
                listProducts.innerHTML += `
                    <div class="product-item"> 
                        <img src="${product.image}" alt="${product.title}" >
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <h4>$${product.price.toFixed(2)}</h4> <button class="add-to-cart-btn">Añadir al Carrito</button>
                    </div>
                `;
            });
            // Oculta el botón después de cargar los productos si no quiere "cargar más"
            //  una vez que estén todos
            document.querySelector('.getProducts').style.display = 'none'; 

        } else {
            listProducts.innerHTML = '<p>No se encontraron productos.</p>';
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        listProducts.innerHTML = '<p>Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.</p>';
        // Muestra el botón de nuevo en caso de error
        document.querySelector('.getProducts').style.display = 'block'; 
    }
});

// Cargar usuarios
async function loadUsers() {
    const userCardsSection = document.getElementById('user-cards-section');
    try {
        userCardsSection.innerHTML = '<p>Cargando usuarios...</p>'; // Mensaje de carga
        const users = await getAllUsers();
        if (users && users.length > 0) {
            userCardsSection.innerHTML = ''; // Limpiar mensaje "Cargando usuarios..."
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card'; 
                userCard.innerHTML = `
                    <h4>${user.name.firstname} ${user.name.lastname}</h4>
                    <p>Email: ${user.email}</p>
                    <p>Usuario: ${user.username}</p>
                `;
                userCardsSection.appendChild(userCard);
            });
        } else {
            userCardsSection.innerHTML = '<p>No se encontraron usuarios.</p>';
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        userCardsSection.innerHTML = '<p>Error al cargar los usuarios. Intente más tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    // Aquí puedes añadir la lógica para el menú hamburguesa si la tienes en main.js
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
});