import axios from "axios";

const endPoint = "http://localhost:4000/sign-up";

const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(endPoint, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default registerUser;
