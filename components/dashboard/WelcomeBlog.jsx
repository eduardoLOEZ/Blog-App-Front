import React, { useState, useEffect } from "react";
import { getToken } from "@/app/api/login";
import DropdownProfile from "./DropdownProfile";
import getBlogs from "@/app/api/blogs";
import Link from "next/link";
import "../../app/styles/card.css"

function WelcomeBanner() {
  
  const [userName, setUserName] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenernombreUsuario = () => {
      try {
        const token = getToken();
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const nombre = decodedToken.user.username;
          setUserName(nombre);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const blogsResponse = await getBlogs();
        setBlogs(blogsResponse);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    obtenernombreUsuario();
    fetchBlogs();
  }, []);

  return (
    <>
      <DropdownProfile />
      <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        {/* Content */}
        <div className="relative">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
            Bienvenido, {userName} 👋
          </h1>
          <p className="dark:text-indigo-200">
            BlogApp, escribe para que el mundo sepa de ti...
          </p>
        </div>
      </div>
      <div>
        <Link href="/crearBlog">
          <button className="crear-blog-button">Crear Blog</button>
        </Link>
        {/* ... */}
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <Link href={`/blog/${blog._id}`}>
                <h1 className="blog-title">{blog.title}</h1>
              </Link>
              <h2>{blog.summary}</h2>
              <p>{blog.content}</p>
              <img src={blog.imgurl} alt="" />
              <br />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default WelcomeBanner;
