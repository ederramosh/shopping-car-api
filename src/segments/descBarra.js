import { getAllProducts} from "../apis/products-api";

export async function descuentosProductos (){
  const productosArray = await getAllProducts();
  const listaProductos = document.getElementById('descuentosBarra')

  productosArray.slice (0,6).forEach(product => {
    listaProductos.innerHTML += `
    <div class="descuentos-cards">
      <img class="descuentos-img" src="${product.image}" alt="${product.title}">
      <button class="agregar-productos">Agregar</button>
      <div class="producto-precio">
        <span class="descuentos-precio-oferta">$${product.price*0.75}</span>
        <span class="descuentos-precio-base">$${product.price}</span>
      </div>
      <div class="descuentos-total">-25%</div>
      <div class="descuentos-nombre-item">${product.title}</div>
      
    </div>
    `;
  })
}





      
      
        

      