import axios from "axios"
const endPoint = "http://localhost:4000/blogs";
console.log(endPoint);
const getBlogs = async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    // Verificar si el token existe en el localStorage
    if (token) {
      // Configurar los headers con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud con los headers configurados
      const response = await fetch("http://localhost:4000/blogs")
        .then((response) => response.json());
      return response

    } else {
      // Si no hay token, simplemente retorna un array vacío
      return [];
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Token inválido o expirado. Redirigir al inicio de sesión.");
    } else {
      console.log("Error al obtener los blogs:", error);
    }
    return [];
  }
};


// Assuming you have a database or API to fetch blog data by ID
// This is just a sample function and not a real implementation
export const getBlogById = async (blogId) => {
  try {
    // Replace this with your actual code to fetch blog data by ID from the database or API
    // For example, you can use fetch or axios to make an API call
    const response = await fetch(`http://localhost:4000/blog/${blogId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching blog by ID:", error);
    return null; // Return null if there's an error or the blog is not found
  }
}




export const createBlog = async (blogData) => {
  try {
    const token = getToken(); // Obtenemos el token utilizando la función getToken()

    if (!token) { throw new Error('Token not available'); }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el token en el encabezado de la solicitud
      },
    };

    
    const response = await axios.post("http://localhost:4000/createBlog", blogData, config);
    return response.data
   


  } catch (error) {
    console.log(error)
    return null; // Puedes retornar null o algún otro valor para indicar que ocurrió un error al crear el blog
  }
};

const getToken = () => {
  return localStorage.getItem("token");
};











export default getBlogs;