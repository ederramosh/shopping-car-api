import { getAllProducts, getAllUsers } from "./products-api.js";

let listProducts = document.querySelector('.listProducts');

document.querySelector('.getProducts').addEventListener('click', async () => {
  console.log("hace click");
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

// Cargar usuarios
async function loadUsers() {
  const userCardsSection = document.getElementById('user-cards-section');
  try {
    const users = await getAllUsers();
    if (users && users.length > 0) {
      userCardsSection.innerHTML = ''; // Limpiar mensaje "Cargando usuarios..."
      users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card'; // Añadir clase para estilizar si es necesario
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
});