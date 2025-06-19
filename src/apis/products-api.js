export const getAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products")
    if(response.status !== 200) {
      throw new Error(`No se logro conectar a la API , ${response.status}`)
    }
    return await response.json()
};