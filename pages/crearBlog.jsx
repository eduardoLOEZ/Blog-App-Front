import React, { useState } from 'react';
import { createBlog } from '@/app/api/blogs';
import { useRouter } from 'next/router';
import "../app/styles/card.css"

function CrearBlog() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor para crear el blog
    const blogData = {
      title: titulo,
      summary: resumen,
      content: contenido,
      image: imagen,
    };
    console.log(blogData); // Aquí solo imprimiré los datos en la consola, debes enviarlos al servidor en una solicitud HTTP

    try {
        const blogCreado = await createBlog(blogData);
        console.log("Blog creado:", blogCreado);
        router.push("/admin")

    } catch (error) {
        console.log("Error al crear el blog:", error);
        
    }
  };

  return (
    <div className="container">
      <h1 className="title">Crear Blog</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumen">Resumen:</label>
          <input
            type="text"
            id="resumen"
            value={resumen}
            onChange={(e) => setResumen(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={10} // Ajusta el número de filas según desees
            className="textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            onChange={(e) => setImagen(e.target.files[0])}
            className="file-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Crear Blog
        </button>
      </form>
    </div>
  );
}

export default CrearBlog;
