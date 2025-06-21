import './style.css';
import { getAllProducts } from "../src/apis/products-api";

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

// Crear banners promocionales
//Este carrusel no utiliza el API, son imagines prediseñadas.
const promoBanners = [
  {
    img: "https://res.cloudinary.com/daoy46bpe/image/upload/v1750384038/promocar3_hfabs3.png",
    link: "#"
  },
  {
    img: "https://res.cloudinary.com/daoy46bpe/image/upload/v1750384036/promocar2_kg0tu6.png",
    link: "#"
  },
  {
    img: "https://res.cloudinary.com/daoy46bpe/image/upload/v1750384037/promocar1_wuajnf.png",
    link: "#"
  }
];
// Asegurarse de que el contenedor principal existe
const promoDiv = document.createElement('div');
promoDiv.id = 'promo-carousel'; // Agregar ID
promoDiv.className = 'promo-carousel'; // Agregar clase
//Posicion y timer
let currentPromo = 0;
let promoTimerId = null;

function renderPromoBanner(index) {
  currentPromo = index;
  promoDiv.innerHTML = '';

  const banner = promoBanners[index];

  // Crear hyperlink
  const link = document.createElement('a');
  link.href = banner.link;

  const img = document.createElement('img');
  img.src = banner.img;
  img.className = 'promo-img'; //  Agregar clase
  link.appendChild(img);
  promoDiv.appendChild(link);

  // Left arrow
  const leftBtn = document.createElement('button');
  leftBtn.textContent = '◀';
  leftBtn.className = 'promo-arrow promo-arrow-left'; //  Agregar clase
  leftBtn.onclick = () => {
    clearInterval(promoTimerId);
    renderPromoBanner((currentPromo - 1 + promoBanners.length) % promoBanners.length);
    startPromoTimer();
  };
  promoDiv.appendChild(leftBtn);

  // Right arrow
  const rightBtn = document.createElement('button');
  rightBtn.textContent = '▶';
  rightBtn.className = 'promo-arrow promo-arrow-right'; //  Agregar clase
  rightBtn.onclick = () => {
    clearInterval(promoTimerId);
    renderPromoBanner((currentPromo + 1) % promoBanners.length);
    startPromoTimer();
  };
  promoDiv.appendChild(rightBtn);
}
function nextPromoBanner() {
  const next = (currentPromo + 1) % promoBanners.length;
  renderPromoBanner(next);
}

function startPromoTimer() {
  promoTimerId = setInterval(nextPromoBanner, 10000);
}
// Insertar el carrusel promocional
const mainContainer = document.getElementById('app');
if (mainContainer && mainContainer.parentNode) {
  mainContainer.parentNode.insertBefore(promoDiv, mainContainer);
  renderPromoBanner(currentPromo);
  startPromoTimer();
}

//FIN DEL CARRUSEL DE IMAGENES