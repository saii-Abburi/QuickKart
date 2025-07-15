import axios from "axios";

const fetchProducts = async (query) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOST_STRING}/app/v1/products`);
    return response.data.products; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProducts;
