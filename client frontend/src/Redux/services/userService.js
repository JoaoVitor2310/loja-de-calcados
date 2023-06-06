import axios from "axios";
const api = process.env.REACT_APP_API_URL;


export const registerUser = async (registerInfo) => {
    const { email, name, password, confirmPassword } = registerInfo;
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`${api}/users/register`, { email, name, password, confirmPassword }, config)
        console.log(data)
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const loginUser = async (loginInfo) => {
    const { email, password } = loginInfo;
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`${api}/users/login`, { email, password }, config)
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const logoutUser = async () => {
    localStorage.removeItem("userInfoLocal");
    return true;
}

export const updateUser = async (newProfile) => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newProfile.token}`,
            },
        };

        const { data } = await axios.put(`${api}/users/profile`, newProfile, config);
        console.log(data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}