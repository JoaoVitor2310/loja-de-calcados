import axios from "axios";
const api = process.env.REACT_APP_API_URL;


export const listProduct = async () => {
  try {
    const {data} = await axios.get(`${api}/products`) //?keyword=${keyword}&pageNumber=${pageNumber} CONTINUAÇÃO DA URL
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const listProductDetails = async (id) => {
  try {
    const {data} = await axios.get(`${api}/products/${id}`)
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const detailProduct = async () => {
  try {
    const {data} = await axios.get(`${api}/products`)
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}