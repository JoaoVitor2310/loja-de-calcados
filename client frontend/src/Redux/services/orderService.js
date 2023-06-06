import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export const creatingOrder = async (orderInfo) => {
    try {
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${orderInfo.token}`,
            },
        };

        const { data } = await axios.post(`${api}/orders/create`, orderInfo, config);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const detailsFromOrder = async (tokenId) => {
    try {
        
        const config = {
            headers: {
                Authorization: `Bearer ${tokenId.token}`,
            },
        };

        const { data } = await axios.get(`${api}/orders/${tokenId.orderId}`, config);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const payingOrder = async (orderInfo) => {
    try {
        const {token, orderId, paymentResult} = orderInfo;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Tem que receber o token
          },
        };
  
        const { data } = await axios.put(`/${api}/orders/${orderId}/pay`, paymentResult,config); // Tem q descobrir o que é o paymentResult
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}