import axios from "axios";
const endPoint = "http://localhost:4000/login";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(endPoint, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    if (response.status === 201) {
      window.location.href = "http://localhost:3000/admin";
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getToken = () => {
  return localStorage.getItem("token");
};

export { loginUser, getToken };