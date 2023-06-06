import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export const addToCart = async (itemInfo) => {
  try {
    const { data } = await axios.get(`${api}/products/${itemInfo.productId}`)
    const dataPayload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: itemInfo.qty,
    }
    return dataPayload;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const removeFromCart = async (id) => {
  try {
    return id;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const savingShippingAddress = async (fullAddress) => {
  try {
    return fullAddress;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

export const savingPayment = async (method) => {
  try {
    return method;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

// export const savingPrices = async (princesInfo) => {
//   try {
//     return princesInfo;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }  
// }