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
const promoDiv = document.createElement('div');
promoDiv.id = 'promo-carousel-content'; 
promoDiv.className = 'promo-carousel-content'; 

//Posicion y timer
let currentPromo = 0;
let promoTimerId = null;

function renderPromoBanner(index) {
    currentPromo = index;
    promoDiv.innerHTML = ''; // Limpiar contenido anterior

    const banner = promoBanners[index];

    // Crear hyperlink
    const link = document.createElement('a');
    link.href = banner.link;
    const img = document.createElement('img');
    img.src = banner.img;
    img.className = 'promo-img'; // Agregar clase
    link.appendChild(img);
    promoDiv.appendChild(link);

    // Left arrow
    const leftBtn = document.createElement('button');
    leftBtn.textContent = '◀';
    leftBtn.className = 'promo-arrow promo-arrow-left'; // Agregar clase
    leftBtn.onclick = () => {
        clearInterval(promoTimerId);
        renderPromoBanner((currentPromo - 1 + promoBanners.length) % promoBanners.length);
        startPromoTimer();
    };
    promoDiv.appendChild(leftBtn);

    // Right arrow
    const rightBtn = document.createElement('button');
    rightBtn.textContent = '▶';
    rightBtn.className = 'promo-arrow promo-arrow-right'; 
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


// Insertar el carrusel promocional en el contenedor del carrusel
document.addEventListener('DOMContentLoaded', () => { // Asegurarse de que el DOM esté cargado
    const carouselTarget = document.querySelector('.carousel-container'); 
    if (carouselTarget) {
        carouselTarget.innerHTML = ''; 
        carouselTarget.appendChild(promoDiv); 
        renderPromoBanner(currentPromo);
        startPromoTimer();
    }
});